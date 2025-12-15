const fs = require("fs");
const path = require("path");
const { spawn } = require('child_process');

exports.generateTryOn = async (req, res) => {
    let userImagePath = null;
    let garmentImagePath = null;

    try {
        const userImageFile = req.file;
        const { garmentImageUrl } = req.body;

        if (!userImageFile || !garmentImageUrl) {
            return res.status(400).json({
                success: false,
                error: 'Missing user image or garment image URL.'
            });
        }

        console.log("🚀 Starting Virtual Try-On via Python Bridge (IDM-VTON)...");

        // 1. Prepare files
        userImagePath = path.resolve(userImageFile.path);
        const garmentFilename = `garment_${Date.now()}.jpg`;
        garmentImagePath = path.resolve("uploads", garmentFilename);

        // Download garment image
        await new Promise((resolve, reject) => {
            const file = fs.createWriteStream(garmentImagePath);
            const protocol = garmentImageUrl.startsWith("https") ? require("https") : require("http");
            protocol.get(garmentImageUrl, (response) => {
                response.pipe(file);
                file.on('finish', () => { file.close(resolve); });
            }).on('error', (err) => {
                fs.unlink(garmentImagePath, () => { });
                reject(err);
            });
        });

        console.log(`📸 Images prepared:\n  - User: ${userImagePath}\n  - Garment: ${garmentImagePath}`);
        console.log("⚡ Calling Python script...");

        // 2. Spawn Python Process
        // Arguments: script, user_image, garment_image, description
        const pythonProcess = spawn('python', [
            path.resolve(__dirname, '../../vton_wrapper.py'), // Assuming wrapper is in server root, adjust path if needed
            userImagePath,
            garmentImagePath,
            "clothing item" // Description
        ]);

        // Note: vton_wrapper.py path adjustment
        // controller is in server/src/controllers/
        // wrapper is in server/
        // path.resolve(__dirname, '../../vton_wrapper.py') should work.

        let outputData = "";
        let errorData = "";

        pythonProcess.stdout.on('data', (data) => {
            const s = data.toString();
            outputData += s;
            console.log(`🐍 ${s.trim()}`);
        });

        pythonProcess.stderr.on('data', (data) => {
            const s = data.toString();
            errorData += s;
            // Only log if meaningful, Gradio prints download progress to stderr
            if (!s.includes("%") && !s.includes("kB/s")) {
                console.log(`🐍 [Log] ${s.trim()}`);
            }
        });

        // Handle process completion
        await new Promise((resolve, reject) => {
            pythonProcess.on('close', (code) => {
                if (code !== 0) {
                    reject(new Error(`Python script exited with code ${code}. Error: ${errorData}`));
                } else {
                    resolve();
                }
            });
        });

        // 3. Parse Result
        // Look for JSON output markers
        const match = outputData.match(/JSON_START\s*([\s\S]*?)\s*JSON_END/);
        if (!match || !match[1]) {
            throw new Error("Could not parse JSON output from Python script. Output was: " + outputData);
        }

        const resultPaths = JSON.parse(match[1]);
        console.log("📦 Raw Result:", resultPaths);

        // IDM-VTON returns a tuple (image_path, seed). We want the image path.
        // It might be nested depending on the client version.
        // Usually: [ "/tmp/.../image.png", 42 ]
        // vton_wrapper.py dumps the direct result.

        let generatedImagePath = null;
        if (Array.isArray(resultPaths)) {
            generatedImagePath = resultPaths[0]; // First element is usually the file
        } else {
            generatedImagePath = resultPaths;
        }

        // Handle weird nesting if necessary
        if (typeof generatedImagePath === 'object' && generatedImagePath.value) {
            generatedImagePath = generatedImagePath.value; // sometimes { name, value, ... }
        }

        if (!generatedImagePath || typeof generatedImagePath !== 'string' || !fs.existsSync(generatedImagePath)) {
            throw new Error(`Generated image not found or invalid path: ${generatedImagePath}`);
        }

        console.log(`📥 Generated file at: ${generatedImagePath}`);

        // 4. Move/Copy to Public Dir
        const publicDir = path.resolve("public", "tryon");
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true });
        }
        const finalOutputFilename = `result_${Date.now()}.png`;
        const finalOutputPath = path.resolve(publicDir, finalOutputFilename);

        fs.copyFileSync(generatedImagePath, finalOutputPath);
        console.log(`💾 Saved to: ${finalOutputPath}`);

        // Cleanup inputs
        setTimeout(() => {
            try { if (userImagePath) fs.unlinkSync(userImagePath); } catch (e) { }
            try { if (garmentImagePath) fs.unlinkSync(garmentImagePath); } catch (e) { }
        }, 5000);

        res.json({
            success: true,
            image: `http://localhost:3000/tryon/${finalOutputFilename}`,
            resultImage: `http://localhost:3000/tryon/${finalOutputFilename}`,
            description: "Generated with IDM-VTON (Python Client)!",
        });

    } catch (error) {
        console.error("❌ Controller Error:", error);
        res.status(500).json({
            success: false,
            error: error.message || "Failed to generate try-on",
            details: "Python bridge failure. Check logs."
        });
    }
};

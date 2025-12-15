import { Client } from "@gradio/client";

async function inspect() {
    try {
        console.log("Connecting to yisol/IDM-VTON...");
        const client = await Client.connect("yisol/IDM-VTON");
        const api_info = await client.view_api();
        console.log("API Info:", JSON.stringify(api_info, null, 2));
    } catch (e) {
        console.error("Error:", e);
    }
}

inspect();

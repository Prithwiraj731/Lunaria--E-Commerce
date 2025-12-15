import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Navbar() {
  const navigate = useNavigate();
  const { user, token } = useUser();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const categoryRef = useRef(null);

  //Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    if (search.trim().length < 2) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    const debounce = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:3000/product/search?q=${encodeURIComponent(search.trim())}`);
        setSearchResults(res.data.products.slice(0, 5) || []);
        setShowDropdown(true);
      } catch (error) {
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [search]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
      setSearch("");
      setShowDropdown(false);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setSearch("");
    setShowDropdown(false);
  };

  // Check if current path is an admin route
  const isAdminRoute = window.location.pathname.startsWith('/admin');

  if (isAdminRoute) return null;

  const getCategoryBadge = (category) => {
    const cat = category?.toLowerCase();
    if (cat === 'men' || cat === 'man' || cat === 'male') return 'Men';
    if (cat === 'women' || cat === 'woman' || cat === 'female') return 'Women';
    if (cat === 'kids' || cat === 'kid' || cat === 'child') return 'Kids';
    return category;
  };

  const getCategoryColor = (category) => {
    const cat = category?.toLowerCase();
    if (cat === 'men' || cat === 'man' || cat === 'male') return 'bg-blue-100 text-blue-800';
    if (cat === 'women' || cat === 'woman' || cat === 'female') return 'bg-pink-100 text-pink-800';
    if (cat === 'kids' || cat === 'kid' || cat === 'child') return 'bg-green-100 text-green-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <header className="w-full flex items-center px-6 py-4 bg-light/90 backdrop-blur-md shadow-sm z-50 sticky top-0 border-b border-gray-200">
      <div className="flex items-center cursor-pointer" onClick={() => navigate('/')} title="Home">
        <img src="/lunaria.svg" alt="Lunaria" className="h-8 md:h-10 object-contain invert" />
      </div>
      <nav className="flex-1 flex justify-center hidden md:flex">
        <div className="flex gap-8 font-semibold tracking-wide text-gray-600 items-center">
          <Link to="/" className="hover:text-primary transition-colors duration-300">HOME</Link>

          {/* Category Dropdown */}
          <div
            ref={categoryRef}
            className="relative"
            onMouseEnter={() => setShowCategoryDropdown(true)}
            onMouseLeave={() => {
              // Add small delay before closing
              setTimeout(() => setShowCategoryDropdown(false), 150);
            }}
          >
            <button className="hover:text-primary transition-colors duration-300 flex items-center gap-1">
              CATEGORY
              <svg className={`w-4 h-4 transition-transform duration-300 ${showCategoryDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu - Reduced gap */}
            <div className={`absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 ${showCategoryDropdown ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}>
              <Link
                to="/category/women"
                className="block px-6 py-3 hover:bg-primary hover:text-dark transition-colors text-gray-600 font-semibold border-b border-gray-100"
                onClick={() => setShowCategoryDropdown(false)}
              >
                WOMAN
              </Link>
              <Link
                to="/category/men"
                className="block px-6 py-3 hover:bg-primary hover:text-dark transition-colors text-gray-600 font-semibold border-b border-gray-100"
                onClick={() => setShowCategoryDropdown(false)}
              >
                MAN
              </Link>
              <Link
                to="/category/kids"
                className="block px-6 py-3 hover:bg-primary hover:text-dark transition-colors text-gray-600 font-semibold"
                onClick={() => setShowCategoryDropdown(false)}
              >
                KIDS
              </Link>
            </div>
          </div>

          <Link to="/products" className="hover:text-primary transition-colors duration-300">ALL PRODUCTS</Link>
          <Link to="/try-on" className="text-purple-600 hover:text-purple-800 font-bold transition-colors duration-300 animate-pulse">TRY ON AI ✨</Link>
          <Link to="/about" className="hover:text-primary transition-colors duration-300">ABOUT</Link>
          <Link to="/contact" className="hover:text-primary transition-colors duration-300">CONTACT</Link>
        </div>
      </nav>
      <div className="flex items-center gap-4">
        {/* Enhanced Search with Dropdown */}
        <div ref={searchRef} className="relative hidden lg:block">
          <form onSubmit={handleSearch} className="flex items-center bg-white px-3 py-1 rounded-full border border-gray-300 focus-within:border-primary transition shadow-sm">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="bg-transparent text-dark focus:outline-none w-48 placeholder-gray-400 text-sm"
            />
            <button type="submit" className="text-gray-400 hover:text-primary transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>

          {/* Search Dropdown */}
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 max-h-96 overflow-y-auto">
              {loading ? (
                <div className="p-4 text-center text-gray-500">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  Searching...
                </div>
              ) : searchResults.length > 0 ? (
                <>
                  {searchResults.map((product) => (
                    <div
                      key={product._id}
                      onClick={() => handleProductClick(product._id)}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0 transition-colors"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-md border border-gray-200"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-dark text-sm truncate">{product.name}</h4>
                        <p className="text-xs text-gray-500 truncate">{product.brand}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="font-bold text-dark text-sm">₹{product.price}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${getCategoryColor(product.category)}`}>
                          {getCategoryBadge(product.category)}
                        </span>
                      </div>
                    </div>
                  ))}
                  <Link
                    to={`/search?q=${encodeURIComponent(search.trim())}`}
                    onClick={() => { setSearch(""); setShowDropdown(false); }}
                    className="block p-3 text-center text-primary font-semibold hover:bg-gray-50 border-t border-gray-200 text-sm"
                  >
                    View All Results →
                  </Link>
                </>
              ) : (
                <div className="p-4 text-center text-gray-500 text-sm">
                  No products found for "{search}"
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {!token ? (
            <Link to="/login" className="px-4 py-2 bg-dark text-white rounded-full hover:bg-primary hover:text-dark transition font-bold text-sm">LOGIN</Link>
          ) : (
            <div
              className="cursor-pointer flex items-center gap-2"
              onClick={() => navigate('/account')}
              title="Go to Account"
            >
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center border-2 border-primary overflow-hidden">
                <img
                  src={`https://ui-avatars.com/api/?name=${(user?.name || 'User').replace(' ', '+')}&background=FACC15&color=1F2937&size=40`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          <Link to="/cart" className="relative p-2 bg-primary text-dark rounded-full hover:bg-yellow-400 transition shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

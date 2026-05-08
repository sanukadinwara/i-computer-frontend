import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiCpu,
  FiHeadphones,
  FiMonitor,
  FiShield,
  FiShoppingCart,
  FiTruck,
  FiZap,
} from "react-icons/fi";
import { BiShoppingBag } from "react-icons/bi";
import { addToCart } from "../src/utils/cart";

export default function LandingPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + "/products");
        setProducts(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        toast.error("Failed to fetch featured products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const featuredProducts = useMemo(() => products.slice(0, 8), [products]);

  useEffect(() => {
    if (featuredProducts.length <= 1) return;

    const sliderTimer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featuredProducts.length);
    }, 4500);

    return () => clearInterval(sliderTimer);
  }, [featuredProducts.length]);

  const nextProduct = () => {
    if (featuredProducts.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % featuredProducts.length);
  };

  const previousProduct = () => {
    if (featuredProducts.length === 0) return;
    setActiveIndex((prev) =>
      prev === 0 ? featuredProducts.length - 1 : prev - 1
    );
  };

  const activeProduct = featuredProducts[activeIndex];

  const categories = [
    {
      title: "Gaming PCs",
      description: "Powerful builds for smooth gaming, streaming, and creative work.",
      icon: <FiCpu />,
    },
    {
      title: "Laptops",
      description: "Portable performance for study, business, design, and everyday use.",
      icon: <FiMonitor />,
    },
    {
      title: "Accessories",
      description: "Keyboards, mice, headsets, storage, and must-have computer gear.",
      icon: <FiHeadphones />,
    },
  ];

  const benefits = [
    { title: "Fast Delivery", text: "Quick order handling and reliable delivery.", icon: <FiTruck /> },
    { title: "Quality Checked", text: "Products selected for performance and value.", icon: <FiShield /> },
    { title: "Expert Support", text: "Friendly help before and after your purchase.", icon: <FiZap /> },
  ];

  const getImageUrl = (imageField) => {
    if (!imageField) return "/logo.png";
    
    let firstImage = Array.isArray(imageField) ? imageField[0] : imageField;
    
    if (typeof firstImage === 'string' && firstImage.includes(',')) {
        firstImage = firstImage.split(',')[0];
    }
    
    if (typeof firstImage === 'string' && firstImage.startsWith('http')) {
        return firstImage;
    }
    
    return import.meta.env.VITE_API_URL + firstImage;
  };

  function handleAddToCart(product) {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const userEmail = user?.email;

    if (!userEmail) {
      toast.error("Please login to add items to the cart");
      return; 
    }

    addToCart(product, 1, userEmail);
    toast.success("Product added to cart");
  }

  return (
    <main className="w-full min-h-screen bg-primary text-secondary overflow-hidden">
      <section className="relative min-h-[calc(100vh-100px)] flex items-center px-5 sm:px-8 lg:px-16 py-14 lg:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(227,11,111,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(138,0,196,0.16),transparent_36%)]" />
        <div className="absolute top-20 right-8 w-[180px] h-[180px] rounded-full bg-[#E30B6F]/10 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-[220px] h-[220px] rounded-full bg-[#8a00c4]/10 blur-3xl" />

        <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-secondary/10 bg-white/80 shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-accent accent-glow" />
              <span className="text-sm font-semibold text-secondary/75">
                Premium computer store experience
              </span>
            </div>

            <div className="space-y-5">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight">
                Upgrade Your Setup With
                <span className="block bg-accent bg-clip-text text-transparent">
                  Dawe Computers
                </span>
              </h1>
              <p className="max-w-xl text-base sm:text-lg text-secondary/65 leading-8">
                Discover stylish laptops, powerful desktops, gaming accessories,
                and performance-ready computer products built for work, study,
                gaming, and creativity.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="group h-[54px] px-7 rounded-full bg-accent accent-glow text-white font-bold flex items-center justify-center gap-3 hover:scale-[1.03] transition-all duration-300"
              >
                Shop Products
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/contact"
                className="h-[54px] px-7 rounded-full border border-secondary/15 text-secondary font-bold flex items-center justify-center hover:border-secondary hover:bg-secondary hover:text-white transition-all duration-300"
              >
                Get Expert Help
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-lg pt-3">
              <div>
                <h3 className="text-2xl font-black">100%</h3>
                <p className="text-sm text-secondary/55">Quality focus</p>
              </div>
              <div>
                <h3 className="text-2xl font-black">24/7</h3>
                <p className="text-sm text-secondary/55">Online browsing</p>
              </div>
              <div>
                <h3 className="text-2xl font-black">Fast</h3>
                <p className="text-sm text-secondary/55">Support response</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-5 bg-accent opacity-20 blur-3xl rounded-full" />
            <div className="relative rounded-[2rem] bg-secondary p-3 shadow-2xl overflow-hidden">
              <div className="rounded-[1.6rem] bg-[url('/background.jpg')] bg-cover bg-center min-h-[440px] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/55 to-[#8a00c4]/60" />

                <div className="relative z-10 h-full min-h-[440px] flex flex-col justify-between p-6 sm:p-8 text-white">
                  <div className="flex justify-between items-start gap-5">
                    <div>
                      <p className="text-white/60 text-sm font-medium uppercase tracking-[0.3em]">
                        Featured Tech
                      </p>
                      <h2 className="mt-3 text-3xl sm:text-4xl font-black leading-tight">
                        Built for speed. <br /> Styled for you.
                      </h2>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/15">
                      <FiCpu size={28} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-4">
                      <p className="text-white/55 text-xs">Performance</p>
                      <h3 className="text-xl font-black mt-1">High Speed</h3>
                    </div>
                    <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-4">
                      <p className="text-white/55 text-xs">Design</p>
                      <h3 className="text-xl font-black mt-1">Premium Look</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-8 lg:px-16 -mt-8 relative z-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-5">
          {benefits.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-3xl border border-secondary/10 shadow-xl shadow-black/5 p-6 flex items-start gap-4 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="min-w-12 h-12 rounded-2xl bg-accent text-white flex items-center justify-center text-2xl accent-glow">
                {item.icon}
              </div>
              <div>
                <h3 className="font-black text-lg">{item.title}</h3>
                <p className="text-secondary/55 text-sm mt-1 leading-6">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 sm:px-8 lg:px-16 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div>
              <p className="font-bold bg-accent bg-clip-text text-transparent uppercase tracking-[0.25em] text-sm">
                Featured Products
              </p>
              <h2 className="text-3xl sm:text-5xl font-black mt-3 tracking-tight">
                Latest Picks For Your Setup
              </h2>
              <p className="text-secondary/60 mt-4 max-w-2xl leading-7">
                Power up your performance with our latest collection of
                <span className="font-semibold text-secondary"> Top-Tier Tech </span>
              </p>
            </div>

            <Link
              to="/products"
              className="w-fit px-6 py-3 rounded-full bg-secondary text-white font-bold hover:bg-accent transition-all duration-300 flex items-center gap-2"
            >
              View All Products <FiArrowRight />
            </Link>
          </div>

          {loading ? (
            <div className="h-[420px] rounded-[2rem] border border-secondary/10 bg-secondary/5 animate-pulse" />
          ) : featuredProducts.length > 0 ? (
            <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6 items-stretch">
              <div className="relative min-h-[460px] rounded-[2rem] bg-secondary overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(227,11,111,0.35),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(138,0,196,0.4),transparent_40%)]" />
                <div className="relative z-10 h-full grid md:grid-cols-2 gap-6 p-6 sm:p-8 items-center">
                  <div className="space-y-5 text-white">
                    <span className="inline-flex px-4 py-2 rounded-full bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-[0.25em]">
                      Product Highlight
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-black leading-tight">
                      {activeProduct?.name || activeProduct?.productName || "Premium Product"}
                    </h3>
                    <p className="text-white/65 leading-7 line-clamp-3">
                      {activeProduct?.description ||
                        "Explore one of the latest products available at Dawe Computers."}
                    </p>

                    <div className="flex items-center gap-4 flex-wrap">
                      <p className="text-3xl font-black">
                        Rs. {activeProduct?.price?.toLocaleString?.() || activeProduct?.price || "--"}
                      </p>
                      {activeProduct?.lastPrice && (
                        <p className="text-white/40 line-through font-semibold">
                          Rs. {activeProduct.lastPrice?.toLocaleString?.() || activeProduct.lastPrice}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        onClick={() => handleAddToCart(activeProduct)}
                        className="h-[50px] w-[250px] px-6 rounded-full bg-accent accent-glow font-bold flex items-center justify-center gap-2 hover:scale-[1.03] transition-all duration-300 whitespace-nowrap cursor-pointer"
                      >
                        <FiShoppingCart /> Add to Cart
                      </button>
                      <Link
                        to={`/overview/${activeProduct?.productId || activeProduct?._id}`}
                        className="h-[50px] w-[250px] px-6 rounded-full bg-white/10 border border-white/15 font-bold flex items-center justify-center gap-2 hover:bg-white hover:text-secondary transition-all duration-300 whitespace-nowrap"
                      >
                        View Details <FiArrowRight />
                      </Link>
                    </div>
                  </div>

                  <div className="relative flex justify-center items-center">
                    <div className="absolute w-[200px] h-[200px] rounded-full bg-white/10 blur-2xl" />
                    <img
                        src={getImageUrl(activeProduct?.images || activeProduct?.image || activeProduct?.productImage)}
                        alt={activeProduct?.name || activeProduct?.productName || "Product"}
                        className="relative z-10 max-h-[250px] w-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                <button
                  onClick={previousProduct}
                  className="absolute z-999 cursor-pointer left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-secondary transition-all"
                >
                  <FiChevronLeft size={24} />
                </button>
                <button
                  onClick={nextProduct}
                  className="absolute z-999 cursor-pointer right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-secondary transition-all"
                >
                  <FiChevronRight size={24} />
                </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4 max-h-[480px] overflow-y-auto hide-scroll-track pr-1">
                {featuredProducts.map((product, index) => (
                  <button
                    key={product.productId || product._id || index}
                    onClick={() => setActiveIndex(index)}
                    className={`text-left rounded-3xl border p-4 flex items-center gap-4 transition-all duration-300 ${
                      activeIndex === index
                        ? "border-transparent bg-accent text-white accent-glow scale-[1.01]"
                        : "border-secondary/10 bg-white hover:border-secondary/25 hover:shadow-lg"
                    }`}
                  >
                    <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center overflow-hidden border border-secondary/10">
                      <img
                        src={getImageUrl(product?.images || product?.image || product?.productImage)}
                        alt={product?.name || product?.productName || "Product"}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-black truncate">
                        {product?.name || product?.productName || "Product"}
                      </h4>
                      <p
                        className={`text-sm mt-1 ${
                          activeIndex === index ? "text-white/75" : "text-secondary/55"
                        }`}
                      >
                        Rs. {product?.price?.toLocaleString?.() || product?.price || "--"}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-[2rem] border border-secondary/10 bg-secondary/5 p-10 text-center">
              <BiShoppingBag size={48} className="mx-auto text-secondary/35" />
              <h3 className="mt-4 text-2xl font-black">No featured products found</h3>
              <p className="text-secondary/55 mt-2">
                Add products to your database and they will appear here automatically.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="px-5 sm:px-8 lg:px-16 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="font-bold bg-accent bg-clip-text text-transparent uppercase tracking-[0.25em] text-sm">
              Shop By Need
            </p>
            <h2 className="text-3xl sm:text-5xl font-black mt-3 tracking-tight">
              Find The Right Tech Faster
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                to="/products"
                key={category.title}
                className="group relative rounded-[2rem] bg-white border border-secondary/10 p-7 overflow-hidden shadow-xl shadow-black/5 hover:-translate-y-2 transition-all duration-300"
              >
                <div className="absolute inset-x-0 bottom-0 h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                <div className="w-16 h-16 rounded-2xl bg-accent text-white flex items-center justify-center text-3xl accent-glow group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-black mt-6">{category.title}</h3>
                <p className="text-secondary/60 mt-3 leading-7">{category.description}</p>
                <div className="mt-6 font-bold flex items-center gap-2 bg-accent bg-clip-text text-transparent">
                  Explore Now <FiArrowRight className="text-[#8a00c4] group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-8 lg:px-16 pb-20">
        <div className="max-w-7xl mx-auto rounded-[2rem] bg-secondary overflow-hidden relative p-8 sm:p-12 lg:p-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(227,11,111,0.38),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(138,0,196,0.45),transparent_40%)]" />
          <div className="relative z-10 grid lg:grid-cols-[1fr_auto] gap-8 items-center text-white">
            <div>
              <p className="text-white/55 font-bold uppercase tracking-[0.25em] text-sm">
                Ready to upgrade?
              </p>
              <h2 className="text-3xl sm:text-5xl font-black mt-4 leading-tight">
                Build your perfect computer setup today.
              </h2>
              <p className="text-white/65 mt-4 max-w-2xl leading-7">
                Browse products, compare options, add items to your cart, and get
                the tech you need with a clean shopping experience.
              </p>
            </div>

            <Link
              to="/products"
              className="h-[56px] px-8 rounded-full bg-accent accent-glow font-bold flex items-center justify-center gap-3 hover:scale-[1.03] transition-all duration-300"
            >
              Start Shopping <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

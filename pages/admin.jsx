import { useState } from "react";
import { Link, NavLink, Routes, Route } from "react-router-dom";
import logo from "/logo.png";

import { FaHome, FaShoppingBag, FaUser, FaSignOutAlt } from "react-icons/fa";
import { IoMdPricetag } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

import AdminProductsPage from "./admin/adminProductsPage.jsx";
import AdminUpdateProductPage from "./admin/adminUpdateProductPage.jsx";
import AdminAddProductPage from "./admin/adminAddProductPage.jsx";
import AdminOrdersPage from "./admin/adminOrdersPage";
import AdminUsersPage from "./admin/adminUsersPage.jsx";

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function signout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
  }

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: <FaHome />,
    },
    {
      name: "Orders",
      path: "/admin/",
      icon: <FaShoppingBag />,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: <IoMdPricetag />,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <FaUser />,
    },
  ];

  return (
    <div className="relative w-full h-screen bg-accent overflow-hidden flex">
      <svg width="0" height="0" className="absolute">
        <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop stopColor="#E30B6F" offset="0%" />
          <stop stopColor="#8A00C4" offset="100%" />
        </linearGradient>
      </svg>

      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-5 left-5 z-[200] w-12 h-12 rounded-2xl bg-primary backdrop-blur-xl border border-black/20 flex items-center justify-center text-secondary text-2xl shadow-xl"
      >
        <FiMenu />
      </button>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[150]"
        ></div>
      )}

      <aside
        className={`
          fixed lg:static top-0 left-0 z-[999]
          w-[290px] sm:w-[310px] h-screen
          bg-secondary/95 lg:bg-secondary/35
          backdrop-blur-2xl border-r border-white/15
          text-primary flex flex-col
          transition-all duration-500 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -left-20 w-[220px] h-[220px] bg-[#E30B6F]/30 rounded-full blur-[70px]"></div>
          <div className="absolute top-[40%] -right-24 w-[220px] h-[220px] bg-[#8A00C4]/35 rounded-full blur-[80px]"></div>
        </div>

        <div className="relative z-10 px-5 pt-5 pb-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-[62px] h-[62px] rounded-2xl bg-white p-2 shadow-xl accent-glow flex items-center justify-center">
                <img
                  src={logo}
                  alt="Dawe Computers Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="justify-center">
                <h2 className="text-xl font-black leading-tight">
                  Dawe Computers
                </h2>
              </div>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-2xl hover:bg-white/20 transition"
            >
              <IoClose />
            </button>
          </div>

          <div className="mt-7 rounded-3xl bg-white/10 border border-white/15 p-4 shadow-xl">
            <p className="text-xs uppercase tracking-[3px] text-white/50 font-bold">
              Admin Panel
            </p>
            <h1 className="mt-1 text-2xl font-black text-white">
              Control Center
            </h1>
            <p className="mt-2 text-sm text-white/60">
              Manage orders, products and users.
            </p>
          </div>
        </div>

        <nav className="relative z-10 flex-1 px-4 mt-3 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/admin/"}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `
                group relative flex items-center gap-4 px-4 py-3.5 rounded-2xl
                text-[16px] font-bold tracking-wide
                transition-all duration-300 overflow-hidden
                ${
                  isActive
                    ? "bg-white text-secondary shadow-xl scale-[1.02]"
                    : "text-white/75 hover:text-white hover:bg-white/10"
                }
                `
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`
                      absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 rounded-r-full
                      bg-accent transition-all duration-300
                      ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
                    `}
                  ></span>

                  <span
                    className={`
                      w-11 h-11 rounded-2xl flex items-center justify-center text-xl
                      transition-all duration-300
                      ${
                        isActive
                          ? "bg-accent text-white accent-glow"
                          : "bg-white/10 text-white group-hover:bg-white group-hover:text-secondary"
                      }
                    `}
                  >
                    {item.icon}
                  </span>

                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="relative z-10 px-4 pb-5">
          <div className="mb-4 rounded-3xl bg-white/10 border border-white/15 p-4">
            <p className="text-xs text-white/45 font-bold uppercase tracking-[2px]">
              Logged in as
            </p>
            <h3 className="text-lg font-black text-white mt-1">Admin</h3>
            <p className="text-sm text-white/55">Dawe Computers</p>
          </div>

          <Link
            onClick={signout}
            to="/login"
            className="
              group flex items-center gap-4 px-4 py-3.5 rounded-2xl
              bg-white text-secondary font-black text-[16px]
              hover:scale-[1.02] hover:shadow-2xl transition-all duration-300
            "
          >
            <span className="w-11 h-11 rounded-2xl bg-accent text-white flex items-center justify-center text-xl accent-glow">
              <FaSignOutAlt />
            </span>
            Sign Out
          </Link>
        </div>
      </aside>

      <main className="w-full lg:w-[calc(100%-310px)] h-screen p-3 sm:p-4 lg:p-5 overflow-hidden">
        <div
          className="
            w-full h-full rounded-[28px]
            bg-primary text-secondary
            border border-white/30 shadow-2xl
            overflow-hidden
          "
        >
          <div className="w-full h-full overflow-y-auto hide-scroll-track p-1 sm:p-2 lg:p-2">
            <Routes>
              <Route path="/" element={<AdminOrdersPage />} />
              <Route path="/products" element={<AdminProductsPage />} />
              <Route path="/users" element={<AdminUsersPage />} />
              <Route path="/add-product" element={<AdminAddProductPage />} />
              <Route path="/update-product" element={<AdminUpdateProductPage />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
}
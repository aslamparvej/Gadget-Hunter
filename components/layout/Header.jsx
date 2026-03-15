"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

import { Search, ShoppingCart } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const {user, logout} = useAuth();

  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "categories", label: "Categoris" },
    { href: "orders", label: "Orders" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <header
      className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-bg-card)]/95 backdrop-blur-md"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
        {/* Logo  */}
        <Link
          href="/"
          className="text-2xl font-mediumfont-display font-bold text-2xl tracking-tight shrink-0"
        >
          <span style={{ color: "var(--color-primary)" }}>Gadget</span> Hunter
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-1 ml-4">
          {navLinks.map((nav) => (
            <Link
              key={nav.label}
              href={nav.href}
              className={`px-3 py-1.5 rounded-[var(--radius)] text-sm font-medium transition-colors ${
                pathname.startsWith(nav.href)
                  ? "bg-[var(--color-bg-subtle)] text-[var(--color-primary)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-subtle)]"
              }`}
            >
              {nav.label}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className={`relative hidden md:flex items-center gap-2 transition-all ${searchOpen ? "w-72" : "w-48"}`}
        >
          <Search
            size={16}
            className="absolute left-3 top-1/2  -translate-y-1/2 text-[var(--color-text-muted)]"
          />
          <input
            className="input pl-9 py-2 text-sm h-9"
            placeholder="Search products…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setSearchOpen(false)}
          />
        </form>

        {/* Actions  */}
        <div className="flex items-center gap-1.5">
          <Link href="cart" className="relative btn-icon">
            <ShoppingCart size={24} />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--color-secondary)] text-white text-[10px] font-bold flex items-center justify-center leading-none">
              2
            </span>
          </Link>

          {user ? (
            <div className="relative">
              
            </div>
          ) : (
            <Link href="/auth/login" className="btn btn-primary btn-sm">
            Sign In
          </Link>
          )}
          
        </div>
      </div>
    </header>
  );
};

export default Header;

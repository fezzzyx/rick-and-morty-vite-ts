import { Link, useLocation } from "react-router";
import { useState, useRef, useEffect } from "react";

const NavButton = ({ to, label, active }: { to: string; label: string; active?: boolean }) => {
    return (
        <Link
            to={to}
            aria-current={active ? "page" : undefined}
            className={`
        relative z-10 inline-flex items-center justify-center
        px-4 py-2 rounded-full text-sm font-medium
        transition-transform duration-200 ease-out
        ${active
                ? "bg-white text-teal-700 shadow-[0_6px_20px_rgba(16,185,129,0.12)] scale-105"
                : "text-white/90 hover:scale-[1.03] hover:translate-y-[-2px]"}
      `}
        >
            {label}
            {active && (
                <span
                    className="absolute -bottom-3 h-1 w-8 rounded-full"
                    aria-hidden
                    style={{
                        background:
                            "linear-gradient(90deg, rgba(16,185,129,0.9) 0%, rgba(99,102,241,0.9) 100%)",
                        filter: "blur(8px)",
                    }}
                />
            )}
        </Link>
    );
};

export default function Header() {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const handleScroll = () => setScrolled(window.scrollY > 10);
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    useEffect(() => {
        if (searchOpen && inputRef.current) inputRef.current.focus();
    }, [searchOpen]);

    return (
        <header
            className={`
        fixed top-4 left-0 right-0 z-50 pointer-events-none
        transition-all duration-300
        ${scrolled ? "translate-y-0" : "translate-y-0"}
      `}
        >
            <div className="max-w-6xl mx-auto px-4 flex items-center justify-between pointer-events-auto">
                {/* Left: Logo */}
                <div className="flex items-center gap-3">
                    <Link to="/">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Rick_and_Morty.svg"
                            alt="Rick and Morty Logo"
                            className="h-12 w-auto object-contain"
                        />
                    </Link>
                </div>

                {/* Center: Floating bubble nav */}
                <nav
                    aria-label="Main navigation"
                    className={`
            relative mx-auto flex items-center
            px-2 py-2 rounded-full
            bg-gradient-to-r from-[#06261a]/70 via-[#08323a]/50 to-[#04111a]/60
            backdrop-blur-md shadow-2xl
            transform transition-all duration-300
            scale-100
          `}
                    style={{ boxShadow: "0 10px 40px rgba(2,6,23,0.6)" }}
                >
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-full overflow-hidden"
                        style={{ zIndex: 0 }}
                    >
            <span
                className="absolute -left-8 -top-6 w-20 h-20 rounded-full opacity-40 blur-2xl"
                style={{ background: "radial-gradient(circle at center, rgba(16,185,129,0.12), transparent)" }}
            />
                        <span
                            className="absolute -right-8 -bottom-6 w-28 h-28 rounded-full opacity-30 blur-3xl"
                            style={{ background: "radial-gradient(circle at center, rgba(99,102,241,0.10), transparent)" }}
                        />
                    </div>

                    <div className="relative z-10 flex gap-2 px-3">
                        <NavButton to="/" label="Home" active={location.pathname === "/"} />
                        <NavButton to="/characters" label="Characters" active={location.pathname.startsWith("/characters")} />
                        <NavButton to="/locations" label="Locations" active={location.pathname.startsWith("/locations")} />
                        <NavButton to="/episodes" label="Episodes" active={location.pathname.startsWith("/episodes")} />
                    </div>
                </nav>

                {/* Right: Expanding search bubble */}
                <div className="flex items-center gap-3 relative">
                    <div
                        className={`
              flex items-center transition-all duration-300 rounded-full
              bg-white/10 backdrop-blur-md
              ${searchOpen ? "w-64 px-4 py-2 shadow-lg" : "w-12 p-2"}
              cursor-pointer
            `}
                        onClick={() => setSearchOpen(true)}
                    >
                        <span className="text-white text-lg">{searchOpen ? "🔍" : "🔍"}</span>
                        {searchOpen && (
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search characters..."
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                onBlur={() => setSearchOpen(false)}
                                className="ml-2 bg-transparent outline-none text-white placeholder-white/70 w-full"
                            />
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

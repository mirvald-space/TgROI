"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { BarChart, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import ChannelFormModal from './ChannelFormModal';
import { useState, useEffect } from "react";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes or on larger screens
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="border-b sticky top-0 bg-white z-10">
      <div className="container mx-auto py-4 px-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 text-white p-2 rounded-md">
              <BarChart className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">TgAnalytics</h1>
              <p className="text-xs text-muted-foreground">Анализ цен и эффективности рекламы</p>
            </div>
          </div>

          {/* Navigation - Updated with both pages */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/"
              className={`text-sm font-medium transition-colors ${
                pathname === "/" ? "text-blue-600" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Аналитика рынка
            </Link>
            <Link 
              href="/channels"
              className={`text-sm font-medium transition-colors ${
                pathname === "/channels" ? "text-blue-600" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Список каналов
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <ChannelFormModal />
            
            {/* Mobile menu button */}
            <Button 
              variant="outline" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu (shown/hidden based on state) */}
        <div 
          className={`md:hidden py-4 border-t mt-4 transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "opacity-100 max-h-40" : "opacity-0 max-h-0 overflow-hidden border-t-0"
          }`}
        >
          <nav className="flex flex-col space-y-4">
            <Link 
              href="/"
              className={`px-2 py-1 rounded-md text-sm font-medium ${
                pathname === "/" ? "bg-blue-50 text-blue-600" : "text-gray-700"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Аналитика рынка
            </Link>
            <Link 
              href="/channels"
              className={`px-2 py-1 rounded-md text-sm font-medium ${
                pathname === "/channels" ? "bg-blue-50 text-blue-600" : "text-gray-700"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Список каналов
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header; 
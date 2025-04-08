
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="#" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/c4b96b38-bfd1-4b8c-8d70-075736d5e165.png" 
                alt="C-CAR Logo" 
                className="h-10 w-auto"
              />
            </a>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {["Features", "How it Works", "About Us", "Contact"].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className={cn(
                  "text-sm font-medium transition-all duration-300 hover:text-primary",
                  scrolled ? "text-foreground" : "text-foreground"
                )}
              >
                {item}
              </a>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              className={cn(
                "transition-all duration-300 hidden sm:inline-flex",
                scrolled 
                  ? "bg-white text-foreground hover:bg-gray-100" 
                  : "bg-white/80 backdrop-blur-sm text-foreground hover:bg-white"
              )}
            >
              Log In
            </Button>
            <Button 
              size="sm" 
              className={cn(
                "transition-all duration-300",
                "bg-primary text-white hover:bg-primary/90"
              )}
            >
              Request Demo
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;

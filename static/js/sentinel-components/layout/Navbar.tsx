import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Shield, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const mainNavLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Threat Monitor", href: "/portal" },
  { name: "Sentinel-X", href: "/sentinel-x" },
  { name: "About", href: "/trust-center" },
  { name: "Trust Center", href: "/trust-center" },
  { name: "Team", href: "/portal/team" },
  { name: "Contact", href: "/contact" },
];

const productLinks = [
  { name: "GEM Bio-Vault", href: "/products/bio-vault" },
  { name: "GEM Neural-Net", href: "/products/neural-net" },
  { name: "GEM Quantum-Guard", href: "/products/quantum-guard" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/30 bg-background/90 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Shield className="h-8 w-8 text-primary transition-all duration-300 group-hover:drop-shadow-[0_0_8px_hsl(var(--primary))]" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-foreground">
                GEM Cybersecurity and Monitoring Assist
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <Link to="/">
              <Button variant="nav" size="sm" className="px-3">
                Home
              </Button>
            </Link>
            
            {/* GEM Products Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="nav" size="sm" className="px-3 gap-1">
                  GEM Products
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 bg-card border-border">
                {productLinks.map((link) => (
                  <DropdownMenuItem key={link.name} asChild>
                    <Link 
                      to={link.href}
                      className="cursor-pointer text-muted-foreground hover:text-foreground"
                    >
                      {link.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/services">
              <Button variant="nav" size="sm" className="px-3">
                Services
              </Button>
            </Link>
            <Link to="/portal">
              <Button variant="nav" size="sm" className="px-3">
                Threat Monitor
              </Button>
            </Link>
            <Link to="/sentinel-x">
              <Button variant="nav" size="sm" className="px-3">
                Sentinel-X
              </Button>
            </Link>
            <Link to="/trust-center">
              <Button variant="nav" size="sm" className="px-3">
                About
              </Button>
            </Link>
            <Link to="/trust-center">
              <Button variant="nav" size="sm" className="px-3">
                Trust Center
              </Button>
            </Link>
            <Link to="/portal/team">
              <Button variant="nav" size="sm" className="px-3">
                Team
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="nav" size="sm" className="px-3">
                Contact
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border transition-all duration-300 overflow-hidden",
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto px-4 py-4 space-y-2">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block py-3 px-4 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
          >
            Home
          </Link>
          
          {/* GEM Products Collapsible */}
          <Collapsible open={productsOpen} onOpenChange={setProductsOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-4 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors">
              <span>GEM Products</span>
              {productsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-4 space-y-1">
              {productLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => {
                    setIsOpen(false);
                    setProductsOpen(false);
                  }}
                  className="block py-2 px-4 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>
          
          {mainNavLinks.slice(1).map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-3 px-4 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 flex flex-col gap-2 border-t border-border">
            <Link to="/portal" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full">
                Client Portal
              </Button>
            </Link>
            <Link to="/contact" onClick={() => setIsOpen(false)}>
              <Button variant="hero" className="w-full">
                Secure Your Perimeter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
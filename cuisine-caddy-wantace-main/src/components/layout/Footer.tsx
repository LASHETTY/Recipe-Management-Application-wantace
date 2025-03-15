
import React from "react";
import { ChefHat } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary mt-auto py-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <ChefHat className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">Cuisine Caddy</span>
          </div>
          <div className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Cuisine Caddy. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

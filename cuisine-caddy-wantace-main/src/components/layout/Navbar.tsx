
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChefHat, Search, PlusCircle } from "lucide-react";

const Navbar = ({ onSearch }: { onSearch?: (query: string) => void }) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <nav className="border-b border-border sticky top-0 bg-background z-10">
      <div className="container mx-auto py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <ChefHat className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">Cuisine Caddy</span>
          </Link>
        </div>

        {onSearch && (
          <form onSubmit={handleSearch} className="relative w-full md:w-1/3">
            <Input
              type="text"
              placeholder="Search recipes..."
              className="w-full pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </form>
        )}

        <div className="flex items-center gap-4">
          <Link to="/recipes/new">
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              New Recipe
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

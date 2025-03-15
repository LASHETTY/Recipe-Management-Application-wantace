
import React from "react";
import RecipeCard from "./RecipeCard";
import { Recipe } from "@/types/recipe";

interface RecipeGridProps {
  recipes: Recipe[];
  onToggleFavorite?: (id: string) => void;
}

const RecipeGrid: React.FC<RecipeGridProps> = ({ recipes, onToggleFavorite }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default RecipeGrid;

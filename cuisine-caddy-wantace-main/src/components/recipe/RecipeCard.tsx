
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Recipe } from "@/types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
  onToggleFavorite?: (id: string) => void;
  isDragging?: boolean;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>, recipe: Recipe) => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>, recipe: Recipe) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onToggleFavorite,
  isDragging,
  draggable = false,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  const totalTime = recipe.prepTime + recipe.cookTime;
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(recipe.id);
    }
  };

  return (
    <div 
      className={cn(
        "recipe-card",
        isDragging && "dragging"
      )}
      draggable={draggable}
      onDragStart={(e) => onDragStart && onDragStart(e, recipe)}
      onDragOver={(e) => onDragOver && onDragOver(e)}
      onDrop={(e) => onDrop && onDrop(e, recipe)}
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="relative h-40 overflow-hidden">
          <img
            src={recipe.imageUrl || "https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=2126&auto=format&fit=crop"}
            alt={recipe.title}
            className="object-cover w-full h-full"
          />
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
            onClick={handleFavoriteClick}
          >
            <Heart 
              className={cn(
                "h-5 w-5", 
                recipe.isFavorite ? "fill-destructive text-destructive" : "text-muted-foreground"
              )} 
            />
          </Button>
        </div>
        <CardContent className="flex-grow py-4">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-lg font-semibold line-clamp-1">{recipe.title}</h3>
          </div>
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>{totalTime} min</span>
            <span className="mx-2">•</span>
            <span>{recipe.category}</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {recipe.description}
          </p>
        </CardContent>
        <CardFooter className="pt-0 pb-4">
          <Link to={`/recipes/${recipe.id}`} className="w-full">
            <Button variant="secondary" className="w-full">View Recipe</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RecipeCard;

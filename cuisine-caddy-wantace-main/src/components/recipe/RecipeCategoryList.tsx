
import React, { useState } from "react";
import RecipeCard from "./RecipeCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Recipe, RecipeCategory } from "@/types/recipe";

interface RecipeCategoryListProps {
  categories: RecipeCategory[];
  onUpdateCategories: (updatedCategories: RecipeCategory[]) => void;
  onToggleFavorite?: (id: string) => void;
}

const RecipeCategoryList: React.FC<RecipeCategoryListProps> = ({
  categories,
  onUpdateCategories,
  onToggleFavorite,
}) => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [draggedRecipe, setDraggedRecipe] = useState<Recipe | null>(null);
  const [draggedCategory, setDraggedCategory] = useState<RecipeCategory | null>(null);
  const [dragOverCategoryId, setDragOverCategoryId] = useState<string | null>(null);

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    
    const newCategory: RecipeCategory = {
      id: `cat-${Date.now()}`,
      name: newCategoryName,
      recipes: [],
    };
    
    onUpdateCategories([...categories, newCategory]);
    setNewCategoryName("");
  };

  const handleRecipeDragStart = (e: React.DragEvent<HTMLDivElement>, recipe: Recipe) => {
    setDraggedRecipe(recipe);
    // Set a ghost image for drag
    if (e.dataTransfer && e.target) {
      e.dataTransfer.effectAllowed = "move";
    }
  };

  const handleCategoryDragStart = (e: React.DragEvent<HTMLDivElement>, category: RecipeCategory) => {
    setDraggedCategory(category);
    if (e.dataTransfer && e.target) {
      e.dataTransfer.effectAllowed = "move";
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, categoryId: string) => {
    e.preventDefault();
    setDragOverCategoryId(categoryId);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetCategory: RecipeCategory) => {
    e.preventDefault();
    setDragOverCategoryId(null);
    
    if (draggedRecipe) {
      // Handle recipe drop (move recipe between categories)
      const sourceCategory = categories.find(cat => 
        cat.recipes.some(recipe => recipe.id === draggedRecipe.id)
      );
      
      if (sourceCategory && sourceCategory.id !== targetCategory.id) {
        const updatedCategories = categories.map(category => {
          if (category.id === sourceCategory.id) {
            return {
              ...category,
              recipes: category.recipes.filter(r => r.id !== draggedRecipe.id)
            };
          }
          if (category.id === targetCategory.id) {
            return {
              ...category,
              recipes: [...category.recipes, { ...draggedRecipe, category: targetCategory.name }]
            };
          }
          return category;
        });
        
        onUpdateCategories(updatedCategories);
      }
      
      setDraggedRecipe(null);
    } else if (draggedCategory && draggedCategory.id !== targetCategory.id) {
      // Handle category reordering
      const draggedIndex = categories.findIndex(cat => cat.id === draggedCategory.id);
      const targetIndex = categories.findIndex(cat => cat.id === targetCategory.id);
      
      if (draggedIndex !== -1 && targetIndex !== -1) {
        const reorderedCategories = [...categories];
        const [removed] = reorderedCategories.splice(draggedIndex, 1);
        reorderedCategories.splice(targetIndex, 0, removed);
        
        onUpdateCategories(reorderedCategories);
      }
      
      setDraggedCategory(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Add Category Form */}
      <div className="flex gap-2">
        <Input
          placeholder="New category name..."
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={handleAddCategory}>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>
      
      {/* Categories */}
      <div className="space-y-6">
        {categories.map((category) => (
          <Card 
            key={category.id}
            className={`${dragOverCategoryId === category.id ? 'drag-over' : ''}`}
            draggable
            onDragStart={(e) => handleCategoryDragStart(e, category)}
            onDragOver={(e) => handleDragOver(e, category.id)}
            onDrop={(e) => handleDrop(e, category)}
          >
            <CardHeader className="pb-3">
              <CardTitle>{category.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {category.recipes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.recipes.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      onToggleFavorite={onToggleFavorite}
                      draggable
                      onDragStart={handleRecipeDragStart}
                      onDragOver={(e) => e.preventDefault()}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  Drag and drop recipes here
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecipeCategoryList;

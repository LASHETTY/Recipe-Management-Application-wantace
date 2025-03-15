
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RecipeForm from "@/components/recipe/RecipeForm";
import { fetchRecipeById, updateRecipe } from "@/services/api";
import { Recipe } from "@/types/recipe";

const EditRecipe = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRecipe = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const recipeData = await fetchRecipeById(id);
        setRecipe(recipeData);
      } catch (error) {
        console.error("Error loading recipe:", error);
        toast({
          title: "Error loading recipe",
          description: "There was a problem loading the recipe. Please try again.",
          variant: "destructive"
        });
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    loadRecipe();
  }, [id, toast, navigate]);

  const handleSubmit = async (recipeData: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!id) return;
    
    try {
      await updateRecipe(id, recipeData);
      toast({
        title: "Recipe updated successfully!",
        variant: "default"
      });
      navigate(`/recipes/${id}`);
    } catch (error) {
      console.error("Error updating recipe:", error);
      toast({
        title: "Error updating recipe",
        description: "There was a problem updating your recipe. Please try again.",
        variant: "destructive"
      });
      throw error; // Re-throw for the form to handle
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto py-12 px-4 flex items-center justify-center">
          <p className="text-muted-foreground">Loading recipe details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto py-12 px-4 flex flex-col items-center justify-center gap-4">
          <h2 className="text-2xl font-semibold">Recipe not found</h2>
          <p className="text-muted-foreground">The recipe you're trying to edit doesn't exist or has been removed.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Edit Recipe</h1>
        <RecipeForm initialData={recipe} onSubmit={handleSubmit} isEditing />
      </main>
      
      <Footer />
    </div>
  );
};

export default EditRecipe;

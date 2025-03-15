
import React from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RecipeForm from "@/components/recipe/RecipeForm";
import { createRecipe } from "@/services/api";
import { Recipe } from "@/types/recipe";

const NewRecipe = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (recipeData: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await createRecipe(recipeData);
      toast({
        title: "Recipe created successfully!",
        variant: "default"
      });
      navigate("/");
    } catch (error) {
      console.error("Error creating recipe:", error);
      toast({
        title: "Error creating recipe",
        description: "There was a problem creating your recipe. Please try again.",
        variant: "destructive"
      });
      throw error; // Re-throw for the form to handle
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Create New Recipe</h1>
        <RecipeForm onSubmit={handleSubmit} />
      </main>
      
      <Footer />
    </div>
  );
};

export default NewRecipe;


import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetchRecipeById, updateRecipe } from "@/services/api";
import { Recipe } from "@/types/recipe";
import { Heart, Clock, Users, Edit, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const RecipeDetail = () => {
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
          description: "There was a problem loading the recipe details. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadRecipe();
  }, [id, toast]);

  const handleToggleFavorite = async () => {
    if (!recipe) return;
    
    try {
      const updatedRecipe = await updateRecipe(recipe.id, { isFavorite: !recipe.isFavorite });
      if (updatedRecipe) {
        setRecipe(updatedRecipe);
        toast({
          title: updatedRecipe.isFavorite ? "Added to favorites" : "Removed from favorites",
          variant: "default"
        });
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast({
        title: "Error updating recipe",
        description: "There was a problem updating the recipe. Please try again.",
        variant: "destructive"
      });
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
          <p className="text-muted-foreground">The recipe you're looking for doesn't exist or has been removed.</p>
          <Link to="/">
            <Button>Back to Recipes</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="mb-6">
          <Button variant="ghost" className="gap-2 pl-0" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <div className="relative rounded-lg overflow-hidden mb-6">
              <img
                src={recipe.imageUrl || "https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=2126&auto=format&fit=crop"}
                alt={recipe.title}
                className="w-full h-[350px] object-cover"
              />
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                onClick={handleToggleFavorite}
              >
                <Heart 
                  className={cn(
                    "h-5 w-5", 
                    recipe.isFavorite ? "fill-destructive text-destructive" : "text-muted-foreground"
                  )} 
                />
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Total Time</p>
                  <p className="text-muted-foreground">{totalTime} min</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Prep Time</p>
                  <p className="text-muted-foreground">{recipe.prepTime} min</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Cook Time</p>
                  <p className="text-muted-foreground">{recipe.cookTime} min</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Servings</p>
                  <p className="text-muted-foreground">{recipe.servings}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold">{recipe.title}</h1>
                <Link to={`/recipes/edit/${recipe.id}`}>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                </Link>
              </div>
              <p className="text-muted-foreground mb-4">{recipe.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Category:</span>
                <span className="text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded-md">
                  {recipe.category}
                </span>
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Instructions</h2>
              <ol className="recipe-instructions space-y-4">
                {recipe.instructions.map((step) => (
                  <li key={step.id} className="text-foreground">
                    {step.instruction}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="bg-secondary p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
              <p className="text-sm text-muted-foreground mb-4">For {recipe.servings} servings</p>
              <Separator className="mb-4" />
              <ul className="ingredients-list space-y-3">
                {recipe.ingredients.map((ingredient) => (
                  <li key={ingredient.id} className="text-foreground">
                    <span className="font-medium">{ingredient.amount} {ingredient.unit}</span> {ingredient.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RecipeDetail;

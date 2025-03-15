
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RecipeGrid from "@/components/recipe/RecipeGrid";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecipeCategoryList } from "@/components/recipe";
import { fetchAllRecipes, fetchRandomRecipe, updateRecipe, fetchCategories, updateCategoryOrder } from "@/services/api";
import { Recipe, RecipeCategory } from "@/types/recipe";
import { Shuffle } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<RecipeCategory[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [recipesData, categoriesData] = await Promise.all([
          fetchAllRecipes(),
          fetchCategories()
        ]);
        setRecipes(recipesData);
        setFilteredRecipes(recipesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error loading data:", error);
        toast({
          title: "Error loading recipes",
          description: "There was a problem loading the recipes. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [toast]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes(recipes);
    }
  }, [searchQuery, recipes]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleToggleFavorite = async (id: string) => {
    try {
      const recipe = recipes.find(r => r.id === id);
      if (!recipe) return;

      const updatedRecipe = await updateRecipe(id, { isFavorite: !recipe.isFavorite });
      if (updatedRecipe) {
        setRecipes(prev => prev.map(r => r.id === id ? updatedRecipe : r));
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

  const handleUpdateCategories = async (updatedCategories: RecipeCategory[]) => {
    try {
      await updateCategoryOrder(updatedCategories);
      setCategories(updatedCategories);
      
      // Update recipes with new category assignments
      const updatedRecipes = [...recipes];
      updatedCategories.forEach(category => {
        category.recipes.forEach(catRecipe => {
          const index = updatedRecipes.findIndex(r => r.id === catRecipe.id);
          if (index !== -1) {
            updatedRecipes[index] = { ...updatedRecipes[index], category: category.name };
          }
        });
      });
      
      setRecipes(updatedRecipes);
    } catch (error) {
      console.error("Error updating categories:", error);
      toast({
        title: "Error updating categories",
        description: "There was a problem updating the categories. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSurpriseMe = async () => {
    try {
      const randomRecipe = await fetchRandomRecipe();
      navigate(`/recipes/${randomRecipe.id}`);
    } catch (error) {
      console.error("Error fetching random recipe:", error);
      toast({
        title: "Error",
        description: "There was a problem fetching a random recipe. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onSearch={handleSearch} />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold">My Recipes</h1>
          <Button onClick={handleSurpriseMe} variant="outline" className="gap-2">
            <Shuffle className="h-4 w-4" />
            Surprise Me
          </Button>
        </div>
        
        {isLoading ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">Loading recipes...</p>
          </div>
        ) : (
          <Tabs defaultValue="all">
            <TabsList className="mb-8">
              <TabsTrigger value="all">All Recipes</TabsTrigger>
              <TabsTrigger value="organize">Organize</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              {filteredRecipes.length > 0 ? (
                <RecipeGrid
                  recipes={filteredRecipes}
                  onToggleFavorite={handleToggleFavorite}
                />
              ) : (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">No recipes found. Try a different search or add a new recipe.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="organize">
              <RecipeCategoryList
                categories={categories}
                onUpdateCategories={handleUpdateCategories}
                onToggleFavorite={handleToggleFavorite}
              />
            </TabsContent>
            
            <TabsContent value="favorites">
              {filteredRecipes.filter(r => r.isFavorite).length > 0 ? (
                <RecipeGrid
                  recipes={filteredRecipes.filter(r => r.isFavorite)}
                  onToggleFavorite={handleToggleFavorite}
                />
              ) : (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">No favorite recipes yet. Click the heart icon on a recipe card to add it to favorites.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

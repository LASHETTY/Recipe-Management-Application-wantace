
import { Recipe, RecipeCategory } from '@/types/recipe';

// This would be replaced with actual API calls to your MongoDB backend
// For now, we'll use mock data for development purposes

// Mock data
const mockCategories: RecipeCategory[] = [
  {
    id: "1",
    name: "Breakfast",
    recipes: []
  },
  {
    id: "2",
    name: "Lunch",
    recipes: []
  },
  {
    id: "3",
    name: "Dinner",
    recipes: []
  },
  {
    id: "4",
    name: "Desserts",
    recipes: []
  }
];

const mockRecipes: Recipe[] = [
  {
    id: "1",
    title: "Classic Margherita Pizza",
    description: "A traditional Italian pizza with fresh mozzarella, tomatoes, and basil.",
    ingredients: [
      { id: "1-1", name: "Pizza dough", amount: "1", unit: "ball" },
      { id: "1-2", name: "Fresh mozzarella", amount: "8", unit: "oz" },
      { id: "1-3", name: "San Marzano tomatoes", amount: "1", unit: "can" },
      { id: "1-4", name: "Fresh basil leaves", amount: "10", unit: "" },
      { id: "1-5", name: "Olive oil", amount: "2", unit: "tbsp" },
      { id: "1-6", name: "Salt", amount: "1", unit: "tsp" }
    ],
    instructions: [
      { id: "1-1", instruction: "Preheat your oven to 500°F (260°C) with a pizza stone inside for at least 30 minutes." },
      { id: "1-2", instruction: "Stretch your pizza dough into a 12-inch circle on a floured pizza peel." },
      { id: "1-3", instruction: "Spread crushed tomatoes over the dough, leaving a small border for the crust." },
      { id: "1-4", instruction: "Tear fresh mozzarella into pieces and distribute evenly over the sauce." },
      { id: "1-5", instruction: "Drizzle with olive oil and sprinkle with salt." },
      { id: "1-6", instruction: "Slide the pizza onto the preheated stone and bake for 8-10 minutes until the crust is golden." },
      { id: "1-7", instruction: "Remove from oven, scatter fresh basil leaves on top, slice, and serve immediately." }
    ],
    prepTime: 20,
    cookTime: 10,
    servings: 2,
    category: "Dinner",
    imageUrl: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=1974&auto=format&fit=crop",
    isFavorite: true,
    createdAt: "2023-01-15T12:00:00Z",
    updatedAt: "2023-01-15T12:00:00Z"
  },
  {
    id: "2",
    title: "Avocado Toast with Poached Egg",
    description: "A nutritious breakfast with creamy avocado and perfectly poached egg on artisan bread.",
    ingredients: [
      { id: "2-1", name: "Sourdough bread", amount: "2", unit: "slices" },
      { id: "2-2", name: "Ripe avocado", amount: "1", unit: "medium" },
      { id: "2-3", name: "Eggs", amount: "2", unit: "large" },
      { id: "2-4", name: "Lemon juice", amount: "1", unit: "tsp" },
      { id: "2-5", name: "Red pepper flakes", amount: "1/4", unit: "tsp" },
      { id: "2-6", name: "Salt and pepper", amount: "", unit: "to taste" }
    ],
    instructions: [
      { id: "2-1", instruction: "Toast the sourdough bread slices until golden and crisp." },
      { id: "2-2", instruction: "In a small bowl, mash the avocado with lemon juice, salt, and pepper." },
      { id: "2-3", instruction: "Bring a pot of water to a gentle simmer. Add a splash of vinegar." },
      { id: "2-4", instruction: "Crack each egg into a small cup, then gently slide into the simmering water." },
      { id: "2-5", instruction: "Poach eggs for 3-4 minutes until whites are set but yolks are still runny." },
      { id: "2-6", instruction: "Spread mashed avocado on toast slices." },
      { id: "2-7", instruction: "Remove poached eggs with a slotted spoon, drain, and place on top of avocado toast." },
      { id: "2-8", instruction: "Sprinkle with red pepper flakes, additional salt, and pepper. Serve immediately." }
    ],
    prepTime: 10,
    cookTime: 5,
    servings: 2,
    category: "Breakfast",
    imageUrl: "https://images.unsplash.com/photo-1603046891726-36bfd957e0bf?q=80&w=1974&auto=format&fit=crop",
    isFavorite: false,
    createdAt: "2023-02-10T09:30:00Z",
    updatedAt: "2023-02-10T09:30:00Z"
  },
  {
    id: "3",
    title: "Berry Smoothie Bowl",
    description: "A refreshing smoothie bowl packed with mixed berries and topped with granola and fresh fruit.",
    ingredients: [
      { id: "3-1", name: "Mixed frozen berries", amount: "2", unit: "cups" },
      { id: "3-2", name: "Banana", amount: "1", unit: "ripe" },
      { id: "3-3", name: "Greek yogurt", amount: "1/2", unit: "cup" },
      { id: "3-4", name: "Almond milk", amount: "1/4", unit: "cup" },
      { id: "3-5", name: "Honey", amount: "1", unit: "tbsp" },
      { id: "3-6", name: "Granola", amount: "1/4", unit: "cup" },
      { id: "3-7", name: "Fresh berries", amount: "1/4", unit: "cup" },
      { id: "3-8", name: "Chia seeds", amount: "1", unit: "tsp" }
    ],
    instructions: [
      { id: "3-1", instruction: "In a blender, combine frozen berries, banana, Greek yogurt, almond milk, and honey." },
      { id: "3-2", instruction: "Blend until smooth, adding more almond milk if needed to reach desired consistency." },
      { id: "3-3", instruction: "Pour smoothie mixture into a bowl." },
      { id: "3-4", instruction: "Top with granola, fresh berries, and chia seeds." },
      { id: "3-5", instruction: "Serve immediately and enjoy with a spoon!" }
    ],
    prepTime: 10,
    cookTime: 0,
    servings: 1,
    category: "Breakfast",
    imageUrl: "https://images.unsplash.com/photo-1627308595171-d1b5d67129c4?q=80&w=1935&auto=format&fit=crop",
    isFavorite: true,
    createdAt: "2023-03-05T08:15:00Z",
    updatedAt: "2023-03-05T08:15:00Z"
  },
  {
    id: "4",
    title: "Chocolate Chip Cookies",
    description: "Classic homemade chocolate chip cookies with a soft center and crispy edges.",
    ingredients: [
      { id: "4-1", name: "All-purpose flour", amount: "2 1/4", unit: "cups" },
      { id: "4-2", name: "Baking soda", amount: "1", unit: "tsp" },
      { id: "4-3", name: "Salt", amount: "1", unit: "tsp" },
      { id: "4-4", name: "Unsalted butter", amount: "1", unit: "cup" },
      { id: "4-5", name: "Brown sugar", amount: "3/4", unit: "cup" },
      { id: "4-6", name: "Granulated sugar", amount: "3/4", unit: "cup" },
      { id: "4-7", name: "Vanilla extract", amount: "1", unit: "tsp" },
      { id: "4-8", name: "Eggs", amount: "2", unit: "large" },
      { id: "4-9", name: "Chocolate chips", amount: "2", unit: "cups" }
    ],
    instructions: [
      { id: "4-1", instruction: "Preheat oven to 375°F (190°C). Line baking sheets with parchment paper." },
      { id: "4-2", instruction: "In a small bowl, whisk together flour, baking soda, and salt." },
      { id: "4-3", instruction: "In a large bowl, beat butter, brown sugar, granulated sugar, and vanilla extract until creamy." },
      { id: "4-4", instruction: "Add eggs one at a time, beating well after each addition." },
      { id: "4-5", instruction: "Gradually beat in flour mixture." },
      { id: "4-6", instruction: "Stir in chocolate chips." },
      { id: "4-7", instruction: "Drop rounded tablespoons of dough onto prepared baking sheets." },
      { id: "4-8", instruction: "Bake for 9-11 minutes or until golden brown." },
      { id: "4-9", instruction: "Cool on baking sheets for 2 minutes, then transfer to wire racks to cool completely." }
    ],
    prepTime: 15,
    cookTime: 10,
    servings: 36,
    category: "Desserts",
    imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=1964&auto=format&fit=crop",
    isFavorite: false,
    createdAt: "2023-04-20T14:20:00Z",
    updatedAt: "2023-04-20T14:20:00Z"
  },
  {
    id: "5",
    title: "Veggie Stir Fry",
    description: "A quick and colorful vegetable stir fry with a savory sauce.",
    ingredients: [
      { id: "5-1", name: "Broccoli florets", amount: "2", unit: "cups" },
      { id: "5-2", name: "Bell peppers", amount: "2", unit: "mixed colors, sliced" },
      { id: "5-3", name: "Carrots", amount: "2", unit: "julienned" },
      { id: "5-4", name: "Snow peas", amount: "1", unit: "cup" },
      { id: "5-5", name: "Garlic", amount: "3", unit: "cloves, minced" },
      { id: "5-6", name: "Ginger", amount: "1", unit: "tbsp, grated" },
      { id: "5-7", name: "Soy sauce", amount: "3", unit: "tbsp" },
      { id: "5-8", name: "Sesame oil", amount: "1", unit: "tbsp" },
      { id: "5-9", name: "Vegetable oil", amount: "2", unit: "tbsp" },
      { id: "5-10", name: "Cornstarch", amount: "1", unit: "tsp" },
      { id: "5-11", name: "Water", amount: "1/4", unit: "cup" },
      { id: "5-12", name: "Sesame seeds", amount: "1", unit: "tbsp" }
    ],
    instructions: [
      { id: "5-1", instruction: "In a small bowl, mix soy sauce, sesame oil, cornstarch, and water. Set aside." },
      { id: "5-2", instruction: "Heat vegetable oil in a large wok or skillet over high heat." },
      { id: "5-3", instruction: "Add garlic and ginger, stir-fry for 30 seconds until fragrant." },
      { id: "5-4", instruction: "Add carrots and stir-fry for 2 minutes." },
      { id: "5-5", instruction: "Add broccoli and bell peppers, stir-fry for 3 minutes." },
      { id: "5-6", instruction: "Add snow peas and stir-fry for 1 minute." },
      { id: "5-7", instruction: "Pour in the sauce mixture and stir well to coat all vegetables." },
      { id: "5-8", instruction: "Cook for another 1-2 minutes until sauce thickens." },
      { id: "5-9", instruction: "Sprinkle with sesame seeds and serve over rice or noodles." }
    ],
    prepTime: 15,
    cookTime: 10,
    servings: 4,
    category: "Dinner",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1770&auto=format&fit=crop",
    isFavorite: true,
    createdAt: "2023-05-12T18:45:00Z",
    updatedAt: "2023-05-12T18:45:00Z"
  }
];

// Initialize mock categories with recipes
mockRecipes.forEach(recipe => {
  const category = mockCategories.find(cat => cat.name === recipe.category);
  if (category) {
    category.recipes.push(recipe);
  }
});

// API service functions
export const fetchAllRecipes = async (): Promise<Recipe[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockRecipes;
};

export const fetchRecipeById = async (id: string): Promise<Recipe | null> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockRecipes.find(recipe => recipe.id === id) || null;
};

export const fetchRandomRecipe = async (): Promise<Recipe> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const randomIndex = Math.floor(Math.random() * mockRecipes.length);
  return mockRecipes[randomIndex];
};

export const createRecipe = async (recipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>): Promise<Recipe> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newRecipe: Recipe = {
    ...recipe,
    id: (mockRecipes.length + 1).toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  mockRecipes.push(newRecipe);
  
  // Add to appropriate category
  const category = mockCategories.find(cat => cat.name === newRecipe.category);
  if (category) {
    category.recipes.push(newRecipe);
  }
  
  return newRecipe;
};

export const updateRecipe = async (id: string, recipeData: Partial<Recipe>): Promise<Recipe | null> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const recipeIndex = mockRecipes.findIndex(recipe => recipe.id === id);
  if (recipeIndex === -1) return null;
  
  const updatedRecipe = {
    ...mockRecipes[recipeIndex],
    ...recipeData,
    updatedAt: new Date().toISOString(),
  };
  
  mockRecipes[recipeIndex] = updatedRecipe;
  
  // Update in category
  if (recipeData.category && recipeData.category !== mockRecipes[recipeIndex].category) {
    // Remove from old category
    const oldCategory = mockCategories.find(cat => cat.name === mockRecipes[recipeIndex].category);
    if (oldCategory) {
      oldCategory.recipes = oldCategory.recipes.filter(r => r.id !== id);
    }
    
    // Add to new category
    const newCategory = mockCategories.find(cat => cat.name === recipeData.category);
    if (newCategory) {
      newCategory.recipes.push(updatedRecipe);
    }
  }
  
  return updatedRecipe;
};

export const fetchCategories = async (): Promise<RecipeCategory[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockCategories;
};

export const updateCategoryOrder = async (updatedCategories: RecipeCategory[]): Promise<RecipeCategory[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  // In a real app, we would call the API to update the order
  return updatedCategories;
};

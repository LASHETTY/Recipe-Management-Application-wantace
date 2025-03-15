
export interface Ingredient {
  id: string;
  name: string;
  amount: string;
  unit: string;
}

export interface RecipeStep {
  id: string;
  instruction: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: RecipeStep[];
  prepTime: number;
  cookTime: number;
  servings: number;
  category: string;
  imageUrl?: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RecipeCategory {
  id: string;
  name: string;
  recipes: Recipe[];
}

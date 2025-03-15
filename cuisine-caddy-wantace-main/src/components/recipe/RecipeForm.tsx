
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Ingredient, RecipeStep, Recipe } from "@/types/recipe";
import { Plus, Minus, Save } from "lucide-react";

interface RecipeFormProps {
  initialData?: Partial<Recipe>;
  onSubmit: (recipeData: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  isEditing?: boolean;
}

const RecipeForm: React.FC<RecipeFormProps> = ({
  initialData = {},
  onSubmit,
  isEditing = false,
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<Partial<Recipe>>({
    title: "",
    description: "",
    ingredients: [{ id: `ing-${Date.now()}`, name: "", amount: "", unit: "" }],
    instructions: [{ id: `step-${Date.now()}`, instruction: "" }],
    prepTime: 0,
    cookTime: 0,
    servings: 0,
    category: "",
    imageUrl: "",
    isFavorite: false,
    ...initialData,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title?.trim()) {
      newErrors.title = "Recipe title is required";
    }
    
    if (!formData.description?.trim()) {
      newErrors.description = "Recipe description is required";
    }
    
    if (!formData.category?.trim()) {
      newErrors.category = "Recipe category is required";
    }
    
    if (!formData.prepTime || formData.prepTime < 0) {
      newErrors.prepTime = "Valid prep time is required";
    }
    
    if (!formData.cookTime || formData.cookTime < 0) {
      newErrors.cookTime = "Valid cook time is required";
    }
    
    if (!formData.servings || formData.servings < 1) {
      newErrors.servings = "Valid number of servings is required";
    }
    
    // Check if ingredients are valid
    const hasEmptyIngredient = formData.ingredients?.some(ing => !ing.name.trim());
    if (hasEmptyIngredient) {
      newErrors.ingredients = "All ingredients must have a name";
    }
    
    // Check if instructions are valid
    const hasEmptyInstruction = formData.instructions?.some(step => !step.instruction.trim());
    if (hasEmptyInstruction) {
      newErrors.instructions = "All instructions must have content";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numberValue = parseInt(value, 10);
    if (!isNaN(numberValue)) {
      setFormData(prev => ({ ...prev, [name]: numberValue }));
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: "" }));
      }
    }
  };
  
  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
    if (errors.category) {
      setErrors(prev => ({ ...prev, category: "" }));
    }
  };
  
  const handleIngredientChange = (index: number, field: keyof Ingredient, value: string) => {
    if (!formData.ingredients) return;
    
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index] = { ...updatedIngredients[index], [field]: value };
    
    setFormData(prev => ({ ...prev, ingredients: updatedIngredients }));
    if (errors.ingredients) {
      setErrors(prev => ({ ...prev, ingredients: "" }));
    }
  };
  
  const handleInstructionChange = (index: number, value: string) => {
    if (!formData.instructions) return;
    
    const updatedInstructions = [...formData.instructions];
    updatedInstructions[index] = { ...updatedInstructions[index], instruction: value };
    
    setFormData(prev => ({ ...prev, instructions: updatedInstructions }));
    if (errors.instructions) {
      setErrors(prev => ({ ...prev, instructions: "" }));
    }
  };
  
  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...(prev.ingredients || []), { id: `ing-${Date.now()}`, name: "", amount: "", unit: "" }]
    }));
  };
  
  const removeIngredient = (index: number) => {
    if (!formData.ingredients || formData.ingredients.length <= 1) return;
    
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients.splice(index, 1);
    
    setFormData(prev => ({ ...prev, ingredients: updatedIngredients }));
  };
  
  const addInstruction = () => {
    setFormData(prev => ({
      ...prev,
      instructions: [...(prev.instructions || []), { id: `step-${Date.now()}`, instruction: "" }]
    }));
  };
  
  const removeInstruction = (index: number) => {
    if (!formData.instructions || formData.instructions.length <= 1) return;
    
    const updatedInstructions = [...formData.instructions];
    updatedInstructions.splice(index, 1);
    
    setFormData(prev => ({ ...prev, instructions: updatedInstructions }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Form validation error",
        description: "Please fix the errors in the form.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Cast formData to the expected type, ensuring all required fields are present
      const recipeData = formData as Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>;
      await onSubmit(recipeData);
      
      toast({
        title: `Recipe ${isEditing ? "updated" : "created"} successfully!`,
        variant: "default"
      });
      
      navigate("/");
    } catch (error) {
      console.error("Error submitting recipe:", error);
      toast({
        title: "Error saving recipe",
        description: "There was a problem saving your recipe. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Recipe Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title || ""}
                onChange={handleChange}
                placeholder="Enter recipe title"
                className={errors.title ? "border-destructive" : ""}
              />
              {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                placeholder="Briefly describe your recipe"
                className={errors.description ? "border-destructive" : ""}
                rows={3}
              />
              {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl || ""}
                onChange={handleChange}
                placeholder="Enter image URL (optional)"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="prepTime">Prep Time (minutes)</Label>
                <Input
                  id="prepTime"
                  name="prepTime"
                  type="number"
                  min="0"
                  value={formData.prepTime || ""}
                  onChange={handleNumberChange}
                  placeholder="Prep time in minutes"
                  className={errors.prepTime ? "border-destructive" : ""}
                />
                {errors.prepTime && <p className="text-sm text-destructive">{errors.prepTime}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cookTime">Cook Time (minutes)</Label>
                <Input
                  id="cookTime"
                  name="cookTime"
                  type="number"
                  min="0"
                  value={formData.cookTime || ""}
                  onChange={handleNumberChange}
                  placeholder="Cook time in minutes"
                  className={errors.cookTime ? "border-destructive" : ""}
                />
                {errors.cookTime && <p className="text-sm text-destructive">{errors.cookTime}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="servings">Servings</Label>
                <Input
                  id="servings"
                  name="servings"
                  type="number"
                  min="1"
                  value={formData.servings || ""}
                  onChange={handleNumberChange}
                  placeholder="Number of servings"
                  className={errors.servings ? "border-destructive" : ""}
                />
                {errors.servings && <p className="text-sm text-destructive">{errors.servings}</p>}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category || ""}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className={errors.category ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Breakfast">Breakfast</SelectItem>
                  <SelectItem value="Lunch">Lunch</SelectItem>
                  <SelectItem value="Dinner">Dinner</SelectItem>
                  <SelectItem value="Desserts">Desserts</SelectItem>
                  <SelectItem value="Snacks">Snacks</SelectItem>
                  <SelectItem value="Beverages">Beverages</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Ingredients</h3>
              <Button type="button" variant="outline" size="sm" onClick={addIngredient}>
                <Plus className="h-4 w-4 mr-2" />
                Add Ingredient
              </Button>
            </div>
            
            {errors.ingredients && <p className="text-sm text-destructive">{errors.ingredients}</p>}
            
            <div className="space-y-3">
              {formData.ingredients?.map((ingredient, index) => (
                <div key={ingredient.id} className="flex items-end gap-2">
                  <div className="flex-1">
                    <Label htmlFor={`ingredient-${index}`}>Name</Label>
                    <Input
                      id={`ingredient-${index}`}
                      value={ingredient.name}
                      onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
                      placeholder="Ingredient name"
                    />
                  </div>
                  <div className="w-20">
                    <Label htmlFor={`amount-${index}`}>Amount</Label>
                    <Input
                      id={`amount-${index}`}
                      value={ingredient.amount}
                      onChange={(e) => handleIngredientChange(index, "amount", e.target.value)}
                      placeholder="Amount"
                    />
                  </div>
                  <div className="w-24">
                    <Label htmlFor={`unit-${index}`}>Unit</Label>
                    <Input
                      id={`unit-${index}`}
                      value={ingredient.unit}
                      onChange={(e) => handleIngredientChange(index, "unit", e.target.value)}
                      placeholder="Unit"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeIngredient(index)}
                    disabled={formData.ingredients?.length === 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Instructions</h3>
              <Button type="button" variant="outline" size="sm" onClick={addInstruction}>
                <Plus className="h-4 w-4 mr-2" />
                Add Step
              </Button>
            </div>
            
            {errors.instructions && <p className="text-sm text-destructive">{errors.instructions}</p>}
            
            <div className="space-y-3">
              {formData.instructions?.map((step, index) => (
                <div key={step.id} className="flex gap-2">
                  <div className="flex-1">
                    <Label htmlFor={`instruction-${index}`}>Step {index + 1}</Label>
                    <Textarea
                      id={`instruction-${index}`}
                      value={step.instruction}
                      onChange={(e) => handleInstructionChange(index, e.target.value)}
                      placeholder={`Step ${index + 1} instruction`}
                      rows={2}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="self-end mb-1"
                    onClick={() => removeInstruction(index)}
                    disabled={formData.instructions?.length === 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => navigate("/")}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} className="gap-2">
          <Save className="h-4 w-4" />
          {isSubmitting ? "Saving..." : "Save Recipe"}
        </Button>
      </div>
    </form>
  );
};

export default RecipeForm;

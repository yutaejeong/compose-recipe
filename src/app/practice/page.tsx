"use client";

import { CATEGORIES, Category, Recipe, RECIPES } from "@/constants/recipe";
import { Edit, EditOff, Shuffle, Visibility, VisibilityOff } from "@mui/icons-material";
import { Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import Unit from "./unit";

function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default function PracticePage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("커피");
  const [recipes, setRecipes] = useState<Recipe[]>(() => RECIPES.filter((recipe) => recipe.category === selectedCategory));
  const [showRecipe, setShowRecipe] = useState<boolean>(false);
  const [showTesting, setShowTesting] = useState<boolean>(false);

  function handleCategoryChange(e: SelectChangeEvent<Category>) {
    const newSelectedCategory = e.target.value as Category;
    setSelectedCategory(newSelectedCategory);
    setRecipes(() => RECIPES.filter((recipe) => recipe.category === newSelectedCategory));
  }

  function toggleTesting() {
    setShowTesting((prev) => !prev);
  }

  function shuffleOrders() {
    setRecipes(shuffleArray(recipes));
  }

  function toggleExpandRecipes() {
    setShowRecipe((prev) => !prev);
  }

  return (
    <div className="flex flex-col items-center justify-items-center min-h-dvh p-8 pb-20 gap-6 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="w-full flex gap-2">
        <FormControl fullWidth>
          <InputLabel id="category-select-label">카테고리</InputLabel>
          <Select labelId="category-select-label" id="demo-simple-select" value={selectedCategory} label="카테고리" onChange={handleCategoryChange}>
            {CATEGORIES.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={toggleTesting}>
          {showTesting ? <EditOff /> : <Edit />}
        </Button>
        <Button variant="contained" onClick={shuffleOrders}>
          <Shuffle />
        </Button>
        <Button variant="contained" onClick={toggleExpandRecipes}>
          {showRecipe ? <VisibilityOff /> : <Visibility />}
        </Button>
      </div>
      <div className="w-full">
        {recipes.map((recipe) => (
          <Unit key={recipe.name} name={recipe.name} recipe={recipe.recipe} testMode={showTesting} expaned={showRecipe} />
        ))}
      </div>
    </div>
  );
}

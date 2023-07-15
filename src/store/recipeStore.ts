import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type RecipeType = {
  id: number;
  name: string;
  first_brewed: string;
  description: string;
  image_url: string;
  abv: number;
  ibu: number;
  target_fg: number;
  target_og: number;
  ebc: number;
  srm: number;
  ph: number;
  tagline: string;
};

type RecipeStoreType = {
  recipes: RecipeType[];
  recipe: RecipeType | null;
  currentPage: number;
  selectedRecipes: number[];
  loading: boolean;
  error: string | null;
  hasLoadedRecipes: boolean;

  fetchRecipes: (page: number) => Promise<void>;
  loadRecipes: () => Promise<void>;
  selectRecipe: (recipeId: number) => void;
  removeSelectedRecipes: () => void;
  getRecipe: (recipeId: string) => RecipeType | null;
};

export const useRecipeStore = create<RecipeStoreType>()(
  devtools((set, get) => ({
    recipes: [],
    recipe: null,
    currentPage: 1,
    selectedRecipes: [],
    loading: false,
    error: null,
    hasLoadedRecipes: false,

    fetchRecipes: async (page) => {
      set({ loading: true });
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}beers?page=${page}`);
        const data = await res.json();
        set((state) => ({ recipes: [...state.recipes, ...data] }));
      } catch (error) {
        console.log(error);
      } finally {
        set({ loading: false });
      }
    },

    loadRecipes: async () => {
      const { currentPage, hasLoadedRecipes } = get();
      if (hasLoadedRecipes) return;

      await get().fetchRecipes(currentPage);
      set({ hasLoadedRecipes: true });
    },

    selectRecipe: (recipeId) => {
      set((state) => {
        const isSelected = state.selectedRecipes.includes(recipeId);
        const selectedRecipes = isSelected
          ? state.selectedRecipes.filter((id) => id !== recipeId)
          : [...state.selectedRecipes, recipeId];

        return { selectedRecipes };
      });
    },

    removeSelectedRecipes: () => {
      set((state) => {
        const recipes = state.recipes.filter(
          (recipe) => !state.selectedRecipes.includes(recipe.id),
        );
        const selectedRecipes: number[] = [];

        if (recipes.length === 0) {
          const currentPage = state.currentPage + 1;
          get().fetchRecipes(currentPage);
          return { recipes, currentPage, selectedRecipes };
        }

        return { recipes, selectedRecipes };
      });
    },

    getRecipe: (recipeId) => {
      const { recipes } = get();
      const foundRecipe = recipes.find((recipe) => recipe.id === +recipeId);

      set({ recipe: foundRecipe });

      return get().recipe;
    },
  })),
);

export type { RecipeType };

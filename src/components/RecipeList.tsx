import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { RecipeItem } from './RecipeItem';
import { useRecipeStore } from '../store/recipeStore';

export const RecipeList: React.FC = () => {
  const { recipes, loadRecipes, selectRecipe, removeSelectedRecipes, selectedRecipes } =
    useRecipeStore();

  const list = useRef<HTMLUListElement>(null);

  const navigate = useNavigate();

  const handleRecipeClick = (recipeId: number) => {
    const recipeUrl = `/recipe/${recipeId}`;
    navigate(recipeUrl);
  };

  const handleRightClick = (recipeId: number, event: React.MouseEvent) => {
    event.preventDefault();
    selectRecipe(recipeId);
  };

  const handleRemoveClick = () => {
    removeSelectedRecipes();
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  const visibleRecipes = recipes.slice(0, 15);

  return (
    <section className="page__recipe-list">
      <div className="recipe-list__container">
        <h1 className="recipe-list__title">Recipe List</h1>
        <ul className="recipe-list__items" ref={list}>
          {visibleRecipes.map((recipe) => (
            <li
              key={recipe.id}
              onClick={() => handleRecipeClick(recipe.id)}
              onContextMenu={(event) => handleRightClick(recipe.id, event)}
              className={`recipe-list__item item-recipe ${
                selectedRecipes.includes(recipe.id) ? ' selected' : ''
              }`}
            >
              <RecipeItem recipe={recipe} />
            </li>
          ))}
        </ul>
        <button
          className={`recipe-list__button button ${selectedRecipes.length > 0 ? '' : '_desibled'}`}
          onClick={handleRemoveClick}
        >
          Remove
        </button>
      </div>
    </section>
  );
};

import React from 'react';
import { RecipeType } from '../store/recipeStore';

interface RecipeItemProps {
  recipe: RecipeType;
}

export const RecipeItem: React.FC<RecipeItemProps> = ({ recipe }) => {
  return (
    <article className="item-recipe__body">
      <div className="item-recipe__content content-recipe">
        <h2 className="content-recipe__title">{recipe.name}</h2>
        <div className="content-recipe__date">{recipe.first_brewed} </div>
        <div className="content-recipe__text">
          <p>{recipe.description}</p>
        </div>
      </div>
      <img className="item-recipe__image" src={recipe.image_url} alt={recipe.name} />
    </article>
  );
};

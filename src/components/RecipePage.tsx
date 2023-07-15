import React, { useEffect, useState } from 'react';
import { RecipeType, useRecipeStore } from '../store/recipeStore';
import { useParams, Link } from 'react-router-dom';

export const RecipePage: React.FC = () => {
  const params = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<RecipeType | null>(null);

  const { getRecipe } = useRecipeStore((store) => ({
    getRecipe: store.getRecipe,
  }));

  useEffect(() => {
    const selectedRecipe = getRecipe(params.id || '');
    setRecipe(selectedRecipe);
  }, [getRecipe, params.id, recipe]);

  return (
    <div className="page__recipe recipe">
      <div className="recipe__container">
        <Link to={'/'} className="recipe__button button">
          Back
        </Link>
        {!recipe ? (
          <div className="recipe__Loading">Loading...</div>
        ) : (
          <article className="recipe__body">
            <div className="recipe__header header-recipe">
              <h1 className="header-recipe__title">{recipe.name}</h1>
              <h2 className="header-recipe__tagline">{recipe.tagline}</h2>
              <h3 className="header-recipe__date">{recipe.first_brewed}</h3>
              <div className="header-recipe__description">
                <p>{recipe.description}</p>
              </div>
            </div>
            <div className="recipe__content">
              <ul className="recipe__list">
                <li>
                  <span>abv: </span>
                  {recipe.abv}
                </li>
                <li>
                  <span>ibu: </span>
                  {recipe.ibu}
                </li>
                <li>
                  <span>target_fg: </span>
                  {recipe.target_fg}
                </li>
                <li>
                  <span>target_og: </span>
                  {recipe.target_og}
                </li>
                <li>
                  <span>ebc: </span>
                  {recipe.ebc}
                </li>
                <li>
                  <span>srm: </span>
                  {recipe.srm}
                </li>
                <li>
                  <span>ph: </span>
                  {recipe.ph}
                </li>
              </ul>
              <img className="recipe__image" src={recipe.image_url} alt={recipe.name} />
            </div>
          </article>
        )}
      </div>
    </div>
  );
};

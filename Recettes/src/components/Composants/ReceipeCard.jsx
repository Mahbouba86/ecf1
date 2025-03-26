import { Heart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton.jsx";

export function ReceipCard({ recipe }) {
  return (
      <article className="position-relative" key={recipe.id}>
          <img src={recipe.picture} alt={recipe.name} />
          
          {/* Utiliser le bouton favori ici */}
          <FavoriteButton recipeId={recipe.id} />
          
          <div>
              <h2>{recipe.name}</h2>
              <p>
                  {recipe.type} - {recipe.origin}
              </p>
              <p>⏳ {recipe.preparationTime} min</p>
              <Link to={`/recipe/${recipe.id}`}>
                  <button>Voir la recette</button>
              </Link>
          </div>
      </article>
  );
}

export default ReceipCard;
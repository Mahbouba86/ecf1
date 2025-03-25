import { Link } from "react-router-dom";

export function ReceipCard ({recipe}) {
    
    return (
        <article key={recipe.id}>
              <img src={recipe.picture} alt={recipe.name} />
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
    )
}
export default ReceipCard;
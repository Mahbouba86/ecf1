import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Heart } from 'lucide-react';
import './DetailRecette.css';

function DetailRecette() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchRecipe();
    checkIfFavorite();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const response = await fetch(`/api/recipes/${id}`);
      const data = await response.json();
      setRecipe(data); console.log(recipe);
    } catch (error) {
      console.error('Error fetching recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkIfFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(id));
  };

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = favorites.filter(favId => favId !== id);
    } else {
      newFavorites = [...favorites, id];
    }
    
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="not-found">
        Recette non trouvée
      </div>
    );
  }

  return (
    <div className="recipe-container">
      <div className="recipe-card">
        <div className="image-container">
          <img src={recipe.picture} alt={recipe.name} className="recipe-image" />
          <button onClick={toggleFavorite} className={`favorite-button ${isFavorite ? 'favorite' : ''}`}>
            <Heart className="heart-icon" fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
        
        <div className="recipe-details">
          <h1 className="recipe-title">{recipe.name}</h1>
          
          <div className="recipe-info">
            <span>Type: {recipe.type}</span>
            <span>Origine: {recipe.origin}</span>
            <span>Temps de préparation: {recipe.preparationTime} min</span>
          </div>

          <div className="ingredients-section">
            <h2>Ingrédients</h2>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="instructions-section">
            <h2>Instructions</h2>
            <div>
              {recipe.instructions.map((instruction, index) => (
                <p key={index}>{instruction}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailRecette;

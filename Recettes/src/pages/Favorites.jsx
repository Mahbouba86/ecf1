import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ReceipList } from '../components/Composants/ReceipeList';
import FavoriteButton from '../components/Composants/FavoriteButton'; // Importation du composant
import '../pages/Favorites.css';

export function Favorites() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]');
        const recipesData = await Promise.all(
          favoriteIds.map(id =>
            fetch(`http://localhost:3000/api/recipes/${id}`)
              .then(res => res.json())
              .then(data => (data?.id ? data : undefined)) // Retourne undefined si la recette n'est pas valide
          )
        );
        setRecipes(recipesData.filter(item => item !== undefined)); // Filtre les éléments undefined
      } catch {
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  if (loading) return <div className="loading-container"><div className="spinner"></div></div>;

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">Mes recettes favorites</h1>
      
      {recipes.length === 0 ? (
        <div className="empty-favorites">
          <p>Vous n'avez pas encore de recettes favorites.</p>
          <Link to="/" className="discover-link">Découvrir des recettes</Link>
        </div>
      ) : (
        <div className="favorites-recipes-container">
          <ReceipList recipes={recipes} FavoriteButtonComponent={FavoriteButton} />
        </div>
      )}
    </div>
  );
}

export default Favorites;
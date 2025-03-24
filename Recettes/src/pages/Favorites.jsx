import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]');
      const recipes = await Promise.all(
        favoriteIds.map(async (id) => {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
          const data = await response.json();
          return data.meals?.[0];
        })
      );
      setFavorites(recipes.filter(Boolean));
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Mes recettes favorites</h1>
      
      {favorites.length === 0 ? (
        <div className="text-center text-gray-600 py-8">
          <p>Vous n'avez pas encore de recettes favorites.</p>
          <Link to="/" className="text-orange-500 hover:text-orange-600 mt-2 inline-block">
            Découvrir des recettes
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((recipe) => (
            <Link
              key={recipe.idMeal}
              to={`/recipe/${recipe.idMeal}`}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-w-16 aspect-h-9 relative">
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="object-cover w-full h-48"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-orange-500 transition-colors duration-300">
                  {recipe.strMeal}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Cuisine: {recipe.strArea}
                </p>
                <p className="text-sm text-gray-600">
                  Catégorie: {recipe.strCategory}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
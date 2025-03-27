import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../components/Header.css";

export function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function ViderChampRecherche() {
    if (searchTerm.length > 0) {
      setRecipes([]);
      setSearchTerm("");
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim()) {
        handleSearch();
      } else {
        setRecipes([]); // Effacer les suggestions lorsque le champ est vidé
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSearch = async () => {
    if (searchTerm.length >= 2) {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `http://localhost:3000/api/recipes/search/${searchTerm}`
        );
        const data = await response.json();
        setRecipes(data);
      } catch (err) {
        console.log(err);
        setError("Erreur lors de la récupération des recettes.");
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    } else {
      setRecipes([]);
    }
  };

  return (
    <header>
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <span>Recettes ECF</span>
        </Link>

        {/* Barre de recherche */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Rechercher une recette..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Résultats de la recherche */}
        {loading && <p>Chargement...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {recipes.length > 0 && (
          <div className="search-results">
            <ul>
              {recipes.map((recipe) => (
                <li key={recipe.id}>
                  <Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Navigation */}
        <nav>
          <ul>
            <li>
              <Link to="/">Liste Recette</Link>
            </li>
            <li>
              <Link to="/favorites">Favoris</Link>
            </li>
            <li>
              <Link to="/ajoutRecette">Ajout Recette</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

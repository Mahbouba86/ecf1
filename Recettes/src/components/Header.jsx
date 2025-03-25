import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../components/Header.css";

export function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // fonction vider le champs de recherche en on clic
function ViderChampRecherche () {
  if (searchTerm.length>0 )
     {
      setRecipes([]);
      setSearchTerm("");
  }
}
  // Déclenche la recherche avec un délai
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim()) {
        handleSearch();
      }
    }, 300); // Attente de 300ms après la dernière touche avant de lancer la recherche

    return () => clearTimeout(timer); // Effacer le timer précédent si l'utilisateur tape encore
  }, [searchTerm]);

  const handleSearch = async () => {
if (searchTerm.length >=2)
     {
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
    }else{
      setRecipes([]);
    }
  };

  return (
    <header>
      <div>
        {/* Logo du site */}
        <Link to="/">
          <span>Cuisine</span>
        </Link>

        {/* Barre de recherche */}
        <div>
          <span>🔍</span>
          <input
            type="text"
            placeholder="Rechercher une recette..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

        </div>

        {/* Affichage des résultats de recherche */}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {recipes.length > 0 ? (
          <ul>
            {recipes.map((recipe, index) => (
              <li key={index}>
                <Link to={`/recipe/${recipe.id}`}onClick={() => ViderChampRecherche()}>{recipe.name}</Link>
              </li>
            ))}
          </ul>
        ) : (
          searchTerm && !loading && <p>Aucune recette trouvée.</p>
        )}

        {/* Navigation sous forme de liste */}
        <nav>
          <ul>
            <li>
              <Link to="/recettes">Liste Recette</Link>
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

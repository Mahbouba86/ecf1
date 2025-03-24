import { Link } from "react-router-dom";
import { useState } from "react";
import "../components/Header.css";

export function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const handleSearch = async () => {
  //   if (!searchTerm.trim()) return;

  //   try {
  //     setLoading(true);
  //     setError(null);

  //     const response = await fetch(
  //       `http://localhost:3000/api/recipes/search/${searchTerm}`
  //     );
  //     const data = await response.json();
  //     setRecipes(data);
  //   } catch (err) {
  //     console.log(err);
  //     setError("Erreur lors de la récupération des recettes.");
  //     setRecipes([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <header>
      <div>
        {/* Logo du site */}
        <Link to="/">
          <span>CuisineConnect</span>
        </Link>

        {/* Barre de recherche */}
        {/* <div>
          <span>🔍</span>
          <input
            type="text"
            placeholder="Rechercher une recette..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? "Recherche..." : "Rechercher"}
          </button>
        </div> */}

        {/* Affichage des résultats de recherche */}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {recipes.length > 0 ? (
          <ul>
            {recipes.map((recipe, index) => (
              <li key={index}>{recipe.name}</li>
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
// export default Header;

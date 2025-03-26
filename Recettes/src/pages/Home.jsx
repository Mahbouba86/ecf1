import { useState, useEffect } from "react";
import { Banner } from "../components/Banner";
import "../pages/Home.css";
import { ReceipList } from "../components/Composants/ReceipeList";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const SearchCategorie = async (categorie) => {
    try {
      const response = await fetch(`http://localhost:3000/api/categories/${categorie}`);
      if (!response.ok) {
        throw new Error("Erreur lors du chargement des recettes");
      }
      const data = await response.json();
      setRecipes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/categories");
      if (!response.ok) {
        throw new Error("Erreur lors du chargement des categories de recettes");
      }
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipes = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/recipes");
      if (!response.ok) {
        throw new Error("Erreur lors du chargement des recettes");
      }
      const data = await response.json();
      setRecipes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchRecipes();
  }, []);

  if (loading) return <p>Chargement des recettes...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <>
      <div className="full-width-banner">
        <Banner />
      </div>
      <section>
        <h1>Nos Recettes</h1>
        <div className="categories-section">
          <button onClick={() => fetchRecipes()}>Tous</button>
          {categories.map((c, index) => (
            <button key={index} onClick={() => SearchCategorie(c)}>
              {c}
            </button>
          ))}
        </div>
        <div className="recipes-container">
          <ReceipList recipes={recipes} />
        </div>
      </section>
    </>
  );
}

export default Home;

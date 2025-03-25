import { useState, useEffect } from "react";
import { Banner } from "../components/Banner";
import DetailRecette  from "../pages/DetailRecette";
import "../pages/Home.css";
import {ReceipCard} from "../components/Receipe/ReceipeCard";
import { ReceipList } from "../components/Receipe/ReceipeList";

function Home() {
  const [searchTerm, setSearchTerm] = useState(""); // ✅ Ajout du state pour la recherche
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchRecipes();
  }, []);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

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
  };

  if (loading) return <p>Chargement des recettes...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <>
      <Banner />
      <section>
        <h1>Recettes</h1>
       <ReceipList recipes={recipes}/>
      </section>
    </>
  );
}

export default Home;

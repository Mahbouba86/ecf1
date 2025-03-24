import React, { useState } from 'react';
import '../pages/AjoutRecette.css';

export function AjoutRecette() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    preparationTime: '',
    servings: '',
    category: 'main',
    cuisine: '',
    ingredients: [''],
    instructions: [''],
    imageUrl: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Erreur lors de l\'ajout');

      setMessage('Recette ajoutée avec succès !');
    } catch (error) {
      setMessage('Erreur : ' + error.message);
    }
  };

  const handleAddIngredient = () => {
    setFormData({ ...formData, ingredients: [...formData.ingredients, ''] });
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData({ ...formData, ingredients: newIngredients });
  };

  return (
    <div className="container">
      <h1 className="title">Ajouter une recette</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>Titre :</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <label>Description :</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label>Ingrédients :</label>
        {formData.ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            value={ingredient}
            onChange={(e) => handleIngredientChange(index, e.target.value)}
          />
        ))}
        <button type="button" onClick={handleAddIngredient}>
          Ajouter un ingrédient
        </button>

        <button type="submit">Ajouter</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

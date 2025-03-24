import React, { useState } from 'react';
import '../pages/AjoutRecette.css';

//test commit

export function AjoutRecette() {
  const [formData, setFormData] = useState({
    name: '',
    picture: '',
    description: '',
    preparationTime: 0,
    servings: '',
    type: 'main',
    origin: '',
    cuisine: '',
    ingredients: [''],
    instructions: [''],
    imageUrl: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleNumberChange = (e) => {
    setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    console.log("Données envoyées :", JSON.stringify(formData));
    try {
      const response = await fetch('http://localhost:3000/api/recipes', {
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

  const handleAddInstruction = () => {
    setFormData({ ...formData, instructions: [...formData.instructions, ''] });
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...formData.instructions];
    newInstructions[index] = value;
    setFormData({ ...formData, instructions: newInstructions });
  };

  return (
    <div className="container">
      <h1 className="title">Ajouter une recette</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>Titre :</label>
        <input
          type="text"
          name="name"
          value={formData.title}
          onChange={handleChange}
        />

        <label>Photo :</label>
        <input
          type="text"
          name="picture"
          value={formData.picture}
          onChange={handleChange}
        />

        <label>Description :</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label>Preparation Time :</label>
        <input
          type="number"
          inputMode="numeric" 
          name="preparationTime"
          value={formData.preparationTime}
          onChange={handleNumberChange}
        />

        <label>Categorie :</label>
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
        />

        <label>Origine :</label>
        <input
          type="text"
          name="origin"
          value={formData.origin}
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

        <label>Instructions :</label>
        {formData.instructions.map((instruction, index) => (
          <input
            key={index}
            type="text"
            value={instruction}
            onChange={(e) => handleInstructionChange(index, e.target.value)}
          />
        ))}

        <button type="button" onClick={handleAddInstruction}>
          Ajouter une instruction
        </button>

        <button type="submit">Ajouter</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

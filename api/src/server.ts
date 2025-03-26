import express from "express";
import { z } from "zod";
import { Recipe } from "./types";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*", // Remplacez par le domaine autorisé
    methods: ["GET", "POST", "PUT", "DELETE"], // Autoriser GET et POST
    allowedHeaders: ["Content-Type"], // Autoriser le header Content-Type
  })
);

// Base de données en mémoire pour les recettes
let recipes: Recipe[] = [
  {
    id: "1",
    name: "Nouilles Sautées au Poulet",
    picture:
      "https://ffcuisine.fr/wp-content/uploads/2024/05/1716291900_recette-de-nouilles-de-riz-sautees-au-poulet-saveurs-asiatiques-a-la-maison-1024x574.jpg",
    ingredients: [
      "250g de nouilles chinoises",
      "200g de filet de poulet",
      "1 carotte",
      "1 poivron rouge",
      "1 courgette",
      "2 gousses d’ail",
      "3 cuillères à soupe de sauce soja",
      "1 cuillère à soupe de sauce d’huître",
      "1 cuillère à café de gingembre râpé",
      "1 cuillère à soupe d’huile de sésame",
      "Graines de sésame",
      "Oignon vert",
    ],
    instructions: [
      "Cuire les nouilles selon les instructions du paquet et réserver.",
      "Émincer le poulet et le faire revenir avec l’ail et le gingembre dans l’huile de sésame.",
      "Ajouter les légumes coupés en fines lamelles et faire sauter quelques minutes.",
      "Incorporer la sauce soja et la sauce d’huître.",
      "Ajouter les nouilles égouttées et bien mélanger pour enrober de sauce.",
      "Servir chaud avec des graines de sésame et de l’oignon vert haché.",
    ],
    preparationTime: 30,
    type: "Plat principal",
    origin: "Chine",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Salade Caprese",
    picture:
      "https://backoffice.lepetitjournal.com/sites/default/files/2021-05/La%20salade%20caprese%20a%CC%80%20l%27italienne.jpeg",
    ingredients: [
      "3 tomates",
      "200g de mozzarella",
      "Basilic frais",
      "2 cuillères à soupe d'huile d'olive",
      "Sel et poivre",
    ],
    instructions: [
      "Laver et couper les tomates en rondelles.",
      "Couper la mozzarella en tranches.",
      "Alterner les tranches de tomate et de mozzarella dans une assiette.",
      "Parsemer de feuilles de basilic frais.",
      "Assaisonner avec l'huile d'olive, le sel et le poivre.",
    ],
    preparationTime: 10,
    type: "entrée",
    origin: "Italie",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Tiramisu Classique",
    picture:
      "https://img.cuisineaz.com/1024x576/2023/11/20/i196570-tiramisu-simple.jpg",
    ingredients: [
      "250g de mascarpone",
      "3 œufs",
      "100g de sucre",
      "200g de biscuits à la cuillère",
      "200ml de café fort",
      "2 cuillères à soupe de cacao en poudre",
    ],
    instructions: [
      "Séparer les blancs des jaunes d’œufs.",
      "Fouetter les jaunes avec le sucre jusqu'à blanchiment.",
      "Ajouter le mascarpone et bien mélanger.",
      "Monter les blancs en neige et les incorporer délicatement.",
      "Tremper les biscuits dans le café et les disposer dans un plat.",
      "Alterner une couche de biscuits et une couche de crème.",
      "Saupoudrer de cacao et réfrigérer au moins 4 heures avant de servir.",
    ],
    preparationTime: 30,
    type: "Dessert",
    origin: "Italie",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    name: "Soupe froide de concombre",
    picture:
      "https://www.casseroleetchocolat.fr/wp-content/uploads/2023/09/soupe-froide-gaspacho-concombre-5-1080x721.jpeg",
    ingredients: [
      "1 concombre",
      "2 yaourts nature",
      "1 gousse d'ail",
      "Le jus d'un citron",
      "Sel et poivre",
      "Quelques feuilles de menthe",
    ],
    instructions: [
      "Éplucher et couper le concombre en morceaux.",
      "Mixer le concombre avec les yaourts, l'ail et le jus de citron.",
      "Assaisonner avec le sel et le poivre.",
      "Servir bien frais avec des feuilles de menthe.",
    ],
    preparationTime: 15,
    type: "entrée",
    origin: "Méditerranée",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    name: "Tajine de Poulet aux Citrons Confits",
    picture:
      "https://www.labaleine.fr/wp-content/uploads/2022/10/OphelieDelmarle-PaulPasseron-LB-TajineCitronsConfits1.jpg",
    ingredients: [
      "1 poulet coupé en morceaux",
      "2 citrons confits",
      "2 oignons",
      "3 gousses d'ail",
      "1 cuillère à café de gingembre",
      "1 cuillère à café de curcuma",
      "Olives vertes",
      "Huile d'olive",
      "Coriandre fraîche",
    ],
    instructions: [
      "Faire revenir les oignons et l'ail dans de l'huile d'olive.",
      "Ajouter le poulet et les épices, faire dorer.",
      "Ajouter de l'eau et laisser mijoter 45 minutes.",
      "Incorporer les citrons confits et les olives.",
      "Laisser réduire et parsemer de coriandre avant de servir.",
    ],
    preparationTime: 60,
    type: "Plat principal",
    origin: "Maroc",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "6",
    name: "Tarte Tatin",
    picture:
      "https://lecomptoirdessaveurs.fr/wp-content/uploads/2024/10/1729380342_recette-de-tarte-tatin-aux-pommes-et-magret-1024x585.jpg",
    ingredients: [
      "6 pommes",
      "150g de sucre",
      "50g de beurre",
      "1 pâte brisée",
    ],
    instructions: [
      "Préchauffer le four à 180°C.",
      "Faire un caramel avec le sucre et le beurre dans un moule.",
      "Disposer les pommes épluchées et coupées sur le caramel.",
      "Recouvrir avec la pâte brisée et enfourner 30 minutes.",
      "Démouler après quelques minutes et servir tiède.",
    ],
    preparationTime: 45,
    type: "Dessert", 
    origin: "France",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "7",
    name: "Sushi Maki Saumon",
    picture:
      "https://www.ginetteetjosiane.com/wp-content/uploads/2021/02/Makis-saumon-concombre-et-sushis.jpeg",
    ingredients: [
      "250g de riz à sushi",
      "300ml d'eau",
      "3 cuillères à soupe de vinaigre de riz",
      "1 cuillère à soupe de sucre",
      "1/2 cuillère à café de sel",
      "4 feuilles de nori",
      "200g de saumon frais",
      "1 avocat",
      "Sauce soja",
      "Wasabi",
      "Gingembre mariné",
    ],
    instructions: [
      "Rincer le riz plusieurs fois et le cuire avec l'eau.",
      "Mélanger le vinaigre de riz, le sucre et le sel, puis incorporer au riz refroidi.",
      "Déposer une feuille de nori sur un tapis en bambou.",
      "Étaler une couche de riz sur la feuille en laissant un bord libre.",
      "Ajouter des lamelles de saumon et d'avocat.",
      "Rouler en serrant bien, puis couper en tronçons.",
      "Servir avec sauce soja, wasabi et gingembre.",
    ],
    preparationTime: 45,
    type: "Plat principal",
    origin: "Japon",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "8",
    name: "Couscous Royal",
    picture:
      "https://fac.img.pmdstatic.net/fit/~1~fac~2024~04~04~98454441-50f8-4de2-86b3-935568de8821.jpeg/1200x1200/quality/80/crop-from/center/couscous-royal-la-recette-simplifiee-de-ce-grand-classique-de-la-cuisine-marocaine.jpeg",
    ingredients: [
      "500g de semoule de couscous",
      "500g d'agneau",
      "4 merguez",
      "2 carottes",
      "2 courgettes",
      "1 navet",
      "1 boîte de pois chiches",
      "1 oignon",
      "2 tomates",
      "1 cuillère à soupe de concentré de tomate",
      "1 cuillère à café de ras el hanout",
      "1 cuillère à café de paprika",
      "Huile d'olive",
      "Sel, poivre",
    ],
    instructions: [
      "Faire revenir l'oignon avec de l'huile d'olive.",
      "Ajouter l'agneau, les épices et le concentré de tomate.",
      "Incorporer les légumes coupés en morceaux et couvrir d'eau.",
      "Laisser mijoter 1h30, ajouter les pois chiches en fin de cuisson.",
      "Cuire les merguez à part et préparer la semoule.",
      "Servir la semoule avec la viande, les légumes et le bouillon.",
    ],
    preparationTime: 90,
    type: "Plat principal",
    origin: "Maghreb",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "9",
    name: "Mojito sans alcool",
    picture:
      "https://img.passeportsante.net/1200x675/2023-02-28/virgin-mojito.webp",
    ingredients: [
      "1 citron vert",
      "10 feuilles de menthe",
      "1 cuillère à soupe de sucre de canne",
      "Eau gazeuse",
      "Glaçons",
    ],
    instructions: [
      "Couper le citron en quartiers.",
      "Les écraser dans un verre avec le sucre et la menthe.",
      "Ajouter des glaçons et compléter avec de l'eau gazeuse.",
      "Remuer et servir frais.",
    ],
    preparationTime: 5,
    type: "boisson",
    origin: "Cuba",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "10",
    name: "Smoothie fraise-banane",
    picture:
      "https://mamanlesptitsgateaux.fr/wp-content/uploads/2025/03/1742343798-smoothie-fraise-banane-la-recette-facile-et-gourmande.jpg",
    ingredients: [
      "1 banane",
      "150g de fraises",
      "200ml de lait",
      "1 cuillère à soupe de miel",
    ],
    instructions: [
      "Éplucher et couper la banane.",
      "Laver les fraises et les équeuter.",
      "Mixer tous les ingrédients ensemble jusqu'à obtenir une texture lisse.",
      "Servir frais.",
    ],
    preparationTime: 5,
    type: "boisson",
    origin: "International",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Schema de validation pour une nouvelle recette
const RecipeSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  picture: z.string().min(1, "La photo est requise"),
  ingredients: z.array(z.string()).min(1, "Au moins un ingrédient est requis"),
  instructions: z
    .array(z.string())
    .min(1, "Au moins une instruction est requise"),
  preparationTime: z
    .number()
    .min(1, "Le temps de préparation doit être positif"),
  type: z.string().min(1, "Le type est requis"),
  origin: z.string().min(1, "Le type est requis"),
});

// Obtenir toutes les recettes
app.get("/api/recipes", (req, res) => {
  res.json(recipes);
});

// Obtenir toutes les categories
app.get("/api/categories", (req, res) => {
  const typesUniques = [...new Set(recipes.map(recette => recette.type))];

  res.json(typesUniques);
});

// Rechercher toutes les recettes par categorie
app.get("/api/categories/:category", (req, res) => {
  const category = req.params.category.toLowerCase();
  const recipe = recipes.filter((r) => {
    return (
      r.type.toLocaleLowerCase() == category
    );
  });
  if (!recipe) {
    return res.status(404).json({ message: "Recette non trouvée" });
  }
  res.json(recipe);
});

// Obtenir une recette par ID
app.get("/api/recipes/:id", (req, res) => {
  const recipe = recipes.find((r) => r.id === req.params.id);
  if (!recipe) {
    return res.status(404).json({ message: "Recette non trouvée" });
  }
  res.json(recipe);
});

app.get("/api/recipes/search/:query", (req, res) => {
  const query = req.params.query.toLowerCase();
  const recipe = recipes.filter((r) => {
    return (
      r.name.toLowerCase().includes(query) ||
      r.type.toLowerCase().includes(query) ||
      r.origin.toLowerCase().includes(query) ||
      r.ingredients.some((i) => i.includes(query)) ||
      r.instructions.some((i) => i.includes(query))
    );
  });
  if (!recipe) {
    return res.status(404).json({ message: "Recette non trouvée" });
  }
  res.json(recipe);
});

// Créer une nouvelle recette
app.post("/api/recipes", (req, res) => {
  try {
    const validatedData = RecipeSchema.parse(req.body);
    const newRecipe: Recipe = {
      id: Date.now().toString(),
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    recipes.push(newRecipe);
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ message: "Données invalides", error });
  }
});

// Mettre à jour une recette
app.put("/api/recipes/:id", (req, res) => {
  try {
    const validatedData = RecipeSchema.parse(req.body);
    const index = recipes.findIndex((r) => r.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ message: "Recette non trouvée" });
    }

    recipes[index] = {
      ...recipes[index],
      ...validatedData,
      updatedAt: new Date(),
    };

    res.json(recipes[index]);
  } catch (error) {
    res.status(400).json({ message: "Données invalides", error });
  }
});

// Supprimer une recette
app.delete("/api/recipes/:id", (req, res) => {
  const index = recipes.findIndex((r) => r.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Recette non trouvée" });
  }

  recipes.splice(index, 1);
  res.status(204).send();
});


const PORT = process.env.PORT || 3000;
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Erreur serveur:", err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
);
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

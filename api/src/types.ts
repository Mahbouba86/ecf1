export interface Recipe {
  id: string;
  name: string;
  picture: string;
  ingredients: string[];
  instructions: string[];
  preparationTime: number; // en minutes
  type: string;
  origin: string;
  createdAt: Date;
  updatedAt: Date;
}

import { Ingredient } from "./Ingredient";

export interface Recette {
    nom: String;
    ingredients: any[];
    modeCuisson: String;
    nombrePersonnes: Number;
}
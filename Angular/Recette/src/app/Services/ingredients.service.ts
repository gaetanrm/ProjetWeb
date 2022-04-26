import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingredient } from '../Models/Ingredient';
import { Recette } from '../Models/Recette';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  private urlBase: string = 'http://localhost:8888/';
  private name : string = "";
  private listRecettes : Recette[] = new Array();
  private resRecettes : Recette[] = new Array();

  constructor(private http: HttpClient, private router: Router) { }

  //Permet de récupérer tous les ingrédients
  getIngredients(): Observable<Ingredient[]> { 
    console.log("Recherche de produits");
    return this.http.get<Ingredient[]>(this.urlBase+'produits');
  }

  //Permet de récupérer toutes les recettes
  getRecettes(): Observable<Recette[]> {
    console.log("Recherche de recettes");
    return this.http.get<Recette[]>(this.urlBase+'recettes');
  }

  //Permet de rechercher à partir d'un nom
  getRecetteByID(name : string) : Observable<Recette[]> {
    console.log("Recherche de recette");
    let resRecette : Observable<Recette[]> = this.http.get<Recette[]>(this.urlBase+'recettes/' + name);
    if ((resRecette == undefined) && (resRecette == null))
      console.log("aucune recette correspond à la recherche");
    return resRecette;
  }

  getIngredientByID(name : string) : Observable<Ingredient[]> {
    console.log("Recherche d'ingrédient");
    let resIngredient : Observable<Ingredient[]> = this.http.get<Ingredient[]>(this.urlBase+'produits/' + name);
    if ((resIngredient == undefined) && (resIngredient == null))
      console.log("aucun ingrédient correspond à la recherche");
    return resIngredient;
  }

  /*getRecetteByIngredient(ingredient : string) : Observable<Recette[]> {
    console.log("Recherche de recette par ingrédient");
    let resRecette : Observable<Recette[]> = this.http.get<Recette[]>(this.urlBase+'recettes/ingredients/' + ingredient);
    if ((resRecette == undefined) && (resRecette == null))
      console.log("aucune recette correspond à la recherche");
    return resRecette;
  }*/

  getRecettesByIngredient() : Recette[] {
    this.resRecettes = new Array();
    this.getRecettes().subscribe(res => {
      this.listRecettes = res;
    });
    if (this.listRecettes != null){
      for (let recette of this.listRecettes){
        for (let ingredient of recette.ingredients){
          console.log("nom ingrédient recherché : " + this.getName());
          console.log("ingrédient actuel : " + ingredient);
          if (ingredient[0] === this.getName()){
            console.log("je l'ai !!!!!!!")
            this.resRecettes.push(recette);
          }
        }
      }
    }return this.resRecettes;
  }

  setName(newName : string){
    this.name = newName;
    this.router.routeReuseStrategy.shouldReuseRoute = function() { return false; };
    this.router.navigate(['/recherche']);
  }

  getName() : string{
    return this.name;
  }
}

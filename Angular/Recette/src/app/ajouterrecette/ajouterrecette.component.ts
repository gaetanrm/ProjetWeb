import { Component, OnInit } from '@angular/core';
import { IngredientsService } from '../Services/ingredients.service';

@Component({
  selector: 'app-ajouterrecette',
  templateUrl: './ajouterrecette.component.html',
  styleUrls: ['./ajouterrecette.component.css']
})
export class AjouterrecetteComponent implements OnInit {

  public listIngredients : any[] = new Array();
  public listInput : any[] = new Array();
  public indInput : number = 1;

  constructor(public ingredientService : IngredientsService) { }

  ngOnInit(): void {
  }

  //Pour le moment on ne s'occupe pas de l'unité de la quantité de l'ingrédient (ex : mL / mg / kg ...)
  //On ajoute simplement les ingrédients que l'on crée dans la table recettes. 
  //Plus tard, il serait envisageable et même préférable, d'ajouter les ingrédients 
  //qui n'existent pas dans la table produits


  //Permet d'ajouter un ingrédient dans le form HTML
  addIngredient(){
    let element = document.getElementById('divIngredient');
    if (element != null){
      
      //Div pour le nom de l'ingrédient
      let divName = document.createElement('div');
      divName.className = "input-field col s10 center";

      //Input pour le nom de l'ingrédient
      let inputName = document.createElement('input');
      inputName.type = "text";
      inputName.id = this.indInput.toString();
      this.indInput++;

      //Label pour le nom de l'ingrédient
      let labelName = document.createElement('label');
      labelName.textContent = "Ingrédient"

      //On associe l'input et le label à la div créée plus haut
      divName.appendChild(inputName);
      divName.appendChild(labelName);

      //Div pour la quantité de l'ingrédient
      let divQuantity = document.createElement('div');
      divQuantity.className = "input-field col s2 center";

      //Input pour la quantité de l'ingrédient
      let inputQuantity = document.createElement('input');
      inputQuantity.type = "number";
      inputQuantity.defaultValue = "1";
      inputQuantity.id = this.indInput.toString();
      this.indInput++;

      //Label pour la quantité de l'ingrédient
      let labelQuantity = document.createElement('label');
      labelQuantity.textContent = "Quantité"

      //On associe l'input et le label à la div créée plus haut
      divQuantity.appendChild(inputQuantity);
      divQuantity.appendChild(labelQuantity);

      //Pour finir, on ajoute les deux div à la div principale de l'HTML
      element.appendChild(divName);
      element.appendChild(divQuantity);

      let oneIng : HTMLInputElement[] = [inputName, inputQuantity];
      this.listInput.push(oneIng);
      console.log(this.listInput);
    }
  }

  //Pour gérer l'ajout automatiquement lors de l'appuis sur valider
  add(name : string, coockingMode : string, numberP : number){
    for (let listIng of this.listInput){
      let valueName : HTMLInputElement = listIng[0];
      let valueQuantity : HTMLInputElement = listIng[1];
      this.setListIngredients(valueName.value, valueQuantity.valueAsNumber);
    }
    this.addRecette(name, this.getListIngredients(), coockingMode, numberP);
  }
  //Permet d'ajouter une recette
  addRecette(name : string, listIngredients : any[], coockingMode : string, numberP : number){
    this.ingredientService.pushNewRecette(name, listIngredients, coockingMode, numberP);
  }

  //Permet de récupérer la liste des ingrédients
  getListIngredients() : any[]{
    return this.listIngredients;
  }

  //Permet de mettre à jour la liste des ingrédients avec le nouvel ingrédient
  setListIngredients(newIngredient : string, newQuantity : number){
    let list : any[] = [newIngredient, newQuantity];
    this.listIngredients.push(list);
  }
}

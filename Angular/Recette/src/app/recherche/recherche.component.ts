import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../Models/Ingredient';
import { Recette } from '../Models/Recette';
import { IngredientsService } from '../Services/ingredients.service';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})

export class RechercheComponent implements OnInit {

  public resRecette : Recette[] = new Array();
  public resRecettebyIng : Recette[] = new Array();
  public resIngredient : Ingredient[] =  new Array();

  constructor(public listSearch : IngredientsService) { }

  ngOnInit(): void {
    this.listSearch.getRecetteByID(this.listSearch.getName()).subscribe(resRecette => {
      this.resRecette = resRecette;
    });

    this.listSearch.getIngredientByID(this.listSearch.getName()).subscribe(resIngredient => {
      this.resIngredient = resIngredient;
    });

    //if (this.resRecette == this.resRecettebyIng)
      /*this.listSearch.getRecetteByIngredient(this.listSearch.getName()).subscribe(resRecettebyIng => {
        this.resRecettebyIng = this.resRecettebyIng;
      });*/
    
    this.resRecettebyIng = this.listSearch.getRecettesByIngredient();
  }

}

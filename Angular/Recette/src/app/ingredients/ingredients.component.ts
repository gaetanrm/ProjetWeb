import { Component, OnInit } from '@angular/core';
import { IngredientsService } from '../Services/ingredients.service';
import { Ingredient } from '../Models/Ingredient';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  public ingredients: Ingredient[] = new Array();

  constructor(private listIngredients: IngredientsService ) { }

  ngOnInit() {
    console.log("Recherche des ingrédients");
    this.listIngredients.getIngredients().subscribe(ingredients => {
      this.ingredients = ingredients;
    });
  }

}

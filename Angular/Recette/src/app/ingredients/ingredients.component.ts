import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IngredientsService } from '../ingredients.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  public ingredients: Object[] = new Array();

  constructor(private listIngredients: IngredientsService ) { }

  ngOnInit() {
    console.log("Invocation du composant produits");
    this.listIngredients.getIngredients().subscribe(ingredients => {
      this.ingredients = ingredients;
      console.dir(this.ingredients);
    });
  }

}

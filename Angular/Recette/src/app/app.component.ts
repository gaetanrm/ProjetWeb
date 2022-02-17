import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MinuteMeal';
  listIngredient = 'Liste des Ingrédients';
  listRecettes = 'Liste des Recettes';
}

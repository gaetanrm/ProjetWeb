import { Component, OnInit } from '@angular/core';
import { IngredientsService } from '../ingredients.service';
import { Recette } from '../Recette';

@Component({
  selector: 'app-recettes',
  templateUrl: './recettes.component.html',
  styleUrls: ['./recettes.component.css']
})
export class RecettesComponent implements OnInit {

  public recettes : Recette[] = new Array();

  constructor(private listRecettes : IngredientsService) { }

  ngOnInit(): void {
    console.log("Recherche de toutes les recettes");
    this.listRecettes.getRecettes().subscribe(recettes => {
      this.recettes = recettes});
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingredient } from '../Models/Ingredient';
import { Recette } from '../Models/Recette';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  private urlBase: string = 'http://localhost:8888/';

  constructor(private http: HttpClient) { }

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.urlBase+'produits');
  }

  getRecettes(): Observable<Recette[]> {
    return this.http.get<Recette[]>(this.urlBase+'recettes');
  }
}

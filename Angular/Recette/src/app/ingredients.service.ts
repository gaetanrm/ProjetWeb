import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  private urlBase: string = 'http://localhost:8888/';

  constructor(private http: HttpClient) { }

  getIngredients(): Observable<any> {
    return this.http.get(this.urlBase+'produits');
  }
}

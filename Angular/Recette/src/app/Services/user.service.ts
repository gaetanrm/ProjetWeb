import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Response } from '../Models/Response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlBase: string = 'http://localhost:8888/';

  constructor(private http: HttpClient, private router : Router) { }

  public connect(id: string, password: string) : Observable<Response>{
    return this.http.post<Response>(this.urlBase+'user/connexion', {"pseudo": id, "password": password});
  }

  public logIn(id: string, password: string){
    console.log("id : " + id + "password : " + password);
    let user : Observable<Response> = this.connect(id, password);
    user.subscribe(userconnected => {
      if (userconnected.resultat == 1) {
        localStorage.setItem("connectedUser", JSON.stringify(userconnected.user));
        this.router.navigate(['']);
      }else
        alert("Erreur !" + userconnected.message);
    })
  }

  public logOut(): void {
    localStorage.removeItem("connectedUser");
  }

  public isLogged() : boolean {
    if(localStorage.getItem("connectedUser"))
      return true;
    else
      return false;
  }
}

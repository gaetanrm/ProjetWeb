import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Response } from '../Models/Response';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlBase: string = 'http://localhost:8888/';

  constructor(private http: HttpClient, private router : Router) { }

  //Pour l'envoie de la requête Http au serveur Node
  public connect(id: string, password: string) : Observable<Response>{
    return this.http.post<Response>(this.urlBase+'user/connexion', {"pseudo": id, "password": password});
  }

  //Pour la connexion
  public logIn(id: string, password: string){
    console.log("id : " + id + "password : " + password);
    let user : Observable<Response> = this.connect(id, password);
    user.subscribe(userconnected => {
      if (userconnected.resultat == 1) {
        localStorage.setItem("connectedUser", JSON.stringify(userconnected.user));
        //On redirige l'utilisateur vers la page principale une fois qu'il s'est connecté
        this.router.navigate(['']);
      }else
        alert("Erreur !" + userconnected.message);
    })
  }

  //Pour se déconnecter
  public logOut(): void {
    console.log("Déconnexion");
    localStorage.removeItem("connectedUser");
  }

  //Pour vérifier si un utilisateur est actuellement connecté au site
  public isLogged() : boolean {
    if(localStorage.getItem("connectedUser"))
      return true;
    else
      return false;
  }

  //Pour l'inscription
  public register(pseudo: string, email: string, password: string){
    console.log("on tente d'inscrire l'utilisateur");
    let regUser : Observable<Response> = this.http.post<Response>(this.urlBase+"user/inscription", {pseudo, email, password});
    regUser.subscribe(result => {
      if (result.resultat == 1){
        //On redirige l'utilisateur vers la page de connexion si l'inscription à réussie
        this.router.navigate(['/connexion']); 
      }else
        alert(result.message);
    })
  }

  //Pour récupérer la liste de tous les utilisateurs
  getUsers(): Observable<User[]> {
    console.log("on récupère les utilisateurs");
    return this.http.get<User[]>(this.urlBase+'users');
  }
}

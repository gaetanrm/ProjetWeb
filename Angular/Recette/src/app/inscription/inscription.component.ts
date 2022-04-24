import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  private error : string = "";
  private users : User[] = new Array();

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

  //Sert à savoir si les informations rentrées par l'utilisateur sont correctes
  public isConformed(id : string, email : string, password : string){
    if (this.verify(id, email, password)){
      //Informations correctes, donc on peut appeler register()
      console.log("toutes les informations sont correctes");
      this.userService.register(id, email, password);
    }else
      //On affiche l'erreur qui nous empêche de nous inscrire
      alert("Erreur : " + this.error);
  }

  //Sert à vérifier les informations de l'utilisateur / renvoie true si elles sont correctes, false sinon
  public verify(id : string, email : string, password : string) : boolean{
    let res : boolean = false;

    //Premièrement, on vérifie que toutes les informations ont été rentrées
    if ((id == "" || email == "" || password == "") ||
        (id == undefined || email == undefined || password == undefined) ||
        (id == null || email == null || password == null)){
          this.error = "Information(s) manquante(s)";
          return res;
    }

    //Deuxièmement, on vérifie que toutes les informations soient correctes
    //Identifiant valide ?
    let forbiddenChar = ['&', '#', '~', '{', '[', '|', '`', '\\', '^', '@', ']', '}', '(', ')', '='];
    for (let char of forbiddenChar){
      if (id.includes(char)){
        this.error = "Votre identifiant contient des caractères interdits et " + char + " en fait partie";
        return res;
      }
    }

    //Email valide ?
    //Cette liste contient tous les caractères qui sont interdits
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      this.error = "Email invalide";
      return res;
    }
    
    //On considère que tous les mots de passe sont valides / Aucune restriction ne s'applique dessus
    //Il reste à savoir si le pseudo ou l'email ne sont pas déjà utilisés par un autre compte
    console.log("Récupération des utilisateurs");
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      for (let user of this.users){
        if ((id == user.pseudo) || (email == user.email))
          this.error = "Pseudo et/ou email déjà utilisé";
      }
    });

    //Si aucune erreur enregistrée, on peut renvoyer true
    if (this.error == "")
      res = true;
    
      return res;



  }
}

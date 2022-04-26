import { Component, OnInit } from '@angular/core';
import { IngredientsService } from '../Services/ingredients.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public userService: UserService, public ingredientService: IngredientsService) { }

  ngOnInit(): void {
  }

}

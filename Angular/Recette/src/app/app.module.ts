import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { RecettesComponent } from './recettes/recettes.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { RechercheComponent } from './recherche/recherche.component';
import { AjouterrecetteComponent } from './ajouterrecette/ajouterrecette.component';

@NgModule({
  declarations: [
    AppComponent,
    IngredientsComponent,
    ConnexionComponent,
    RecettesComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    PagenotfoundComponent,
    InscriptionComponent,
    RechercheComponent,
    AjouterrecetteComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

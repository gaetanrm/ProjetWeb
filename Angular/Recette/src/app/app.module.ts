import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { RecettesComponent } from './recettes/recettes.component';

@NgModule({
  declarations: [
    AppComponent,
    IngredientsComponent,
    ConnexionComponent,
    RecettesComponent
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

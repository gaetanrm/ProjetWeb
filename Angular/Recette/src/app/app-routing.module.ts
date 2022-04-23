import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { RecettesComponent } from './recettes/recettes.component';
import { SavoirplusComponent } from './savoirplus/savoirplus.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'ingredients', component: IngredientsComponent },
  { path: 'connexion', component: ConnexionComponent},
  { path: 'recettes', component: RecettesComponent},
  { path: 'ensavoirplus', component: SavoirplusComponent},
  { path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

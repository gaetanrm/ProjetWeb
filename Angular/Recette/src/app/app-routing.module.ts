import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { RecettesComponent } from './recettes/recettes.component';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { RechercheComponent } from './recherche/recherche.component';
import { AjouterrecetteComponent } from './ajouterrecette/ajouterrecette.component';

const routes: Routes = [
  { path: 'ingredients', component: IngredientsComponent },
  { path: 'connexion', component: ConnexionComponent},
  { path: 'recettes', component: RecettesComponent},
  { path: '', component: HomeComponent},
  { path: 'inscription', component: InscriptionComponent},
  { path: 'recherche', component: RechercheComponent},
  { path: 'ajouterecette', component: AjouterrecetteComponent},
  { path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

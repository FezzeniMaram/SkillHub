import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConnexionComponent} from "./connexion/connexion.component";
import {InscrireComponent} from "./inscrire/inscrire.component";
import {AccueilComponent} from "./accueil/accueil.component";
import {HeaderComponent} from "./header/header.component";


const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent },
  { path: 'inscrire', component: InscrireComponent },
  { path: 'connexion', component: ConnexionComponent},
  { path: 'header', component: HeaderComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

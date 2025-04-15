import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConnexionComponent} from "./connexion/connexion.component";
import {AccueilComponent} from "./accueil/accueil.component";
import {HeaderComponent} from "./header/header.component";
import {ChoixInscriptionComponent} from "./choix-inscription/choix-inscription.component";
import {InscrireEtudiantComponent} from "./inscrire-etudiant/inscrire-etudiant.component";
import {InscrireTuteurComponent} from "./inscrire-tuteur/inscrire-tuteur.component";
import {FooterComponent} from "./footer/footer.component";
import {AProposComponent} from "./a-propos/a-propos.component";
import {ContactComponent} from "./contact/contact.component";
import {CoursesComponent} from "./courses/courses.component";


const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent },
  { path: 'connexion', component: ConnexionComponent},
  { path: 'header', component: HeaderComponent},
  { path: 'footer', component: FooterComponent},
  { path: 'choixInscrire', component: ChoixInscriptionComponent},
  { path: 'inscrireEtudiant', component: InscrireEtudiantComponent},
  { path: 'inscrireTuteur', component: InscrireTuteurComponent},
  { path: 'apropos', component: AProposComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'courses', component: CoursesComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

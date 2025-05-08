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
import {CoursEtudiantComponent} from "./profil/cours-etudiant/cours-etudiant.component";
import {CoursTuteurComponent} from "./profil/cours-tuteur/cours-tuteur.component";
import {CoursComponent} from "./cours/cours.component";
import {AjouterCoursComponent} from "./profil/ajouter-cours/ajouter-cours.component";
import {ModifierCoursComponent} from "./profil/modifier-cours/modifier-cours.component";
import {CoursDetailsComponent} from "./cours-details/cours-details.component";
import {AjouterChapitreComponent} from "./profil/ajouter-chapitre/ajouter-chapitre.component";
import {ModifierChapitreComponent} from "./modifier-chapitre/modifier-chapitre.component";
import {ChapitreDetailsComponent} from "./chapitre-details/chapitre-details.component";
import {ChatComponent} from "./chat/chat.component";
import {TuteurComponent} from "./tuteur/tuteur.component";
import {ProfilLayoutComponent} from "./profil/profil-layout/profil-layout.component";
import {ProfilInfosComponent} from "./profil/profil-infos/profil-infos.component";
import {ProfilMessagerieComponent} from "./profil/profil-messagerie/profil-messagerie.component";
import {ProfilSupportComponent} from "./profil/profil-support/profil-support.component";
import {ListeBlocageComponent} from "./profil/liste-blocage/liste-blocage.component";
import {CoursDetaillsComponent} from "./profil/cours-detaills/cours-detaills.component";



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
  { path: 'cours', component: CoursComponent},
  { path: 'ajouterCours', component: AjouterCoursComponent},
  { path: 'modifierCours/:id', component: ModifierCoursComponent },
  { path: 'cours/:idCour', component: CoursDetailsComponent },
  { path: 'ajouterChapitre/:idCour', component: AjouterChapitreComponent },
  { path: 'modifierChapitre/:idChapitre', component: ModifierChapitreComponent },
  { path: 'chapitre/:idChapitre', component: ChapitreDetailsComponent},
  {
    path: 'profil',
    component: ProfilLayoutComponent,
    children: [

      { path: '', redirectTo: 'infos', pathMatch: 'full' },
      { path: 'coursTuteur', component: CoursTuteurComponent},
      { path: 'coursEtudiant', component: CoursEtudiantComponent},
      { path: 'infos', component: ProfilInfosComponent },
      { path: 'messagerie/:id', component: ProfilMessagerieComponent },
      { path: 'messagerie', component: ProfilMessagerieComponent },
      { path: 'support', component: ProfilSupportComponent },
      { path: 'blocage', component: ListeBlocageComponent },
      { path: 'ajouterCours', component: AjouterCoursComponent},
      { path: 'ajouterChapitre/:idCour', component: AjouterChapitreComponent },
      { path: 'cours/:idCour', component: CoursDetaillsComponent },
      { path: 'modifierChapitre/:idChapitre', component: ModifierChapitreComponent },
      { path: 'modifierCours/:id', component: ModifierCoursComponent },

    ]
  },

   { path: 'conversation/:id', component: ChatComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'tuteur/:id', component: TuteurComponent }





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

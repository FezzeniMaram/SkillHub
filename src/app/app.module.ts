import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule} from "@angular/material/icon";
import { MatToolbarModule} from "@angular/material/toolbar";
import { HeaderComponent } from './header/header.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { AccueilComponent } from './accueil/accueil.component';
import { MatDialogModule} from "@angular/material/dialog";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { InscrireEtudiantComponent } from './inscrire-etudiant/inscrire-etudiant.component';
import { InscrireTuteurComponent } from './inscrire-tuteur/inscrire-tuteur.component';
import { ChoixInscriptionComponent } from './choix-inscription/choix-inscription.component';
import { FooterComponent } from './footer/footer.component';
import { MatSnackBarModule} from "@angular/material/snack-bar";
import { AProposComponent } from './a-propos/a-propos.component';
import { ContactComponent } from './contact/contact.component';
import {MatDividerModule} from "@angular/material/divider";
import {MatMenuModule} from "@angular/material/menu";
import { CoursTuteurComponent } from './profil/cours-tuteur/cours-tuteur.component';
import { CoursEtudiantComponent } from './profil/cours-etudiant/cours-etudiant.component';
import {TokenInterceptor} from "./services/token/token.interceptor";
import { CoursComponent } from './cours/cours.component';
import { AjouterCoursComponent } from './profil/ajouter-cours/ajouter-cours.component';
import { ModifierCoursComponent } from './profil/modifier-cours/modifier-cours.component';
import {MatStepperModule} from "@angular/material/stepper";
import { CoursDetailsComponent } from './cours-details/cours-details.component';
import { AjouterChapitreComponent } from './profil/ajouter-chapitre/ajouter-chapitre.component';
import { ModifierChapitreComponent } from './modifier-chapitre/modifier-chapitre.component';
import { ChapitreDetailsComponent } from './chapitre-details/chapitre-details.component';
import { ProfilComponent } from './profil/profil.component';
import { ChatComponent } from './chat/chat.component';
import { TuteurComponent } from './tuteur/tuteur.component';
import {MatListModule} from "@angular/material/list";
import { ProfilLayoutComponent } from './profil/profil-layout/profil-layout.component';
import { ProfilInfosComponent } from './profil/profil-infos/profil-infos.component';
import { ProfilMessagerieComponent } from './profil/profil-messagerie/profil-messagerie.component';
import { ProfilSupportComponent } from './profil/profil-support/profil-support.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {ListeBlocageComponent} from "./profil/liste-blocage/liste-blocage.component";
import { CoursDetaillsComponent } from './profil/cours-detaills/cours-detaills.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ConnexionComponent,
    AccueilComponent,
    InscrireEtudiantComponent,
    InscrireTuteurComponent,
    ChoixInscriptionComponent,
    FooterComponent,
    AProposComponent,
    ContactComponent,
    CoursTuteurComponent,
    CoursEtudiantComponent,
    CoursComponent,
    AjouterCoursComponent,
    ModifierCoursComponent,
    CoursDetailsComponent,
    AjouterChapitreComponent,
    ModifierChapitreComponent,
    ChapitreDetailsComponent,
    ProfilComponent,
    ChatComponent,
    TuteurComponent,
    ProfilLayoutComponent,
    ProfilInfosComponent,
    ProfilMessagerieComponent,
    ProfilSupportComponent,
    ListeBlocageComponent,
    CoursDetaillsComponent,
  ],
    imports: [
        MatToolbarModule,
        MatIconModule,
        BrowserModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatDialogModule,
        HttpClientModule,
        MatSnackBarModule,
        MatMenuModule,
        MatDividerModule,
        MatStepperModule,
        MatListModule,
        MatExpansionModule,
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

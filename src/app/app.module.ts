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
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import { AProposComponent } from './a-propos/a-propos.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileEtudiantComponent } from './profile-etudiant/profile-etudiant.component';
import {MatDividerModule} from "@angular/material/divider";
import {MatMenuModule} from "@angular/material/menu";
import { CoursTuteurComponent } from './cours-tuteur/cours-tuteur.component';
import { CoursEtudiantComponent } from './cours-etudiant/cours-etudiant.component';
import {TokenInterceptor} from "./services/token/token.interceptor";
import { CoursComponent } from './cours/cours.component';
import { AjouterCoursComponent } from './ajouter-cours/ajouter-cours.component';
import { ModifierCoursComponent } from './modifier-cours/modifier-cours.component';

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
    ProfileEtudiantComponent,
    CoursTuteurComponent,
    CoursEtudiantComponent,
    CoursComponent,
    AjouterCoursComponent,
    ModifierCoursComponent
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
    MatDividerModule
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

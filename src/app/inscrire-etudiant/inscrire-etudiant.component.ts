import { Component } from '@angular/core';
import { AuthService } from '../services/authentification/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-inscrire-etudiant',
  templateUrl: './inscrire-etudiant.component.html',
  styleUrls: ['./inscrire-etudiant.component.css']
})
export class InscrireEtudiantComponent {
  etudiant = {
    nomEtudiant: '',
    emailEtudiant: '',
    motPasseEtudiant: '',
    gender: '',                        // <-- ajouté
    dateNaissanceEtudiant: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.registerEtudiant(this.etudiant).subscribe({
      next: (res) => {
        alert(res.message); // Affiche le message du backend
        if (res.success) {
          this.etudiant = {
            nomEtudiant: '',
            emailEtudiant: '',
            motPasseEtudiant: '',
            gender: '',                        // <-- ajouté
            dateNaissanceEtudiant: ''
          };
          this.router.navigate(['/accueil']);
        }

      },

      error: () => {
        alert('Erreur côté serveur');
      }
    });
  }
}

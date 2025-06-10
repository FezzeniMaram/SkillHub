import { Component } from '@angular/core';
import { AuthService } from '../services/authentification/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscrire-tuteur',
  templateUrl: './inscrire-tuteur.component.html',
  styleUrls: ['./inscrire-tuteur.component.css']
})
export class InscrireTuteurComponent {
  tuteur = {
    nomTuteur: '',
    emailTuteur: '',
    motPasseTuteur: '',
    gender: '',
    dateNaissanceTuteur: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.registerTuteur(this.tuteur).subscribe({
      next: (res) => {
        alert(res.message);
        if (res.success) {
          this.tuteur = {
            nomTuteur: '',
            emailTuteur: '',
            motPasseTuteur: '',
            gender: '',
            dateNaissanceTuteur: ''
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

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
    motPasseTuteur: ''
  };

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  onSubmit(form: any) {
    if (form.valid) {
      this.authService.registerTuteur(this.tuteur).subscribe({
        next: (res) => {
          this.snackBar.open(res.message, 'Fermer', {
            duration: 3000,
            panelClass: res.success ? 'snack-success' : 'snack-error',
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });

          if (res.success) {
            this.tuteur = { nomTuteur: '', emailTuteur: '', motPasseTuteur: '' };
            this.router.navigate(['/connexion']); // Redirection après inscription réussie
          }
        },
        error: () => {
          this.snackBar.open("Erreur serveur", 'Fermer', {
            duration: 3000,
            panelClass: 'snack-error',
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        }
      });
    }
  }
}

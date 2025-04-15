import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-inscrire-etudiant',
  templateUrl: './inscrire-etudiant.component.html',
  styleUrls: ['./inscrire-etudiant.component.css']
})
export class InscrireEtudiantComponent {
  etudiant = {
    nomEtudiant: '',
    emailEtudiant: '',
    motPasseEtudiant: ''
  };

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {}

  onSubmit() {
    this.authService.registerEtudiant(this.etudiant).subscribe({
      next: (res) => {
        this.snackBar.open(res.message, 'Fermer', {
          duration: 3000,
          panelClass: res.success ? 'snack-success' : 'snack-error',
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });

        if (res.success) {
          // Redirection ou nettoyage
          this.etudiant = { nomEtudiant: '', emailEtudiant: '', motPasseEtudiant: '' };
        }
      },
      error: () => {
        this.snackBar.open("Erreur côté serveur.", 'Fermer', {
          duration: 3000,
          panelClass: 'snack-error',
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    });
  }
}

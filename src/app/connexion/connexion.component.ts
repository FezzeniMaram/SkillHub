import { Component } from '@angular/core';
import { AuthService } from "../services/authentification/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  user = {
    email: '',
    password: ''

  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.user).subscribe({
      next: (response) => {
        console.log(response.message);
        console.log('username reçu du backend :', response.username); //
        if (response.success) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          localStorage.setItem('username', response.username);
          localStorage.setItem('userId', response.id.toString());
          localStorage.setItem('gender', response.gender);
          localStorage.setItem('email', response.email);
          console.log('✅ Rôle de lutilisateur connecté :', response.role);
          this.router.navigate(['/accueil']);
        }
      },
      error: (error) => {
        console.error('Erreur HTTP', error);
      }
    });
  }
}

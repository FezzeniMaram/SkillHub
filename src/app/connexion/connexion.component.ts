import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

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

  constructor(private authService: AuthService , private router: Router) {}

  onSubmit() {
    this.authService.login(this.user).subscribe({
      next: (response) => {
        console.log('Réponse backend :', response);

        if (response.success) {
          // 🔐 Stocker le token si nécessaire
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          console.log('Connexion réussie en tant que ' + response.role);

          this.router.navigate(['/accueil']);

        } else {
          alert('Erreur : ' + response.message);
        }
      },
      error: (error) => {
        console.error('Erreur HTTP', error);
        alert('Erreur de connexion au serveur.');
      }
    });
  }


}


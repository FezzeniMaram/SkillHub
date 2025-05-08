import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil-layout',
  templateUrl: './profil-layout.component.html',
  styleUrls: ['./profil-layout.component.css']
})
export class ProfilLayoutComponent implements OnInit {
  nomUtilisateur: string = '';
  role: string = '';
  gender: string = 'HOMME';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.nomUtilisateur = localStorage.getItem('username') || 'Utilisateur';
    this.role = localStorage.getItem('role') || '';
    this.gender = localStorage.getItem('gender') || 'HOMME';

  }
  allerVersCours() {
    if (this.role === 'ETUDIANT') {
      this.router.navigate(['/profil/coursEtudiant']);
    } else if (this.role === 'TUTEUR') {
      this.router.navigate(['/profil/coursTuteur']);
    }
  }


  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    localStorage.removeItem('gender');
    this.router.navigate(['/accueil']).then(() => window.location.reload());
  }
}


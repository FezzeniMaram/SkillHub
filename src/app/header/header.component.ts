import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ConnexionComponent} from "../connexion/connexion.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  constructor(private router: Router) {
  }

  menuOpen: boolean = false;
  nomUtilisateur = ""
  role= "";
  isConnected: boolean = false;


  ngOnInit(): void {
    this.isConnected = !!localStorage.getItem('token');
    this.nomUtilisateur = localStorage.getItem('username') || 'Utilisateur';
    this.role = localStorage.getItem('role') || '';
    console.log('Nom utilisateur affiché dans header :', this.nomUtilisateur);

  }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    // Redirection vers l'accueil
    this.router.navigate(['/accueil']).then(() => {
      // Actualiser la page après redirection
      window.location.reload();
    });
  }
  redirigerVersCours() {
    if (this.role === 'ETUDIANT') {
      this.router.navigate(['/coursEtudiant']);
    } else if (this.role === 'TUTEUR') {
      this.router.navigate(['/coursTuteur']);
    } else {
      alert("Rôle non autorisé.");
    }
  }

}

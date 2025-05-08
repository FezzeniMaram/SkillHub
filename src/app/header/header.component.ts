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

  nomUtilisateur = ""
  role= "";
  isConnected: boolean = false;
  gender: string = 'HOMME';

  ngOnInit(): void {
    this.gender = localStorage.getItem('gender') || 'HOMME';
    this.isConnected = !!localStorage.getItem('token');
    this.nomUtilisateur = localStorage.getItem('username') || 'Utilisateur';
    this.role = localStorage.getItem('role') || '';
    console.log('Nom utilisateur affiché dans header :', this.nomUtilisateur);

  }

}

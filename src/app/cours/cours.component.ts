import { Component, OnInit } from '@angular/core';
import { CoursService } from "../services/cours/cours.service";
import { HttpClient } from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {

  coursList: any[] = [];
  inscrits: number[] = [];
  role: string | null = null;

  constructor(private coursService: CoursService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.coursService.getAllCours().subscribe(res => {
      if (res.success) {
        this.coursList = res.data;
        console.log(this.coursList); // Affichage des cours récupérés
      }
    });

    const idEtudiant = Number(localStorage.getItem('userId'));
    this.coursService.getCoursEtudiant(idEtudiant).subscribe({
      next: (data) => {
        this.inscrits = data.map(c => c.idCour); // Stocker les id des cours inscrits
      }
    });
  }

  getImageUrl(file: string): string {
    return `http://localhost:8082/api/files/${file}`;
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/html-code.png'; // Image de remplacement en cas d'erreur
  }

  inscrireEtudiant(coursId: number): void {
    const idEtudiant = localStorage.getItem('userId');

    if (idEtudiant) {
      this.coursService.inscrireEtudiantAuCours(Number(idEtudiant), coursId).subscribe({
        next: (res) => {
          if (res.success === false) {
            alert("⚠ " + res.message);
          } else {
            alert("✅ " + res.message);
            this.inscrits.push(coursId);
          }
        },
        error: () => {
          alert("❌ Erreur technique.");
        }
      });
    } else {
      alert("ID étudiant manquant.");
    }
  }
  consulterCours(idCour: number): void {
    this.router.navigate(['/cours', idCour]);
  }


}

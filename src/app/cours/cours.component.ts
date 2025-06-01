import { Component, OnInit } from '@angular/core';
import { CoursService } from "../services/cours/cours.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {

  coursList: any[] = [];
  filteredCoursList: any[] = [];
  inscrits: number[] = [];
  role: string | null = null;
  searchTerm: string = '';

  constructor(
    private coursService: CoursService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.coursService.getAllCours().subscribe(res => {
      if (res.success) {
        this.coursList = res.data;
        this.filteredCoursList = this.coursList; // initialiser la liste filtrée
        console.log(this.coursList);
      }
    });

    const idEtudiant = Number(localStorage.getItem('userId'));
    this.coursService.getCoursEtudiant(idEtudiant).subscribe({
      next: (data) => {
        this.inscrits = data.map(c => c.idCour);
      }
    });
  }

  getImageUrl(file: string): string {
    return `http://localhost:8082/api/files/${file}`;
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/html-code.png';
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

  filterCours(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (term) {
      this.filteredCoursList = this.coursList.filter(cours =>
        cours.titreCours.toLowerCase().includes(term) ||+
        cours.descriptionCours.toLowerCase().includes(term) ||
        cours.nomTuteur.toLowerCase().includes(term)
      );
    } else {
      this.filteredCoursList = this.coursList;
    }
  }
}

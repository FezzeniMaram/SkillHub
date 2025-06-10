import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authentification/auth.service';
import {CoursService} from "../../services/cours/cours.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cours-etudiant',
  templateUrl: './cours-etudiant.component.html',
  styleUrls: ['./cours-etudiant.component.css']
})
export class CoursEtudiantComponent implements OnInit {
  cours: any[] = [];
  idEtudiant: number = 0;

  constructor(private authService: AuthService, private coursService : CoursService, private router: Router) {}

  ngOnInit(): void {
    const storedId = localStorage.getItem('userId');
    this.idEtudiant = storedId ? Number(storedId) : 0;
    console.log("ID de l'étudiant connecté :", this.idEtudiant);

    if (this.idEtudiant > 0) {
      this.authService.getCoursEtudiant(this.idEtudiant).subscribe({
        next: (data) => {
          console.log("Cours inscrits :", data);
          this.cours = data;
        },
        error: (err) => {
          console.error("Erreur de chargement des cours :", err);
          console.log("Impossible de charger les cours inscrits.");
        }
      });
    } else {
      console.log("Utilisateur non connecté ou ID manquant.");
    }
  }

  getImageUrl(file: string): string {
    return `http://localhost:8082/api/files/${file}`;
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/html-code.png';
  }



  supprimerCours(idCours: number): void {
    const idEtudiant = localStorage.getItem('userId');

    if (idEtudiant) {
      this.coursService.supprimerCoursEtudiant(Number(idEtudiant), idCours).subscribe({
        next: (res) => {
          if (res.success) {
            this.cours = this.cours.filter(c => c.idCours !== idCours); // mise à jour de la vue
            console.log("✅ " + res.message);
            this.ngOnInit();
            const coursInscrits = this.cours.filter(c => c.idCours !== idCours).map(c => c.idCours);
            localStorage.setItem('inscrits', JSON.stringify(coursInscrits));
          } else {
            console.log("⚠ " + res.message);
          }
        },
        error: () => {
          console.log("❌ Erreur lors de la suppression.");
        }
      });
    } else {
      console.log("ID étudiant manquant.");
    }
  }
  consulterCours(idCour: number): void {
    this.router.navigate(['/cours', idCour]);
  }

}

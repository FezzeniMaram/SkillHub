import { Component, OnInit } from '@angular/core';
import { CoursService } from '../../services/cours/cours.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cours-tuteur',
  templateUrl: './cours-tuteur.component.html',
  styleUrls: ['./cours-tuteur.component.css']
})
export class CoursTuteurComponent implements OnInit {
  cours: any[] = [];
  idTuteur: number = 0;

  constructor(
    private coursService: CoursService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = localStorage.getItem('userId');
    this.idTuteur = id ? Number(id) : 0;

    if (this.idTuteur > 0) {
      this.coursService.getCoursPubliesParTuteur(this.idTuteur).subscribe({
        next: (res) => {
          if (res.success) {
            this.cours = res.data;
          } else {
            console.log("Aucun cours publié trouvé.");
          }
        },
        error: () => {
          console.log("Erreur lors du chargement des cours.");
        }
      });
    }
  }

  getImageUrl(filePath: string): string {
    return `http://localhost:8082/api/files/${filePath}`;
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/html-code.png';
  }

  voirDetailsCours(idCours: number): void {
    this.router.navigate(['/profil/cours', idCours]);
  }

  modifierCours(event: Event, idCours: number): void {
    event.stopPropagation();
    this.router.navigate(['/profil/modifierCours', idCours]);
  }

  supprimerCours(event: Event, idCours: number): void {
    event.stopPropagation();
    if (confirm("Êtes-vous sûr de vouloir supprimer ce cours ?")) {
      this.coursService.supprimerCours(idCours).subscribe({
        next: (res) => {
          if (res.success) {
            this.cours = this.cours.filter(c => c.idCour !== idCours);
            console.log("✅ Cours supprimé avec succès !");
          } else {
            console.log("❌ " + res.message);
          }
        },
        error: () => {
          console.log("❌ Erreur lors de la suppression du cours.");
        }
      });
    }
  }
}

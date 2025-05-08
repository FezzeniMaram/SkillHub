import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursService } from '../../services/cours/cours.service';

@Component({
  selector: 'app-modifier-cours',
  templateUrl: './modifier-cours.component.html',
  styleUrls: ['./modifier-cours.component.css']
})
export class ModifierCoursComponent implements OnInit {
  coursId!: number;
  cours = {
    titreCours: '',
    descriptionCours: ''
  };
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private coursService: CoursService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.coursId = Number(this.route.snapshot.paramMap.get('id'));

    this.coursService.getCoursById(this.coursId).subscribe({
      next: (res) => {
        if (res.success) {
          this.cours = {
            titreCours: res.data.titreCours,
            descriptionCours: res.data.descriptionCours
          };
        } else {
          alert("⚠ Cours introuvable !");
          this.router.navigate(['/profil/coursTuteur']);
        }
      },
      error: () => {
        alert("❌ Erreur lors du chargement du cours.");
        this.router.navigate(['/profil/coursTuteur']);
      }
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('titreCours', this.cours.titreCours);
    formData.append('descriptionCours', this.cours.descriptionCours);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.coursService.modifierCours(this.coursId, formData).subscribe({
      next: (res) => {
        if (res.success) {
          alert("✅ Cours modifié avec succès !");
          this.router.navigate(['/profil/coursTuteur']);
        } else {
          alert("❌ " + res.message);
        }
      },
      error: () => {
        alert("❌ Erreur lors de la modification du cours.");
      }
    });
  }
}

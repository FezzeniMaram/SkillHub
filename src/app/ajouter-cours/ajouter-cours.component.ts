import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoursService } from '../services/cours/cours.service';

@Component({
  selector: 'app-ajouter-cours',
  templateUrl: './ajouter-cours.component.html',
  styleUrls: ['./ajouter-cours.component.css']
})
export class AjouterCoursComponent {
  cours = {
    titreCours: '',
    descriptionCours: ''
  };

  selectedFile: File | null = null;

  constructor(
    private coursService: CoursService,
    private router: Router
  ) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    const idTuteur = localStorage.getItem('userId');

    if (!idTuteur) {
      alert("Utilisateur non connecté.");
      return;
    }

    if (!this.selectedFile) {
      alert("Veuillez sélectionner une image pour le cours.");
      return;
    }

    const formData = new FormData();
    formData.append('titreCours', this.cours.titreCours);
    formData.append('descriptionCours', this.cours.descriptionCours);
    formData.append('image', this.selectedFile);
    formData.append('tuteur_id', idTuteur);

    this.coursService.ajouterCours(formData).subscribe({
      next: () => {
        alert('✅ Cours ajouté avec succès !');
        this.router.navigate(['/coursTuteur']);
      },
      error: () => {
        alert('❌ Erreur lors de l’ajout du cours.');
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChapitreService } from '../../services/chapitre/chapitre.service';

@Component({
  selector: 'app-ajouter-chapitre',
  templateUrl: './ajouter-chapitre.component.html',
  styleUrls: ['./ajouter-chapitre.component.css']
})
export class AjouterChapitreComponent implements OnInit {
  coursId!: number;
  titreChapitre: string = '';
  contenuChapitre: string = '';
  selectedFile!: File;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chapitreService: ChapitreService
  ) {}

  ngOnInit(): void {
    this.coursId = Number(this.route.snapshot.paramMap.get('idCour'));
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  ajouterChapitre(): void {
    if (!this.titreChapitre || !this.contenuChapitre || !this.selectedFile) {
      console.log("Tous les champs sont requis.");
      return;
    }

    const formData = new FormData();
    formData.append("titreChapitre", this.titreChapitre);
    formData.append("contenuChapitre", this.contenuChapitre);
    formData.append("video", this.selectedFile);
    formData.append("id_cour", this.coursId.toString());

    this.chapitreService.addChapitreWithVideo(formData).subscribe({
      next: (res) => {
        if (res.success) {
          console.log("✅ Chapitre ajouté avec succès !");
          this.router.navigate(['profil/cours', this.coursId]);
        } else {
          console.log("❌ " + res.message);
        }
      },
      error: () => {
        console.log("❌ Une erreur est survenue.");
      }
    });
  }
}

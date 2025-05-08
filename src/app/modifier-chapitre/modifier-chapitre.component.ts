import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChapitreService } from '../services/chapitre/chapitre.service';

@Component({
  selector: 'app-modifier-chapitre',
  templateUrl: './modifier-chapitre.component.html',
  styleUrls: ['./modifier-chapitre.component.css']
})
export class ModifierChapitreComponent implements OnInit {

  chapitreId!: number;
  idCour!: number; // ✅ ID du cours stocké ici

  chapitre: any = {
    titreChapitre: '',
    typeChapitre: '',
    contenuChapitre: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chapitreService: ChapitreService
  ) {}

  ngOnInit(): void {
    this.chapitreId = Number(this.route.snapshot.paramMap.get('idChapitre'));
    this.chargerChapitre();
  }

  // ✅ Charger les données du chapitre
  chargerChapitre(): void {
    this.chapitreService.getChapitreById(this.chapitreId).subscribe({
      next: res => {
        if (res.success) {
          this.chapitre = res.data;

          // ✅ Stocker l’ID du cours ici
          if (res.data.cours && res.data.cours.idCour) {
            this.idCour = res.data.cours.idCour;
          }
        }
      },
      error: () => {
        alert('❌ Erreur lors du chargement du chapitre.');
      }
    });
  }

  // ✅ Modifier le chapitre
  modifierChapitre(): void {
    this.chapitreService.updateChapitre(this.chapitreId, this.chapitre).subscribe({
      next: res => {
        if (res.success) {
          alert("✅ Chapitre modifié avec succès !");
          this.router.navigate(['/cours', this.idCour]);
        } else {
          alert("❌ " + res.message);
        }
      },
      error: () => {
        alert("❌ Erreur lors de la mise à jour.");
      }
    });
  }
}

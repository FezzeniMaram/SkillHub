import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ChapitreService} from "../services/chapitre/chapitre.service";

@Component({
  selector: 'app-chapitre-details',
  templateUrl: './chapitre-details.component.html',
  styleUrls: ['./chapitre-details.component.css']
})
export class ChapitreDetailsComponent implements OnInit{


  chapitre: any = {};
  autresChapitres: any[] = [];
  chapitreId!: number;

  constructor(private route: ActivatedRoute, private chapitreService: ChapitreService) {}

  ngOnInit(): void {
    this.chapitreId = Number(this.route.snapshot.paramMap.get('idChapitre'));
    this.chargerChapitre();
  }

  chargerChapitre(): void {
    this.chapitreService.getChapitreById(this.chapitreId).subscribe({
      next: res => {
        if (res.success) {
          this.chapitre = res.data;
          this.chargerChapitresDuCours(res.data.cours.idCour);
        }
      },
      error: () => {
        alert("❌ Erreur lors du chargement du chapitre.");
      }
    });
  }

  chargerChapitresDuCours(coursId: number): void {
    this.chapitreService.getChapitresByCours(coursId).subscribe({
      next: res => {
        if (res.success) {
          this.autresChapitres = res.data;
        }
      }
    });
  }

  getVideoUrl(fileName: string | undefined): string {
    if (!fileName) return '';

    const encodedFileName = encodeURIComponent(fileName);
    return `http://localhost:8082/api/files/videos/${encodedFileName}`;
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/html-code.png'; // Image de remplacement en cas d'erreur
  }


}

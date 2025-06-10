import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursService } from '../services/cours/cours.service';
import { ConversationService } from '../services/chat/conersation.service';
import { AuthService } from '../services/authentification/auth.service';

@Component({
  selector: 'app-tuteur',
  templateUrl: './tuteur.component.html',
  styleUrls: ['./tuteur.component.css']
})
export class TuteurComponent implements OnInit {
  tuteurId!: number;
  nomTuteur: string = '';
  coursPublies: any[] = [];
  nombreCours: number = 0;
  idEtudiant: number = 0;
  genderTuteur: string = 'HOMME';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursService: CoursService,
    private conversationService: ConversationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.tuteurId = Number(paramId);
      this.idEtudiant = this.authService.getUserId();
      this.chargerCoursDuTuteur();
      this.chargerNombreCours();
    } else {
      console.error('ID du tuteur non trouvé dans l’URL.');
    }
  }

  chargerCoursDuTuteur(): void {
    this.coursService.getCoursPubliesParTuteur(this.tuteurId).subscribe({
      next: (res) => {
        if (res.success) {
          this.coursPublies = res.data;
          if (this.coursPublies.length > 0) {
            const cours = this.coursPublies[0];
            this.nomTuteur = cours.nomTuteur || 'Tuteur inconnu';
            this.genderTuteur = cours.genderTuteur || 'HOMME';
          }
        }
      },
      error: (err) => {
        console.error('Erreur chargement cours tuteur :', err);
      }
    });
  }

  chargerNombreCours(): void {
    this.coursService.getNombreCoursParTuteur(this.tuteurId).subscribe({
      next: (res: number) => {
        this.nombreCours = res;
      },
      error: (err) => {
        console.error('Erreur chargement nombre de cours :', err);
      }
    });
  }

  demarrerDiscussion(): void {
    this.conversationService.startConversation(this.idEtudiant, this.tuteurId).subscribe({
      next: (conversation: any) => {
        console.log('✅ Conversation créée :', conversation);
        this.router.navigate(['/profil/messagerie', conversation.id]);
      },
      error: (err) => {
        console.error('Erreur création conversation :', err);
      }
    });
  }

  voirDetailsCours(idCour: number): void {
    this.router.navigate(['/cours', idCour]);
  }

  getImageUrl(filePath: string): string {
    return `http://localhost:8082/api/files/${filePath}`;
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/html-code.png';
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursService } from '../services/cours/cours.service';
import { ChapitreService } from '../services/chapitre/chapitre.service';
import { AvisService } from '../services/avis/avis.service';

@Component({
  selector: 'app-cours-details',
  templateUrl: './cours-details.component.html',
  styleUrls: ['./cours-details.component.css']
})
export class CoursDetailsComponent implements OnInit {
  courseId!: number;
  course: any = {};
  chapitres: any[] = [];
  avisList: any[] = [];

  nouveauCommentaire: string = '';
  utilisateurEmail = localStorage.getItem('email');
  utilisateurRole = localStorage.getItem('role');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursService: CoursService,
    private chapitreService: ChapitreService,
    private avisService: AvisService
  ) {}

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('idCour'));
    this.loadCoursDetails();
    this.loadChapitres();
    this.loadAvis();

  }

  loadCoursDetails(): void {
    this.coursService.getCoursById(this.courseId).subscribe({
      next: res => {
        if (res.success) this.course = res.data;
        console.log("Détails du cours reçu :", this.course); // ✅ Ajout ici
      },
      error: err => {
        console.error('Erreur chargement cours:', err);
      }
    });


  }

  loadChapitres(): void {
    this.chapitreService.getChapitresByCours(this.courseId).subscribe({
      next: res => {
        if (res.success) this.chapitres = res.data;
      },
      error: err => {
        console.error('Erreur chargement chapitres:', err);
      }
    });
  }

  ajouterChapitre(): void {
    this.router.navigate(['/ajouterChapitre', this.courseId]);
  }

  modifierChapitre(idChapitre: number): void {
    this.router.navigate(['/modifierChapitre', idChapitre]);
  }

  supprimerChapitre(idChapitre: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce chapitre ?')) {
      this.chapitreService.deleteChapitre(idChapitre).subscribe({
        next: res => {
          if (res.success) this.loadChapitres();
        },
        error: err => {
          console.error('Erreur suppression chapitre:', err);
        }
      });
    }
  }

  getImageUrl(imagePath: string | undefined): string {
    if (!imagePath) {
      return '';
    }

    const encodedPath = encodeURIComponent(imagePath.replace('images/', ''));
    const fullUrl = `http://localhost:8082/api/files/images/${encodedPath}`;

    //console.log('🖼️ URL image générée :', fullUrl);

    return fullUrl;
  }


  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/html-code.png';
  }

  // 🔁 Commentaires / Avis
  loadAvis(): void {
    this.avisService.getAvisByCours(this.courseId).subscribe({
      next: res => {
        console.log('🔎 Données reçues du backend pour les avis :', res.data);

        if (res.success) {
          this.avisList = res.data.map((avis: any) => {
            const auteur = avis.auteur || 'Inconnu';
            const email = avis.emailAuteur || '';
            const type = avis.typeAuteur || 'Inconnu';

            // ➤ Debug console
           console.log(`💬 Avis: ID=${avis.idAvis}, Auteur=${auteur}, Email=${email}, Type=${type}`);

            return {
              ...avis,
              auteur,
              emailAuteur: email,
              typeAuteur: type
            };
          });

          // ➤ Vérification utilisateur connecté
          console.log('👤 Utilisateur connecté :', this.utilisateurEmail, '| Rôle:', this.utilisateurRole);
        }
      },
      error: err => {
        console.error('❌ Erreur lors du chargement des avis:', err);
      }
    });
  }



  ajouterCommentaire(): void {
    if (this.nouveauCommentaire.trim()) {
      this.avisService.addAvis(this.courseId, this.nouveauCommentaire).subscribe({
        next: () => {
          this.nouveauCommentaire = '';
          this.loadAvis();
        },
        error: () => {
          alert("❌ Erreur lors de l'ajout.");
        }
      });
    }
  }

  modifierAvis(avis: any): void {
    const modif = prompt('Modifier votre commentaire :', avis.commentaireAvis);
    if (modif !== null) {
      this.avisService.updateAvis(avis.idAvis, modif).subscribe({
        next: () => this.loadAvis()
      });
    }
  }

  supprimerAvis(id: number): void {
    if (confirm('Voulez-vous supprimer ce commentaire ?')) {
      this.avisService.deleteAvis(id).subscribe(() => {
        this.loadAvis();
      });
    }
  }

  // ✅ L’utilisateur peut modifier uniquement son propre commentaire
  peutModifierCommentaire(avis: any): boolean {
    return avis.emailAuteur === this.utilisateurEmail;
  }

  peutSupprimerCommentaire(avis: any): boolean {
    return (
      avis.emailAuteur === this.utilisateurEmail ||
      (this.utilisateurRole === 'TUTEUR' &&
        this.course.tuteur?.emailTuteur === this.utilisateurEmail)
    );
  }

  consulterChapitre(idChapitre: number): void {
    this.router.navigate(['/chapitre', idChapitre]);
  }

  peutGererChapitre(): boolean {
    return this.utilisateurRole === 'TUTEUR' || this.utilisateurRole === 'ADMIN';
  }

  voirProfilTuteur(idTuteur: number): void {
    console.log("ID tuteur:", idTuteur);
    this.router.navigate(['/tuteur', idTuteur]);
  }


}

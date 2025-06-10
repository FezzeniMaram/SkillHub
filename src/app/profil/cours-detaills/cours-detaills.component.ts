import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CoursService} from "../../services/cours/cours.service";
import {ChapitreService} from "../../services/chapitre/chapitre.service";
import {AvisService} from "../../services/avis/avis.service";

@Component({
  selector: 'app-cours-detaills',
  templateUrl: './cours-detaills.component.html',
  styleUrls: ['./cours-detaills.component.css']
})
export class CoursDetaillsComponent implements OnInit {
  courseId!: number;
  course: any = {};
  chapitres: any[] = [];
  avisList: any[] = [];  email = localStorage.getItem('email');
  avisEnCoursDeModification: any = null; // Pour suivre le commentaire modifié


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
    console.log("Détails du cours reçu :", this.course);
    console.log("Tuteur du cours :", this.course.tuteur);


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
    this.router.navigate(['/profil/ajouterChapitre', this.courseId]);
  }

  modifierChapitre(idChapitre: number): void {
    this.router.navigate(['/profil/modifierChapitre', idChapitre]);
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
          console.log("❌ Erreur lors de l'ajout.");
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

  peutModifierCommentaire(avis: any): boolean {
    return avis.emailAuteur === this.utilisateurEmail;
  }
  activerEditionAvis(avis: any){
    this.avisEnCoursDeModification =  avis;
  }
  enregistrerModificationAvis(): void {
    const modif = this.avisEnCoursDeModification.commentaireAvis.trim();
    if (!modif) return;

    this.avisService.updateAvis(this.avisEnCoursDeModification.idAvis, modif).subscribe({
      next: () => {
        this.avisEnCoursDeModification = null;
        this.loadAvis();
      },
      error: () => alert("❌ Erreur lors de la modification.")
    });
  }
  annulerModificationAvis(): void {
    this.avisEnCoursDeModification = null;
  }
  peutSupprimerCommentaire(avis: any): boolean {
    if (avis.emailAuteur === this.email) return true;

    if (
      this.utilisateurRole === 'TUTEUR' &&
      this.course &&
      this.course.emailTuteur === this.email
    ) return true;

    return false;
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

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



      this.utilisateurRole = 'TUTEUR';
      this.utilisateurEmail = 'tuteur@gmail.com';
      this.course = { emailTuteur: 'tuteur@gmail.com' };

      // Test avec un avis d'un étudiant
      const avisEtudiant = { emailAuteur: 'etudiant@gmail.com' };
      console.log('Test avis étudiant :', this.peutSupprimerCommentaire(avisEtudiant));

      // Test avec un avis du tuteur lui-même
      const avisTuteur = { emailAuteur: 'tuteur@gmail.com' };
      console.log('Test avis tuteur :', this.peutSupprimerCommentaire(avisTuteur));

      // Test avec un autre rôle / autre email
      this.utilisateurRole = 'ETUDIANT';
      this.utilisateurEmail = 'etudiant@gmail.com';
      console.log('Test étudiant sur son commentaire:', this.peutSupprimerCommentaire(avisEtudiant));
      console.log('Test étudiant sur commentaire autre:', this.peutSupprimerCommentaire(avisTuteur));




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
    console.log('Role utilisateur:', this.utilisateurRole);
    console.log('Email utilisateur:', this.utilisateurEmail);
    console.log('Email tuteur du cours:', this.course.emailTuteur);
    console.log('Email auteur commentaire:', avis.emailAuteur);

    if (this.utilisateurRole === 'TUTEUR' && this.course.emailTuteur === this.utilisateurEmail) {
      console.log('Tuteur peut supprimer');
      return true;
    }
    if (this.utilisateurRole === 'ETUDIANT' && avis.emailAuteur === this.utilisateurEmail) {
      console.log('Etudiant peut supprimer son commentaire');
      return true;
    }
    console.log('Pas de droit de suppression');
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

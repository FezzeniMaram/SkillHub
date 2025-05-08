import {Component, OnInit} from '@angular/core';
import {UpdatePersonne} from "../../services/update/update.service";

@Component({
  selector: 'app-profil-infos',
  templateUrl: './profil-infos.component.html',
  styleUrls: ['./profil-infos.component.css']
})
export class ProfilInfosComponent implements  OnInit{

  idUser!: number;
  userRole!: string;

  nom: string = '';
  email: string = '';
  dateNaissance!: string;


  ancienMotDePasseNom: string = '';
  nouveauNom: string = '';

  ancienMotDePasseMdp: string = '';
  nouveauMotDePasse: string = '';

  modifierNomMode: boolean = false;
  modifierMotDePasseMode: boolean = false;

  gender: string = 'HOMME';
  constructor(private updatePersonne: UpdatePersonne) {}

  ngOnInit(): void {
    this.idUser = Number(localStorage.getItem('userId'));
    this.gender = localStorage.getItem('gender') || 'HOMME';
    this.userRole = localStorage.getItem('role') || '';
    console.log("🔍 Rôle de l'utilisateur :", this.userRole);


    this.getInfosUser();
  }

  getInfosUser() {
    const role = localStorage.getItem('role'); // ✅ clé correcte

    this.updatePersonne.getUserById(this.idUser).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          // 🔄 Affichage dynamique selon le rôle
          if (role === 'TUTEUR') {
            this.nom = res.data.nomTuteur || '';
            this.email = res.data.emailTuteur || '';
            this.dateNaissance = res.data.dateNaissance || '';
            console.log( this.dateNaissance );
          } else if (role === 'ETUDIANT') {
            this.nom = res.data.nomEtudiant || '';
            this.email = res.data.emailEtudiant || '';
            this.dateNaissance = res.data.dateNaissance || '';
            console.log( this.dateNaissance );
          } else {
            console.warn('⚠️ Rôle inconnu :', role);
          }
        } else {
          alert(res.message || "Erreur lors du chargement du profil.");
        }
      },
      error: (err) => {
        console.error(err);
        alert(err.error?.message || "Erreur lors du chargement du profil.");
      }
    });
  }


  activerModifierNom() {
    this.modifierNomMode = true;
    this.modifierMotDePasseMode = false;
  }

  activerModifierMotDePasse() {
    this.modifierMotDePasseMode = true;
    this.modifierNomMode = false;
  }

  modifierNomAction() {
    if (!this.ancienMotDePasseNom || !this.nouveauNom) {
      alert('Veuillez remplir tous les champs pour modifier votre nom.');
      return;
    }

    const data = {
      ancienMotDePasse: this.ancienMotDePasseNom,
      nouveauNom: this.nouveauNom
    };

    this.updatePersonne.updateNom(this.idUser, data).subscribe({
      next: (res) => {
        if (res.success) {
          alert(res.message || "Nom modifié avec succès.");
          this.getInfosUser();
          this.modifierNomMode = false;
          this.ancienMotDePasseNom = '';
          this.nouveauNom = '';
        } else {
          alert(res.message || "Erreur lors de la modification du nom.");
        }
      },
      error: (err) => {
        alert(err.error?.message || "Erreur serveur.");
      }
    });
  }

  modifierMotDePasseAction() {
    if (!this.ancienMotDePasseMdp || !this.nouveauMotDePasse) {
      alert('Veuillez remplir tous les champs pour modifier votre mot de passe.');
      return;
    }

    const data = {
      ancienMotDePasse: this.ancienMotDePasseMdp,
      nouveauMotDePasse: this.nouveauMotDePasse
    };

    this.updatePersonne.updateMotDePasse(this.idUser, data).subscribe({
      next: (res) => {
        if (res.success) {
          alert(res.message || "Mot de passe modifié avec succès.");
          this.modifierMotDePasseMode = false;
          this.ancienMotDePasseMdp = '';
          this.nouveauMotDePasse = '';
        } else {
          alert(res.message || "Erreur lors de la modification du mot de passe.");
        }
      },
      error: (err) => {
        alert(err.error?.message || "Erreur serveur.");
      }
    });
  }
}

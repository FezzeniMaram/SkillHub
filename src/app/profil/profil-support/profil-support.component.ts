import { Component } from '@angular/core';

@Component({
  selector: 'app-support',
  templateUrl: './profil-support.component.html',
  styleUrls: ['./profil-support.component.css']
})
export class ProfilSupportComponent {
  faqs = [
    {
      question: "Comment s'inscrire à un cours ?",
      answer: "Cliquez sur le bouton 'Ajouter' sur la page des cours."
    },
    {
      question: "Comment contacter un tuteur ?",
      answer: "Utilisez la messagerie disponible dans votre espace profil."
    },
    {
      question: "Comment modifier mon mot de passe ?",
      answer: "Allez dans 'Profil', puis cliquez sur 'Modifier le mot de passe'."
    }
  ];

  form = {
    nom: '',
    email: '',
    message: ''
  };

  envoyerMessage() {
    console.log('📬 Message envoyé :', this.form);
    alert("Votre message a été envoyé !");
    this.form = { nom: '', email: '', message: '' };
  }
}

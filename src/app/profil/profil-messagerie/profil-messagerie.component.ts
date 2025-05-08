import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat/chat.service';
import { AuthService } from '../../services/authentification/auth.service';
import { ConversationService } from '../../services/chat/conersation.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profil-messagerie',
  templateUrl: './profil-messagerie.component.html',
  styleUrls: ['./profil-messagerie.component.css']
})
export class ProfilMessagerieComponent implements OnInit {
  conversations: any[] = [];
  selectedConversationId!: number;
  selectedConversation: any;
  messages: any[] = [];
  newMessage: string = '';
  role: string = '';
  userId: number = 0;
  isBlocked: boolean = false;
  showMenu: boolean = false;
  aBloqueLAutre: boolean = false;

  constructor(
    private chatService: ChatService,
    private conversationService: ConversationService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getUserRole();
    this.userId = this.authService.getUserId();

    // 🔄 Réagir à chaque changement d'ID dans l'URL
    this.route.paramMap.subscribe(params => {
      this.selectedConversationId = Number(params.get('id'));
      if (this.selectedConversationId) {
        this.loadConversationById(this.selectedConversationId);
      }
      this.loadConversations(); // recharge sidebar
    });
  }

  // ✅ Chargement d'une seule conversation (header, messages, blocage)
  loadConversationById(conversationId: number): void {
    this.conversationService.getConversationById(conversationId).subscribe({
      next: (conv: any) => {
        this.selectedConversation = {
          ...conv,
          interlocuteurNom: this.role === 'ETUDIANT' ? conv.tuteur?.nomTuteur : conv.etudiant?.nomEtudiant,
          interlocuteurGender: this.role === 'ETUDIANT' ? conv.tuteur?.genderTuteur : conv.etudiant?.genderEtudiant
        };
        this.loadMessages(conversationId);
        this.checkIfBlocked();
      },
      error: err => console.error("❌ Erreur chargement conversation :", err)
    });
  }

  // ✅ Sidebar
  loadConversations(): void {
    this.conversationService.getConversationsForUser(this.userId, this.role).subscribe({
      next: (data) => {
        this.conversations = data.map((conv: any) => {
          const interlocuteurNom = this.role === 'ETUDIANT' ? conv.tuteur?.nomTuteur : conv.etudiant?.nomEtudiant;
          const interlocuteurGender = this.role === 'ETUDIANT' ? conv.tuteur?.genderTuteur : conv.etudiant?.genderEtudiant;
          return {
            ...conv,
            interlocuteurNom,
            interlocuteurGender,
            lastMessage: conv.lastMessage || 'Aucun message'
          };
        });
      },
      error: (err) => console.error('❌ Erreur chargement conversations :', err)
    });
  }

  loadMessages(conversationId: number): void {
    this.chatService.getMessages(conversationId).subscribe({
      next: (msgs) => this.messages = msgs,
      error: (err) => console.error('❌ Erreur chargement messages :', err)
    });
  }

  sendMessage(): void {
    if (!this.newMessage.trim()) return;

    this.chatService.sendMessage(this.selectedConversationId, {
      messageChat: this.newMessage,
      expediteurRole: this.role
    }).subscribe({
      next: (msg) => {
        this.messages.push(msg);
        this.newMessage = '';
      },
      error: (err) => console.error('❌ Erreur envoi message :', err)
    });
  }

  selectConversation(convo: any): void {
    this.router.navigate(['/profil/messagerie', convo.id]);
  }

  goToProfile(): void {
    const interlocuteurId = this.role === 'ETUDIANT'
      ? this.selectedConversation?.tuteur?.idTuteur
      : this.selectedConversation?.etudiant?.idEtudiant;

    const type = this.role === 'ETUDIANT' ? 'tuteur' : 'etudiant';
    this.router.navigate([`/${type}/${interlocuteurId}`]);
  }

  masquerConversation(): void {
    this.conversationService.masquerConversation(this.selectedConversationId, this.role).subscribe({
      next: () => {
        this.selectedConversation = null;
        this.selectedConversationId = 0;
        this.loadConversations();
      },
      error: err => console.error('Erreur masquage', err)
    });
  }

  bloquerInterlocuteur(): void {
    this.conversationService.bloquerUtilisateur(this.selectedConversationId, this.role).subscribe({
      next: () => {
        this.isBlocked = true;
        this.loadConversations();
      },
      error: err => console.error('Erreur blocage', err)
    });
  }

  debloquerInterlocuteur(): void {
    this.conversationService.debloquerUtilisateur(this.selectedConversationId, this.role).subscribe({
      next: () => {
        this.aBloqueLAutre = false;
        this.checkIfBlocked();
      },
      error: err => console.error("Erreur lors du déblocage", err)
    });
  }

  checkIfBlocked(): void {
    this.conversationService.checkIfBlocked(this.selectedConversationId, this.role).subscribe({
      next: (res) => this.isBlocked = res.bloque,
      error: (err) => console.error('Erreur vérification blocage', err)
    });
  }

  aBloqueLInterlocuteur(): boolean {
    if (!this.selectedConversation || !this.role) return false;
    return this.role === 'ETUDIANT'
      ? this.selectedConversation.etudiantBloqueTuteur
      : this.selectedConversation.tuteurBloqueEtudiant;
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  closeMenu() {
    this.showMenu = false;
  }
}

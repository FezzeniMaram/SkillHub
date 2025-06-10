import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat/chat.service';
import { AuthService } from '../services/authentification/auth.service';
import { ConversationService } from '../services/chat/conersation.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  conversations: any[] = [];
  selectedConversationId!: number;
  selectedConversation: any;
  messages: any[] = [];
  newMessage: string = '';
  role: string = '';
  userId: number = 0;
  isBlocked: boolean = false;

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
    this.selectedConversationId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadConversations();
  }

  loadConversations(): void {
    this.conversationService.getConversationsForUser(this.userId, this.role).subscribe({
      next: (data) => {
        console.log("✅ Conversations récupérées :", data);

        this.conversations = data.map((conv: any) => {
          let interlocuteurNom = '';
          let interlocuteurGender = '';
          if (this.role === 'ETUDIANT') {
            interlocuteurNom = conv.tuteur?.nomTuteur;
            interlocuteurGender = conv.tuteur?.genderTuteur;
          } else {
            interlocuteurNom = conv.etudiant?.nomEtudiant;
            interlocuteurGender = conv.etudiant?.genderEtudiant;
          }

          return {
            ...conv,
            interlocuteurNom,
            interlocuteurGender,
            lastMessage: conv.lastMessage || 'Aucun message'
          };
        });

        this.selectedConversation = this.conversations.find(c => c.id === this.selectedConversationId);

        if (this.selectedConversationId) {
          this.loadMessages(this.selectedConversationId);
          this.checkIfBlocked();
        }
      },
      error: (err) => {
        console.error('❌ Erreur chargement conversations :', err);
      }
    });
  }

  loadMessages(conversationId: number): void {
    this.chatService.getMessages(conversationId).subscribe({
      next: (msgs) => {
        console.log("📨 Messages chargés :", msgs);
        this.messages = msgs;
      },
      error: (err) => {
        console.error('❌ Erreur chargement messages :', err);
      }
    });
  }

  sendMessage(): void {
    if (!this.newMessage.trim()) return;

    this.chatService.sendMessage(this.selectedConversationId, {
      messageChat: this.newMessage,
      expediteurRole: this.role
    }).subscribe({
      next: (msg) => {
        console.log("✉️ Message envoyé :", msg);
        this.messages.push(msg);
        this.newMessage = '';
      },
      error: (err) => {
        console.error('❌ Erreur envoi message :', err);
      }
    });
  }

  selectConversation(convo: any): void {
    window.location.href = `/conversation/${convo.id}`;
  }

  getGenderIcon(gender: string): string {
    return gender === 'FEMME' ? 'assets/images/woman.png' : 'assets/images/man.png';
  }

  goToProfile() {
    const interlocuteurId = this.role === 'ETUDIANT'
      ? this.selectedConversation?.tuteur?.idTuteur
      : this.selectedConversation?.etudiant?.idEtudiant;

    const type = this.role === 'ETUDIANT' ? 'tuteur' : 'etudiant';
    this.router.navigate([`/${type}/${interlocuteurId}`]);
  }

  masquerConversation() {
    this.conversationService.masquerConversation(this.selectedConversationId, this.role).subscribe({
      next: () => {
        this.selectedConversation = null;
        this.selectedConversationId = 0;
        this.loadConversations();
      },
      error: err => console.error('Erreur masquage', err)
    });
  }

  bloquerInterlocuteur() {
    this.conversationService.bloquerUtilisateur(this.selectedConversationId, this.role).subscribe({
      next: () => {
        this.isBlocked = true;
        this.loadConversations();
      },
      error: err => console.error('Erreur blocage', err)
    });
  }

  checkIfBlocked() {
    this.conversationService.checkIfBlocked(this.selectedConversationId, this.role).subscribe({
      next: (res) => {
        console.log("🧱 Résultat checkIfBlocked =>", res);
        this.isBlocked = res.bloque;
      },
      error: (err) => {
        console.error('Erreur vérification blocage', err);
      }
    });
  }

}

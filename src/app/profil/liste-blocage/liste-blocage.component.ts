import {Component, OnInit} from '@angular/core';
import {ConversationService} from "../../services/chat/conersation.service";

@Component({
  selector: 'app-liste-blocage',
  templateUrl: './liste-blocage.component.html',
  styleUrls: ['./liste-blocage.component.css']
})
export class ListeBlocageComponent implements OnInit {
  blockedConversations: any[] = [];
  userId: number = Number(localStorage.getItem('userId'));
  role: string = localStorage.getItem('role') || '';

  constructor(private conversationService: ConversationService) {}

  ngOnInit(): void {
    this.loadBlockedList();

  }

  loadBlockedList(): void {
    this.conversationService.getBlockedConversations(this.userId, this.role).subscribe({
      next: (data) => {
        this.blockedConversations = data;
      },
      error: (err) => {
        console.error('Erreur chargement blocages', err);
      }
    });
  }

  debloquer(conversationId: number): void {
    this.conversationService.debloquerUtilisateur(conversationId, this.role).subscribe({
      next: (res: any) => {
        this.blockedConversations = this.blockedConversations.filter(c => c.id !== conversationId);
      },
      error: (err) => {
        console.error('Erreur lors du déblocage', err);
      }
    });
  }



}

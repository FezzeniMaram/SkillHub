import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private baseUrl = 'http://localhost:8082/api/chat';

  constructor(private http: HttpClient) {}

  getMessages(conversationId: number): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.baseUrl}/conversation/${conversationId}?role=${this.getRole()}`, { headers });
  }

  sendMessage(conversationId: number, message: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/envoyer/${conversationId}`, message, { headers });
  }

  private getRole(): string {
    return localStorage.getItem('role') || '';
  }
}

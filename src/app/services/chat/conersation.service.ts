import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  private baseUrl = 'http://localhost:8082/api/conversation';

  constructor(private http: HttpClient) {}

  getConversationsForUser(userId: number, role: string): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.baseUrl}/user/${userId}?role=${role}`, { headers });
  }

  startConversation(etudiantId: number, tuteurId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/start?etudiantId=${etudiantId}&tuteurId=${tuteurId}`, {}, { headers });
  }




  masquerConversation(conversationId: number, role: string): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<void>(`${this.baseUrl}/${conversationId}/masquer?role=${role}`, {}, { headers });

  }


  getConversationById(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.baseUrl}/${id}`, { headers });
  }
  bloquerUtilisateur(conversationId: number, role: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.baseUrl}/${conversationId}/bloquer?role=${role}`, {}, { headers });
  }
  debloquerUtilisateur(conversationId: number, role: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(`${this.baseUrl}/debloquer/${conversationId}?role=${role}`, {}, { headers });
  }
  getBlockedConversations(userId: number, role: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/blocked?userId=${userId}&role=${role}`, { headers });
  }

  checkIfBlocked(conversationId: number, role: string): Observable<{ bloque: boolean }> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<{ bloque: boolean }>(
      `${this.baseUrl}/check-block/${conversationId}?role=${role}`,
      { headers }
    );
  }
}

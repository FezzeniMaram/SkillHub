import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdatePersonne {

  private baseUrlEtudiant = 'http://localhost:8082/api/etudiant';
  private baseUrlTuteur = 'http://localhost:8082/api/tuteur';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  private getRole(): string {
    return localStorage.getItem('role') || '';
  }

  private getBaseUrl(): string {
    const role = this.getRole();
    console.log('🌐 Base URL utilisée pour', role);
    return role === 'TUTEUR' ? this.baseUrlTuteur : this.baseUrlEtudiant;
  }

  getUserById(id: number): Observable<any> {
    const url = `${this.getBaseUrl()}/getById/${id}`;
    console.log("🔍 URL de récupération utilisateur :", url);
    return this.http.get(url, { headers: this.getAuthHeaders() });
  }

  updateNom(id: number, data: { ancienMotDePasse: string, nouveauNom: string }): Observable<any> {
    const url = `${this.getBaseUrl()}/updateNom/${id}`;
    return this.http.put(url, data, { headers: this.getAuthHeaders() });
  }

  updateMotDePasse(id: number, data: { ancienMotDePasse: string, nouveauMotDePasse: string }): Observable<any> {
    const url = `${this.getBaseUrl()}/updateMotDePasse/${id}`;
    return this.http.put(url, data, { headers: this.getAuthHeaders() });
  }
}

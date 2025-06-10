import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvisService {

  private baseUrl = 'http://localhost:8082/api/avis';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  addAvis(coursId: number, commentaire: string): Observable<any> {
    const body = {
      cours_id: coursId,
      commentaire_avis: commentaire
    };

    return this.http.post(`${this.baseUrl}/add`, body, { headers: this.getAuthHeaders() });
  }

  getAvisByCours(coursId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAvisByCours/${coursId}`, { headers: this.getAuthHeaders() });
  }

  updateAvis(idAvis: number, commentaire: string): Observable<any> {
    const body = { commentaireAvis: commentaire };
    return this.http.patch(`${this.baseUrl}/update/${idAvis}`, body, { headers: this.getAuthHeaders() });
  }

  deleteAvis(idAvis: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${idAvis}`, { headers: this.getAuthHeaders() });
  }
}

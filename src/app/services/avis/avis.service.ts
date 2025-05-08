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

  // ✅ Ajouter un avis (étudiant ou tuteur)
  addAvis(coursId: number, commentaire: string): Observable<any> {
    const body = {
      cours_id: coursId,
      commentaire_avis: commentaire
    };

    return this.http.post(`${this.baseUrl}/add`, body, { headers: this.getAuthHeaders() });
  }

  // ✅ Récupérer tous les avis d’un cours
  getAvisByCours(coursId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAvisByCours/${coursId}`, { headers: this.getAuthHeaders() });
  }

  // ✅ Modifier un avis (par son auteur)
  updateAvis(idAvis: number, commentaire: string): Observable<any> {
    const body = { commentaireAvis: commentaire };
    return this.http.patch(`${this.baseUrl}/update/${idAvis}`, body, { headers: this.getAuthHeaders() });
  }

  // ✅ Supprimer un avis (auteur, tuteur du cours, ou admin)
  deleteAvis(idAvis: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${idAvis}`, { headers: this.getAuthHeaders() });
  }
}

import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CoursService {

  private baseUrl = 'http://localhost:8082/api';

  constructor(private http: HttpClient) {}

  // ✅ Tous les cours (déjà existant)
  getAllCours(): Observable<any> {
    return this.http.get(`${this.baseUrl}/cours/getAllCours`);
  }

  // ✅ Cours inscrits d’un étudiant connecté
  getCoursEtudiant(idEtudiant: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/etudiant/getcours/${idEtudiant}`);
  }

  inscrireEtudiantAuCours(etudiantId: number, coursId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.baseUrl}/etudiant/${etudiantId}/inscrire/${coursId}`, {}, { headers });
  }

  supprimerCoursEtudiant(etudiantId: number, coursId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete(`${this.baseUrl}/etudiant/${etudiantId}/supprimerCours/${coursId}`, { headers });
  }

  getCoursPubliesParTuteur(idTuteur: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/tuteur/coursPublier/${idTuteur}`);
  }

  ajouterCours(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.baseUrl}/cours/add`, formData, { headers });
  }

  supprimerCours(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete(`${this.baseUrl}/cours/delete/${id}`, { headers });
  }

  modifierCours(id: number, formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch(`${this.baseUrl}/cours/update/${id}`, formData, { headers });
  }

  getCoursById(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/cours/getById/${id}`, { headers });
  }
}

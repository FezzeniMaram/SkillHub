import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  role: string;
  username: string; // 👈 ajoute ceci
  id: number;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8082/api';
  private loginUrl = 'http://localhost:8082/api/auth/login';
  private registerUrl = 'http://localhost:8082/api/auth/register';



  constructor(private http: HttpClient) {}
  // ✅ Connexion
  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.loginUrl, credentials);
  }

  // ✅ Inscription Étudiant
  registerEtudiant(data: any): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.registerUrl}/etudiant`, data);
  }

  // ✅ Inscription Tuteur
  registerTuteur(data: any): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.registerUrl}/tuteur`, data);
  }

  // ✅ Cours inscrits pour l'étudiant connecté
  getCoursEtudiant(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/etudiant/getcours/${id}`);
  }

  // ✅ Tu peux aussi ajouter ça plus tard :
  // getCoursTuteur(id: number): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.baseUrl}/tuteur/getcours/${id}`);
  // }

}


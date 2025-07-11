import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  role: string;
  username: string;
  id: number;
  gender: string;
  dateNaissance: string;
  email : string;
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


  getUserGender(): string {
    return localStorage.getItem('gender') || '';
  }

  constructor(private http: HttpClient) {}
  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.loginUrl, credentials);
  }

  registerEtudiant(data: any): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.registerUrl}/etudiant`, data);
  }

  registerTuteur(data: any): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.registerUrl}/tuteur`, data);
  }

  getCoursEtudiant(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/etudiant/getcours/${id}`);
  }


  getUserRole(): string {
    return localStorage.getItem('role') || '';
  }

  getUserId(): number {
    return Number(localStorage.getItem('userId'));
  }
  getemail(): String {
    return String(localStorage.getItem('email'));
  }

}


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChapitreService {

  private baseUrl = 'http://localhost:8082/api';

  constructor(private http: HttpClient) {}

  addChapitreWithVideo(formData: FormData) {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    return this.http.post<any>('http://localhost:8082/api/chapitre/add', formData, { headers });
  }

  deleteChapitre(chapitreId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.baseUrl}/chapitre/delete/${chapitreId}`, { headers });
  }

  updateChapitre(chapitreId: number, chapitre: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.patch(`${this.baseUrl}/chapitre/update/${chapitreId}`, chapitre, { headers });
  }

  getChapitresByCours(coursId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/chapitre/getChapitresByCours/${coursId}`, { headers });
  }

  getChapitreById(chapitreId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/chapitre/getById/${chapitreId}`, { headers });
  }


  getAllChapitres(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/chapitre/getAllChapitre`, { headers });
  }
}

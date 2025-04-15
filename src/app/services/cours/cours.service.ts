import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CoursService {

  private baseUrl = 'http://localhost:8082/api/cours';

  constructor(private http: HttpClient) {}

  getAllCours(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllCours`);
  }
}

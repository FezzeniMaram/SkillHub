import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private apiUrl = 'http://localhost:8082/api/video'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {}

  addVideo(videoData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, videoData);
  }
}

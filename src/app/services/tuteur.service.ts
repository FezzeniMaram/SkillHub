import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment} from "../../environments/environments";
import {Tuteur} from "../model/tuteur";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TuteurService {
  private apiUrl = `${environment.apiUrl}/tuteur`;


  constructor(private http: HttpClient) {}

  inscrireTuteur(tuteur: Tuteur): Observable<any> {
    const apiUrl = 'http://localhost:8082/api/tuteur/inscrire';

    return this.http.post<any>(apiUrl, tuteur);  }
}

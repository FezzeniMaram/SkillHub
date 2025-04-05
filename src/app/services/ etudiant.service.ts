import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment} from "../../environments/environments";
import {Observable} from "rxjs";
import {Etudiant} from "../model/etudiant";


@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  private apiUrl = `${environment.apiUrl}/etudiant`;

  constructor(private http: HttpClient) {}

  inscrireEtudiant(etudiant: Etudiant): Observable<any> {
    const apiUrl = 'http://localhost:8082/api/etudiant/inscrire';
    return this.http.post<any>(apiUrl, etudiant);
  }

}

import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit{
  isConnected: boolean = false;

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.isConnected = !!token;
  }

}

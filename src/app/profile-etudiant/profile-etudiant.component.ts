import {Component, OnInit} from '@angular/core';
import {NotifierService} from "../notifier.service";

@Component({
  selector: 'app-profile-etudiant',
  templateUrl: './profile-etudiant.component.html',
  styleUrls: ['./profile-etudiant.component.css']
})
export class ProfileEtudiantComponent implements OnInit {
  constructor(private notifierService: NotifierService) {
  }

  ngOnInit(): void {

    this.notifierService.showNotication("test", "ok");

  }
}

import { Component, OnInit } from '@angular/core';
import {CoursService} from "../services/cours/cours.service";


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  coursList: any[] = [];

  constructor(private coursService: CoursService) {}

  ngOnInit(): void {
    this.coursService.getAllCours().subscribe(res => {
      if (res.success) {
        this.coursList = res.data;
      }
    });
  }

  getImageUrl(file: string): string {
    return `http://localhost:8082/api/files/images/${file}`;
  }
  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/html-code.png'; // 🔁 image locale
  }
}

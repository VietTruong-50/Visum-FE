import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ApiResponseListCategory,
  CategoryControllerService,
} from 'src/app/api-svc';

@Component({
  selector: 'app-genre-page',
  templateUrl: './genre-page.component.html',
  styleUrls: ['./genre-page.component.scss'],
})
export class GenrePageComponent implements OnInit {
  categoryData: any;

  constructor(
    private router: Router,
    private categoryController: CategoryControllerService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.categoryController
      .getAllCategory()
      .subscribe((result: ApiResponseListCategory) => {
        this.categoryData = result.result;
        console.log(this.categoryData);
      });
  }

  goToSongByGenre(category: string) {
    this.router.navigate(['/genres', category]);
  }
}

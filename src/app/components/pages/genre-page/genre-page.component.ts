import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponseGenreDTO, GenreControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-genre-page',
  templateUrl: './genre-page.component.html',
  styleUrls: ['./genre-page.component.scss'],
})
export class GenrePageComponent implements OnInit {
  genreData: any;

  constructor(
    private router: Router,
    private genreController: GenreControllerService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.genreController.getGenre().subscribe((result: ApiResponseGenreDTO) => {
      if (result.errorCode == null) {
        this.genreData = result.result;
        console.log(this.genreData);
      } else {
        alert('Error');
      }
    });
  }

  goToSongByGenre(category: string) {
    this.router.navigate(['/genres', category]);
  }
}

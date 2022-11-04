import { Component, OnInit } from '@angular/core';
import { ApiResponseUserDTO, UserControllerService } from 'src/app/api-svc';
import SwiperCore from 'swiper';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {

  status: boolean = true;

  constructor() {}

  ngOnInit(): void {
   
  }
  
  toggle(){
    this.status = !this.status;
  }
}

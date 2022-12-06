import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {

  status: boolean = true;
  buttonText: string = 'Close';

  constructor() {}

  ngOnInit(): void {
   
  }
  
  toggle(){
    this.buttonText = this.status ? '->' : 'Close';
    this.status = !this.status;
  }
}

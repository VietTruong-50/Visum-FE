import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-gaps',
    templateUrl: './gaps.component.html',
    styleUrls: ['./gaps.component.scss']
})
export class GapsComponent implements OnInit {

    @Input() width: number = 1;
    @Input() height: number = 1;


    constructor() {
    }

    ngOnInit(): void {
    }


}

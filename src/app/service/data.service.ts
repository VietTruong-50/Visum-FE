import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { SongDTO } from "../api-svc";

@Injectable({
    providedIn: "root"
})
export class DataService{
    data: Subject<SongDTO> ;

    constructor(){
        this.data = new Subject();
    }

    add(song: SongDTO){
        this.data?.next(song);
    }

    get(){
        return this.data;
    }
}
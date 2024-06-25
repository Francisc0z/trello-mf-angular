import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardServiceService {

  constructor() { }

  cardMoveTask(taskName:string){
    console.log(taskName);
    
  }
}

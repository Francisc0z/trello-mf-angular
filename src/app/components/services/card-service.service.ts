import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardServiceService {
  private messageSource = new BehaviorSubject<any>('default message');
  currentMessage = this.messageSource.asObservable();
  constructor() { }
  changeMessage(message: string, name: string) {
    console.log(message);
    const item = {task: message, listName: name}
    this.messageSource.next(item);
  }
  cardAddTask(taskName:string){
    console.log(taskName);
    
  }
}

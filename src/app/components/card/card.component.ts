import { Component, Input } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})

export class CardComponent {
  @Input() cardName: string='';
  tasksList:string[]=[]
  addingTaskStart:boolean=false;
  name:string='';
  public addTask(taksName:string):void{
    this.addingTaskStart=true;
  }

  public cancelAction():void{
    this.addingTaskStart=false;

  }
  
  public addTaskActionEnd(): void{
    this.tasksList.push(this.name);
    this.name='';
    this.addingTaskStart=false;
  }
  drop(event:any){
    console.log(event);
    
  }

  dragStart(event:any){
    console.log(event);
    
  }

  dragOver(event:any){    
  }
}

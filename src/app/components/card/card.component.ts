import { Component, Inject, Input, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import {FormsModule, NgForm} from '@angular/forms';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CardServiceService } from '../services/card-service.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [FormsModule, DragDropModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})

export class CardComponent implements OnInit{
  constructor(private CardService: CardServiceService){}
  @Input() cardName: string='';

  listSaved: any;
  tasksList:any;
  actualTaskList: string[] = []
  columnList:string[]=[];
  addingTaskStart:boolean=false;
  name:string='';
  ngOnInit(): void {
    this.listSaved = JSON.parse(localStorage.getItem('cards') || '').cards;  
    console.log(this.listSaved);    

    this.tasksList = JSON.parse(localStorage.getItem('cardsTasks') || '').cards;  
    this.actualTaskList = this.tasksList[this.cardName];
  }
  public addTask(taksName:string):void{
    this.addingTaskStart=true;
  }

  public cancelAction():void{
    this.addingTaskStart=false;

  }


  
  public addTaskActionEnd(): void{
    this.actualTaskList.push(this.name);
    this.name='';
    this.addingTaskStart=false;
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log("ejecutado", event);
    
    this.CardService.cardMoveTask(this.actualTaskList[event.currentIndex])
    console.log("Índice previo:", event.previousIndex);
    console.log("Índice actual:", event.currentIndex);
    console.log(event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex);
    
  }
}

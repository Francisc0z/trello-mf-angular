import { Component, Inject, Input, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import {FormsModule, NgForm} from '@angular/forms';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CardServiceService } from '../services/card-service.service';
import { AddTaskComponent } from './add-task/add-task.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [FormsModule, DragDropModule, CommonModule, AddTaskComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})

export class CardComponent implements OnInit{
  constructor(private cardService: CardServiceService){}
  listSaved: any;
  tasksList:any;
  actualTaskList: string[] = []
  columnList:string[]=[];
  addingTaskStart:boolean=false;
  name:string='';
  message:any;
  ngOnInit(): void {
    this.listSaved = JSON.parse(localStorage.getItem('cards') || '').cards;      
    this.tasksList =  JSON.parse(localStorage.getItem('cardsTasks') || '').cards;
    
    this.cardService.currentMessage.subscribe(message => {
      this.message = message;
      this.addTaskActionEnd(message.task, message.listName);
      
    });

    
  }

  public addTaskActionEnd(task:string, listName:string): void{
    console.log(listName, task);
    
    this.tasksList[listName].push(task);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}

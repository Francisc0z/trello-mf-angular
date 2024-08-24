import { AfterViewChecked, ChangeDetectorRef, Component, Inject, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import {FormsModule, NgForm} from '@angular/forms';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CardServiceService } from '../services/card-service.service';
import { AddTaskComponent } from './add-task/add-task.component';
import { ListServiceService } from '../services/list-service.service';
import { CdkDropList } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [FormsModule, DragDropModule, CommonModule, AddTaskComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})

export class CardComponent implements OnInit, AfterViewChecked{
  @ViewChildren(CdkDropList) dropLists!: QueryList<CdkDropList>;
  
  constructor(private cardService: CardServiceService, private listService:ListServiceService, private cdRef: ChangeDetectorRef){{}}
  listSaved: any = [];
  tasksList:any = [];
  actualTaskList: string[] = []
  columnList:string[]=[];
  addingTaskStart:boolean=false;
  name:string='';
  message:any;
  prevent: boolean = false;
  adding: boolean = false;
  listName: string = "";

  ngAfterViewInit() {
    console.log('cdkDropListData:', this.dropLists);
  }
  ngAfterViewChecked() {

    this.cdRef.detectChanges();
    console.log("hola");
    
 }
  ngOnInit(): void {
    let tareasAux:any = [];
    this.listService.read().subscribe(
      (data:any) => {
        
        this.listSaved = data.data;
        this.listSaved.forEach((e:any) => {
          e.showOptions = false;
        });
      },
      (error) => {
        console.error('Error al hacer la solicitud:', error);
      }
    );
    this.cardService.read().subscribe(
      (data:any) => {        
        this.listSaved.forEach((a:any)=>{
          data.data.forEach((e:any) => {
            if(a.id == e.list_id){
              tareasAux.push(e)
            }
          });
          this.tasksList.push({listName: a.name, id: a.id, tasks: tareasAux });  
          tareasAux = [];        
        })
        console.log(this.tasksList);
        
      },
      (error) => {
        console.error('Error al hacer la solicitud:', error);
      }

    );
  
    
    this.cardService.currentMessage.subscribe(message => {
      
      this.message = message;
      console.log(this.prevent);
      
      if(this.prevent){
        this.addTaskActionEnd(message.task, message.listId);
        this.prevent = false;
      }else{
        this.prevent = true;
      }
      
    });

    
  }

  public addTaskActionEnd(task:string, listName:string): void{
    console.log("que hace");
    
    this.cardService.currentMessage.subscribe(message => {
      window.location.href =  '/table';
    })

  }

  drop(event: CdkDragDrop<string[]>) {
    console.log("se ejecuta");
    
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

  delete(cardId:string){
    this.cardService.delete(cardId).subscribe(
      (data:any) => { window.location.href =  '/table'; })
  }
  addingListAction(){ 
    this.adding = true;
  }

  cancelListAction(){
    this.adding = false;
    this.listName = "";
  }

  addListActionEnd(){
    this.addList(this.listName);
    this.adding = true;
    this.listName = "";
  }

  addList(listName:string){
    this.listService.add(listName).subscribe(
      (data:any) => {
        window.location.href =  '/table';
      },
      (error) => {
        console.error('Error al hacer la solicitud:', error);
      }
    );
  }

  deleteList(listId: string){
    console.log(listId);
    this.listService.delete(listId).subscribe(
      (data:any) => {
        window.location.href =  '/table';      
      },
      (error) => {
        console.error('Error al hacer la solicitud:', error);
      }
    );
  }
}

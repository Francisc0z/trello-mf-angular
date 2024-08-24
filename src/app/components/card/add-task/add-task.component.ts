import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardServiceService } from '../../services/card-service.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  constructor(private cardService:CardServiceService){

  }
  @Input() cardId: string='';

  addingTaskStart:boolean = false;
  name:string='';

  public addTask(taksName:string):void{
    this.addingTaskStart=true;
  }

  public cancelAction():void{
    this.addingTaskStart=false;
  }

  addTaskActionEnd() {        
    let taskAdded:any = {name:this.name, list_id:this.cardId}
    this.cardService.create(taskAdded).subscribe((data:any) => { 
      this.cardService.changeMessage(this.name, this.cardId);
      window.location.href =  '/table';
    }) 
    this.name='';
    this.addingTaskStart=false;
  }
}

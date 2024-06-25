import { Component, Inject, OnInit } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  columnList:string[]=['Lista de tareas', 'En proceso', 'Hecho'];

  ngOnInit(): void {
    const cardsTasks = {
      "cards": {
        "Lista de tareas": ["1", "2"],
        "En proceso": ["3", "4"],
        "Hecho": ["5", "22"]
      }
    }  
    const cards = {
      "cards": [
        "Lista de tareas",
        "En proceso",
        "Hecho"
      ]
    }  
    
    localStorage.setItem('cards', JSON.stringify(cards));
    localStorage.setItem('cardsTasks', JSON.stringify(cardsTasks));

  }
  addColumn():void{
    
  }
}

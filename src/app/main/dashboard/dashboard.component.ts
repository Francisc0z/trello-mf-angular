import { Component, Inject, OnInit } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule, DOCUMENT } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ListServiceService } from '../../components/services/list-service.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardComponent, SidebarComponent, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  constructor(private listService : ListServiceService){

  }
  columnList:string[]=['Lista de tareas', 'En proceso', 'Hecho'];

  cards: string[] = [];
  ngOnInit(): void {
    const cardsTasks = {
      "cards": {
        "Lista de tareas": ["1", "2"],
        "En proceso": ["3", "4"],
        "Hecho": ["5", "22"]
      }
    }  
    localStorage.setItem('cardsTasks', JSON.stringify(cardsTasks));
    
  }
  addColumn():void{
    
  }
}

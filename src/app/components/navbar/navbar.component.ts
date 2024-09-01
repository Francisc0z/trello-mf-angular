import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  navSublist: boolean = false;
  navItems: String[] = ["Espacios de trabajo", "Reciente", "Marcado", "Plantillas"];

  logout(){
    console.log("yea");
    
    localStorage.removeItem('token');
    window.location.href =  '/login';
  }
}

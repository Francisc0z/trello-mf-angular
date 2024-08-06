import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'table',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, NavbarComponent],
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  title = 'table';
}

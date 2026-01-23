import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';



import { SidebarComponent } from './ui/panel/panel';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIconModule, SidebarComponent  , MatSidenavModule,],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {


}





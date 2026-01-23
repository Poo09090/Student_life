import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatListModule, MatIconModule],
  templateUrl: './panel.html',
  styleUrl: './panel.css'
})
export class SidebarComponent {

  readonly navItems = signal([
    { path: '/dashboard', label: 'Бюджет', icon: 'dashboard' },
    { path: '/goals', label: 'Цели', icon: 'flag' },
    { path: '/history', label: 'История операций', icon: 'receipt_long' }
  ]);
}
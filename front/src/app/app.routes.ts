import { Routes } from '@angular/router';

export const routes: Routes = [

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  
  { 
    path: 'dashboard', 
    title: 'Бюджет - Главная',
    loadComponent: () => import('./pages/main-page/main-page').then(m => m.MainPage) 
  },
  { 
    path: 'history', 
    title: 'История операций',
    loadComponent: () => import('./pages/history/history').then(m => m.HistoryComponent) 
  }
];
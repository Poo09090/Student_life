import { Component, inject, computed } from '@angular/core';
import { DataBaseSeriese } from '../../servieses/data-base-seriese';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { BudgetCategory, Transaction } from '../../models/database_models';
@Component({
  selector: 'app-history',
  standalone: true,
  imports: [MatIconModule, MatListModule, DatePipe, ],
  templateUrl: './history.html',
  styleUrl: './history.css'
})
export class HistoryComponent {
  dataService = inject(DataBaseSeriese);

  // получаем транзакции только для выбранного месяца
  readonly transactions = computed(() => this.dataService.currentMonthTransactions());
  readonly categories = computed(() => this.dataService.CATEGORIES())
  // группируем транзакции по дням 
  readonly groupedTransactions = computed(() => {
    const groups: { [key: string]: any[] } = {};
    

this.transactions().forEach((t: Transaction) => {
  const dateKey = t.date.toISOString().split('T')[0];
  if (!groups[dateKey]) groups[dateKey] = [];
  groups[dateKey].push(t);
});

    return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]));
  });

  get_transactions_category(id: number) : BudgetCategory {
    return this.categories().filter(a => a.id == id)[0]
  }

}
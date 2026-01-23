import { computed, Injectable, signal } from '@angular/core';
import { BudgetCategory, Transaction } from '../models/database_models';

@Injectable({
  providedIn: 'root',
})
export class DataBaseSeriese {
  
  // состояние текущего месяца
  readonly selectedMonth = signal<string>('2025-11');

  private readonly MONTH_NAMES = [
    'ЯНВАРЬ', 'ФЕВРАЛЬ', 'МАРТ', 'АПРЕЛЬ', 'МАЙ', 'ИЮНЬ',
    'ИЮЛЬ', 'АВГУСТ', 'СЕНТЯБРЬ', 'ОКТЯБРЬ', 'НОЯБРЬ', 'ДЕКАБРЬ'
  ];

  // название бюджета 
  readonly currentBudgetName = computed(() => {
    const [year, month] = this.selectedMonth().split('-').map(Number);

    return `БЮДЖЕТ НА ${this.MONTH_NAMES[month - 1]}`;
  });

  // список категорий 
  CATEGORIES = signal<BudgetCategory[]>([
    // расходы Алексея
    { id: 1, title: 'ОБЩЕЖИТИЕ', icon: 'home', planned: 2500, type: 'expense', budgetId: '2025-11' },
    { id: 2, title: 'ЕДА', icon: 'restaurant', planned: 12000, type: 'expense', budgetId: '2025-11' },
    { id: 3, title: 'ПРОЕЗД', icon: 'directions_bus', planned: 1500, type: 'expense', budgetId: '2025-11' },
    { id: 4, title: 'СИГАРЕТЫ', icon: 'smoke_free', planned: 3000, type: 'expense', budgetId: '2025-11' },
    { id: 5, title: 'РАЗВЛЕЧЕНИЯ', icon: 'sports_esports', planned: 8000, type: 'expense', budgetId: '2025-11' },
    { id: 6, title: 'УЧЕБА', icon: 'school', planned: 1000, type: 'expense', budgetId: '2025-11' },

    // доходы Алексея 
    { id: 7, title: 'СТИПЕНДИЯ', icon: 'account_balance_wallet', planned: 4000, type: 'income', budgetId: '2025-11' },
    { id: 8, title: 'ПОДРАБОТКА', icon: 'payments', planned: 28000, type: 'income', budgetId: '2025-11' },
  ]);

  TRANSACTIONS = signal<Transaction[]>([
    // ноябрьские транзакции
    { id: 1, categoryId: 7, title: 'Стипендия Алексея', amount: 4000, date: new Date('2025-11-01') },
    { id: 2, categoryId: 8, title: 'Зарплата (подработка)', amount: 28000, date: new Date('2025-11-15') },
    { id: 3, categoryId: 1, title: 'Оплата общаги', amount: 2500, date: new Date('2025-11-01') },
    { id: 4, categoryId: 2, title: 'Продукты на месяц', amount: 12000, date: new Date('2025-11-05') },
    { id: 5, categoryId: 3, title: 'Проездной', amount: 1500, date: new Date('2025-11-01') },
    { id: 6, categoryId: 4, title: 'Табак', amount: 3000, date: new Date('2025-11-10') },
    { id: 7, categoryId: 5, title: 'Кино и посиделки', amount: 8000, date: new Date('2025-11-20') },
    { id: 8, categoryId: 6, title: 'Тетради и ручки', amount: 1000, date: new Date('2025-11-12') }
  ]);

  // фильтрованные транзакции за месяц
  readonly currentMonthTransactions = computed(() => {
    const monthId = this.selectedMonth();
    return this.TRANSACTIONS().filter(t => {
      const tMonth = t.date.toISOString().slice(0, 7);
      return tMonth === monthId;
    });
  });

  // метод смены месяца для стрелочек на главной 
  changeMonth(direction: 'next' | 'prev') {
    const [year, month] = this.selectedMonth().split('-').map(Number);
    const date = new Date(year, month - 1 + (direction === 'next' ? 1 : -1), 1);
    const newMonth = (date.getMonth() + 1).toString().padStart(2, '0');
    this.selectedMonth.set(`${date.getFullYear()}-${newMonth}`);
  }

  // сумма доходов только за выбранный месяц 
  totalIncome = computed(() => {
    const incomeIds = this.CATEGORIES()
      .filter(c => c.type === 'income' && c.budgetId === this.selectedMonth())
      .map(c => c.id);
      
    return this.currentMonthTransactions() 
      .filter(t => incomeIds.includes(t.categoryId))
      .reduce((sum, t) => sum + t.amount, 0);
  });

  // сумма расходов только за выбранный месяц 
  totalExpenses = computed(() => {
    const expenseIds = this.CATEGORIES()
      .filter(c => c.type === 'expense' && c.budgetId === this.selectedMonth())
      .map(c => c.id);
      
    return this.currentMonthTransactions() 
      .filter(t => expenseIds.includes(t.categoryId))
      .reduce((sum, t) => sum + t.amount, 0);
  });

  totalBalance = computed(() => this.totalIncome() - this.totalExpenses());

  // --- методы доступа ---

  get_category() {
    return this.CATEGORIES.asReadonly();
  }

  get_transactions() {
    return this.TRANSACTIONS.asReadonly();
  }

  // --- методы добавления ---------------

  add_category(category: Omit<BudgetCategory, 'id'>) {
    this.CATEGORIES.update(all => {
      const newId = all.length > 0 ? Math.max(...all.map(c => c.id)) + 1 : 1;
      return [...all, { ...category, id: newId }];
    });
  }

  add_transaction(transaction: Omit<Transaction, 'id'>) {
    this.TRANSACTIONS.update(all => {
      const newId = all.length > 0 ? Math.max(...all.map(t => t.id)) + 1 : 1;
      return [...all, { ...transaction, id: newId }];
    });
  }
}
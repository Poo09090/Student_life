import { Component, computed, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'; // Импортируем модуль
import { BudgetCategory, Transaction } from '../../models/database_models';

@Component({
  selector: 'app-cards',
  imports: [ 
    MatIconModule
  ],
  templateUrl: './cards.html',
  styleUrl: './cards.css',
  
})
export class Cards {
   card_info = input<BudgetCategory>();
   transaction_info = input<Transaction[]>();
item: any;
    summ_of_transactions_category = computed(() => {
      const categoryId = this.card_info()?.id
      const categoryTransaction = this.transaction_info()
      var sum = 0 
      categoryTransaction?.forEach( a => {
        if (categoryId == a.categoryId)
        sum+=a.amount

      });
      return sum
    })
        remainder = computed(() => {
        return (this.card_info()?.planned ?? 0) - this.summ_of_transactions_category()
    })
}

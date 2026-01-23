import { Component, computed, inject, signal } from '@angular/core';
import { DataBaseSeriese } from '../../servieses/data-base-seriese';
import { Cards } from "../../ui/cards/cards";
import { Buttons } from "../../ui/buttons/buttons";
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryDialog } from '../../moda/models/models';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-main-page',
  imports: [Cards, Buttons, MatIcon],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {
  page_category = signal <Category> ("expense")
  data = inject(DataBaseSeriese);
  dialog = inject(MatDialog);

cards = computed(() => {
  const currentMonth = this.data.selectedMonth(); 
  const currentType = this.page_category();     
  console.log(currentMonth)
  return this.data.get_category()().filter(x => {
    return x.type === currentType && x.budgetId === currentMonth
  }
    
  );
});
  
  text = computed(()=>{
    
    if (this.page_category() == "expense"){
      return "Добавить расход"
    }
    else if (this.page_category() == "income"){
      return "Добавить доход"
    }
    return "ssf"
  })
dataService = inject(DataBaseSeriese)
openAddDialog() {
    // текущий тип из сигнала
    const currentType = this.page_category();

    const dialogRef = this.dialog.open(AddCategoryDialog, {
      width: '400px',
      data: { 
        title: '', 
        planned: 0, 
        icon: 'help_outline', 
        type: currentType 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.title) {

        this.data.add_category(result);
        
    
        // отдает старую ссылку на массив
      }
    });
  }
}

export type Category =  "expense"|"income"


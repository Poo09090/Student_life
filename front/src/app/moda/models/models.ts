import { Component, inject, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DataBaseSeriese } from '../../servieses/data-base-seriese';
@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './models.html',
  styles: [`
    .dialog-form { display: flex; flex-direction: column; gap: 10px; min-width: 300px; }
    .full-width { width: 100%; }
    .icon-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; cursor: pointer; }
    .icon-grid mat-icon { font-size: 24px; padding: 5px; border-radius: 4px; border: 1px solid transparent; }
    .icon-grid mat-icon:hover { background: #f0f0f0; }
    .selected { color: #3f51b5; border: 1px solid #3f51b5 !important; background: #e8eaf6; }
  `],
  imports: [CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule ]
})
export class AddCategoryDialog {
  // iconList
  iconList = ['shopping_cart', 'fastfood', 'local_gas_station', 'fitness_center', 'medical_services', 'celebration', 'pets', 'build'];
 private dataService = inject(DataBaseSeriese);
  constructor(
    public dialogRef: MatDialogRef<AddCategoryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
    
  ) {if (!this.data.budgetId) {
      this.data.budgetId = this.dataService.selectedMonth();}}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
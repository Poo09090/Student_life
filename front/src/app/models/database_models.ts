export interface Transaction {
  id: number;
  categoryId: number; 
  title: string;      
  amount: number;     
  date: Date;         
}

export interface BudgetCategory {
id: number;
  title: string;
  icon: string;
  planned: number;
  type: 'expense' | 'income';
  budgetId: string; 

}

export interface Budget {
    id: number;
    name: string;
    user_id: number;
}

export interface User {
    id: number;
    name: string;
    
}
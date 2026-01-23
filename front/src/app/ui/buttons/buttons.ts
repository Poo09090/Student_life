import { Component, input } from '@angular/core';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-buttons',
  imports: [MatIcon],
  templateUrl: './buttons.html',
  styleUrl: './buttons.css',
})
export class Buttons {
  text = input.required<string>()
  
}

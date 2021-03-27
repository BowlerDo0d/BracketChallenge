import { Component, Input } from '@angular/core';

@Component({
  selector: 'bracket-card',
  templateUrl: './bracket-card.component.html'
})
export class BracketCardComponent {
  @Input() bracket: any; // Make Bracket
  @Input() rank: number;
}

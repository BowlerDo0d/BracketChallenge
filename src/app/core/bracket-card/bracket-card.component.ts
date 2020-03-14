import { Component, Input } from '@angular/core';

@Component({
  selector: 'bracket-card',
  templateUrl: './bracket-card.component.html',
  styleUrls: ['./bracket-card.component.scss']
})
export class BracketCardComponent {
  @Input() bracket: any; // Make Bracket
  @Input() position: number;
}

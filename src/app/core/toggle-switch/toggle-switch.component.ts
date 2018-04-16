import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.scss']
})
export class ToggleSwitchComponent {
  @Input() isChecked: boolean;
  @Input() title: string;
  @Output() onToggle = new EventEmitter<boolean>();

  constructor() { }

  toggle() {
    this.isChecked = !this.isChecked;
    this.onToggle.emit(this.isChecked);
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  menuItems = [{
    label: 'Team Manager',
    link: 'team-manager'
  }, {
    label: 'Second',
    link: null
  }, {
    label: 'Third',
    link: null
  }];
  activeLink = this.menuItems[0];
}

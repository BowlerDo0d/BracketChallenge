import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  activeLink: IMenuItem;
  menuItems: IMenuItem[];

  constructor() {}

  ngOnInit(): void {
    this.menuItems = [{
      label: 'Team Manager',
      link: 'team-manager'
    }, {
      label: 'Second',
      link: null
    }, {
      label: 'Third',
      link: null
    }];

    this.activeLink = this.menuItems[0];
  }
}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'bkc-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements OnInit {
  activeLink: IMenuItem;
  menuItems: IMenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.menuItems = [{
      icon: 'leaderboard',
      label: 'Scores',
      link: '/scoreboard'
    }, {
      icon: 'help_center',
      label: 'Help',
      link: ''
    }, {
      icon: 'fingerprint',
      label: 'Scan',
      link: ''
    }, {
      icon: 'info',
      label: 'About',
      link: ''
    }];

    this.activeLink = this.menuItems[0];
  }
}

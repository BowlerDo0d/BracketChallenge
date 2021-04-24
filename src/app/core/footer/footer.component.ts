import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'bkc-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements OnInit {
  activeLink: IMenuItem;
  menuItems: IMenuItem[];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.menuItems = [{
      icon: 'leaderboard',
      label: 'Scores',
      link: '/scoreboard'
    }, {
      icon: 'help_center',
      label: 'Help',
      link: '/help'
    }, {
      icon: 'fingerprint',
      label: 'Scan',
      link: '/scan'
    }, {
      icon: 'info',
      label: 'About',
      link: '/about'
    }];

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe({
      next: (event: NavigationEnd) => {
        this.menuItems.forEach((item) => {
          if (event.url.indexOf(item.link) !== -1) {
            this.activeLink = item;
          }
        });
      }
    });
  }
}

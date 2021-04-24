import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'bkc-footer',
  templateUrl: './footer.component.html'
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
      custom: true,
      icon: 'bracket',
      label: 'Brackets',
      link: '/mybrackets'
    }, {
      icon: 'help_center',
      label: 'Help',
      link: '/help'
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

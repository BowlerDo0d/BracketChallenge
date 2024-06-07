import { Component, inject } from '@angular/core';
import { faCheck, faDollar, faExclamationTriangle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FontAwesomeModule,
    FooterComponent,
    HeaderComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor() {
    const library = inject(FaIconLibrary);

    library.addIcons(faCheck, faDollar, faExclamationTriangle, faPlus, faSquareCheck);
  }
}

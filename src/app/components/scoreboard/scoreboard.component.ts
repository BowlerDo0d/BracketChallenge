import { AsyncPipe, NgClass } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { Bracket } from '../../models/bracket.model';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Component, inject } from '@angular/core';
import { DEADLINE } from '../../constants/global.constants';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { map, Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { sortBrackets } from '../../helpers/bracket.helpers';

@Component({
  selector: 'app-scoreboard',
  standalone: true,
  imports: [
    AsyncPipe,
    FontAwesomeModule,
    NgClass,
    RouterLink
  ],
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.scss'
})
export class ScoreboardComponent {
  private authService: AuthService = inject(AuthService);
  private firestore: Firestore = inject(Firestore);

  brackets$: Observable<Bracket[]>;
  cashLine: number = 1;

  constructor() {
    const scoreboard = collection(this.firestore, 'scoreboard');

    this.brackets$ = (collectionData(scoreboard, { idField: 'key' }) as Observable<Bracket[]>).pipe(map((brackets) => {
      this.cashLine = brackets.length > 5 ? Math.floor(brackets.length / 5) : 1;

      return brackets.sort(sortBrackets).reverse();
    }));
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  isPastDeadline(): boolean {
    const today = new Date();

    return today.getTime() > DEADLINE.getTime();
  }
}

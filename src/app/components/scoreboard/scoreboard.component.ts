import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { Bracket } from '../../models/bracket.model';
import { collection, collectionData, Firestore, FirestoreDataConverter, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Component, inject } from '@angular/core';
import { DEADLINE } from '../../constants/global.constants';
import { map, Observable } from 'rxjs';
import { sortBrackets } from '../../helpers/bracket.helpers';

@Component({
  selector: 'app-scoreboard',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.scss'
})
export class ScoreboardComponent {
  private authService: AuthService = inject(AuthService);
  private firestore: Firestore = inject(Firestore);

  brackets$: Observable<Bracket[]>;
  cashLine: number = 1;

  constructor() {
    const convert: FirestoreDataConverter<Bracket, any> = {
      toFirestore: () => {},
      fromFirestore: (snapshot: QueryDocumentSnapshot) => {
        return snapshot.data() as Bracket;
      }
    };
    const scoreboard = collection(this.firestore, 'scoreboard').withConverter(convert);

    this.brackets$ = collectionData(scoreboard).pipe(map((brackets) => {
      this.cashLine = brackets.length > 5 ? Math.floor(brackets.length / 5) : 1;

      return brackets.sort(sortBrackets);
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

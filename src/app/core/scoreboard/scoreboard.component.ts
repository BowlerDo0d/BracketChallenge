import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DEADLINE } from '../../constants/global.constants';
import { AuthService } from '../../auth/auth.service';
import { BracketChecker } from '../bracket/bracket-checker';
import { Bracket } from '../../models/bracket.model';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {
  brackets$: Observable<any>;

  constructor(private authService: AuthService, private db: AngularFireDatabase) {}

  ngOnInit() {
    this.brackets$ = this.db.list('scoreboard').snapshotChanges().pipe(map(changes => {
      return changes.map(c => {
        const bracket: Partial<Bracket> = c.payload.val(),
          max = 13,
          truncatedName = bracket.name.length > max ? `${bracket.name.substr(0, max)}...` : bracket.name;

        return { key: c.payload.key, truncatedName, ...bracket };
      }).sort(BracketChecker.sortBrackets);
    }));
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  isPastDeadline(): boolean {
    const today = new Date();

    return today.getTime() > DEADLINE.getTime();
  }
}

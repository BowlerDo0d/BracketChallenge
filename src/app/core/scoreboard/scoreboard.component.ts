import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../auth/auth.service';
import { BracketChecker } from '../bracket/bracket-checker';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {
  brackets$: Observable<any>;
  pastDeadline: boolean;

  constructor(private authService: AuthService, private db: AngularFireDatabase) {
    this.pastDeadline = true;
  }

  ngOnInit() {
    this.brackets$ = this.db.list('scoreboard').snapshotChanges().map(changes => {
      return changes.map(c => {
        const bracket = c.payload.val(),
          max = 13,
          truncatedName = bracket.name.length > max ? `${bracket.name.substr(0, max)}...` : bracket.name;

        return { key: c.payload.key, truncatedName, ...bracket };
      }).sort(BracketChecker.sortBrackets);
    });
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}

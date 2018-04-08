import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {
  brackets$: Observable<any>;

  constructor(private authService: AuthService, private db: AngularFireDatabase) {}

  ngOnInit() {
    this.brackets$ = this.db.list('scoreboard', ref => ref.orderByChild('score')).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}

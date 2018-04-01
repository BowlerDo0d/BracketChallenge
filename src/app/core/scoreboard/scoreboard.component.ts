import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {
  brackets$: Observable<any>;

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    this.brackets$ = this.db.list('/brackets', ref => ref.orderByChild('score')).valueChanges();
  }
}

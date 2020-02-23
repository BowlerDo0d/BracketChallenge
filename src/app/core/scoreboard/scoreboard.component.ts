import { AngularFireDatabase } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {
  brackets$: Observable<any[]>;
  cashLine: number;
  displayedColumns: string[];

  constructor(private db: AngularFireDatabase) { }

  ngOnInit(): void {
    this.displayedColumns = ['position', 'bracketName', 'owner', 'champs', 'score'];

    this.brackets$ = this.db.list('scoreboard').snapshotChanges()
      .pipe(
        tap(changes => this.cashLine = Math.floor(changes.length / 5) - 1),
        map(changes =>
          changes.map(c => {
            const bracket: any = c.payload.val(), // Change type to Bracket or Partial<Bracket>
              max = 13,
              truncatedName = bracket.name.length > max ? `${bracket.name.substr(0, max)}...` : bracket.name;

            return { key: c.payload.key, truncatedName, ...bracket };
          })
        ) // .sort(BracketChecker.sortBrackets);
      );
  }

  trackByKey(index, item) {
    return item.key;
  }
}

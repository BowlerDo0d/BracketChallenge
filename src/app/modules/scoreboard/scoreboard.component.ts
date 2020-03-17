import { AngularFireDatabase } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { sortBracketsByScore } from 'src/app/core/helpers/sort-brackets-by-score.helper';

@Component({
  selector: 'scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {
  brackets$: Observable<IBracket[]>;
  cashLine: number;

  constructor(private db: AngularFireDatabase) { }

  ngOnInit(): void {
    const currentYear = (new Date()).getFullYear();

    this.brackets$ = this.db.list<IBracket>(`${currentYear}/scoreboard`).snapshotChanges()
      .pipe(
        tap(changes => this.cashLine = Math.floor(changes.length / 5) - 1),
        map(changes =>
          changes.map(c => {
            const bracket: IBracket = c.payload.val() as IBracket,
              max = 13,
              truncatedName: string = bracket.name.length > max ? `${bracket.name.substr(0, max)}...` : bracket.name;

            return { key: c.payload.key, truncatedName, ...bracket };
          }).sort(sortBracketsByScore)
        )
      );
  }

  trackByKey(index: number, item: IBracket) {
    return item.key;
  }
}

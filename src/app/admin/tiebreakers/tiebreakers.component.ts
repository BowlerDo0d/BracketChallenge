import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { BracketChecker } from '../../core/bracket/bracket-checker';
import { Bracket } from '../../models/bracket.model';

@Component({
  selector: 'app-tiebreakers',
  templateUrl: './tiebreakers.component.html',
  styleUrls: ['./tiebreakers.component.scss']
})
export class TiebreakersComponent implements OnInit {
  brackets$: Observable<any>;
  formControls: any = {};
  navigationSubscription: Subscription;
  tiesForm: FormGroup;

  constructor(private db: AngularFireDatabase, private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((evt: any) => {
      if (evt instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    this.brackets$ = this.db.list('scoreboard').snapshotChanges().pipe(take(1)).pipe(map(changes => {
      return changes.map(c => {
        const bracket: Partial<Bracket> = c.payload.val(),
          max = 13,
          truncatedName = bracket.name.length > max ? `${bracket.name.substr(0, max)}...` : bracket.name;

        this.formControls[`tieRank${c.payload.key}`] = new FormControl(bracket.tieRank ? bracket.tieRank : 0);

        return { key: c.payload.key, truncatedName, ...bracket };
      }).sort(BracketChecker.sortBrackets);
    }));

    this.tiesForm = new FormGroup(this.formControls);
  }

  decrementRank(key) {
    let rank: number = +this.tiesForm.get(`tieRank${key}`).value;

    if (rank > 0) {
      rank -= 1;

      this.tiesForm.patchValue({
        [`tieRank${key}`]: rank
      });

      this.updateRank(key, rank);
    }
  }

  incrementRank(key) {
    let rank: number = +this.tiesForm.get(`tieRank${key}`).value;

    rank += 1;

    this.tiesForm.patchValue({
      [`tieRank${key}`]: rank
    });

    this.updateRank(key, rank);
  }

  updateRank(key, rank) {
    this.db.object(`scoreboard/${key}`).update({ tieRank: rank });
  }
}

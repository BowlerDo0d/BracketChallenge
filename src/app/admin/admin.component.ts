import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { Bracket } from '../models/bracket.model';
import { BracketMapper } from '../core/bracket/data/bracket-mapper';
import { KEYS } from '../constants/global.constants';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  masterBracket: Bracket;

  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
    this.db.object(`bracket/${KEYS.MASTER}`).snapshotChanges().take(1).subscribe(data => {
      const bracket = data.payload.val();

      this.masterBracket = BracketMapper(bracket);
    });
  }

  showConferenceFinals(conference: number) {
    return this.masterBracket &&
      this.masterBracket.conferences[conference].divisions[0].winner.name !== null &&
      this.masterBracket.conferences[conference].divisions[1].winner.name !== null;
  }

  showCupFinals() {
    return this.masterBracket &&
      this.masterBracket.conferences[0].winner.name !== null &&
      this.masterBracket.conferences[1].winner.name !== null;
  }

  showRound(conference, division, round) {
    return round === 1 ? true :
      this.masterBracket &&
      this.masterBracket.conferences[conference].divisions[division].rounds[1].matchups[0].topSeed.name !== null &&
      this.masterBracket.conferences[conference].divisions[division].rounds[1].matchups[0].bottomSeed.name !== null;
  }
}

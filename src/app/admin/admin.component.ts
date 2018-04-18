import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Bracket } from '../models/bracket.model';
import { BracketMapper } from '../core/bracket/data/bracket-mapper';
import { KEYS } from '../constants/global.constants';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  adminForm: FormGroup;
  masterBracket: Bracket;

  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
    this.db.object(`bracket/${KEYS.MASTER}`).snapshotChanges().take(1).subscribe(data => {
      const bracket = data.payload.val();

      this.masterBracket = BracketMapper(bracket);
    });

    this.adminForm = new FormGroup({
      // Round 1
      topSeed0000: new FormControl(null, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      bottomSeed0000: new FormControl(null, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      topSeed0001: new FormControl(null, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      bottomSeed0001: new FormControl(null, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      topSeed0100: new FormControl(null, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      bottomSeed0100: new FormControl(null, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      topSeed0101: new FormControl(null, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      bottomSeed0101: new FormControl(null, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      topSeed1000: new FormControl(null, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      bottomSeed1000: new FormControl(null, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      topSeed1001: new FormControl(null, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      bottomSeed1001: new FormControl(null, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      topSeed1100: new FormControl(null, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      bottomSeed1100: new FormControl(null, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      topSeed1101: new FormControl(null, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      bottomSeed1101: new FormControl(null, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      // Round 2
      topSeed0010: new FormControl(null, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      bottomSeed0010: new FormControl(null, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      topSeed0110: new FormControl(null, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      bottomSeed0110: new FormControl(null, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      topSeed1010: new FormControl(null, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      bottomSeed1010: new FormControl(null, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      topSeed1110: new FormControl(null, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      bottomSeed1110: new FormControl(null, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      // Conference finals
      topSeed00: new FormControl(null, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      bottomSeed01: new FormControl(null, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      topSeed10: new FormControl(null, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      bottomSeed11: new FormControl(null, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      // Finals
      topSeed: new FormControl(null, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      bottomSeed: new FormControl(null, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)])
    });
  }

  saveScores() {
    console.log('data');
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

  showQuarterfinals(conference, division) {
    return this.masterBracket &&
      this.masterBracket.conferences[conference].divisions[division].rounds[1].matchups[0].topSeed.name !== null &&
      this.masterBracket.conferences[conference].divisions[division].rounds[1].matchups[0].bottomSeed.name !== null;
  }
}

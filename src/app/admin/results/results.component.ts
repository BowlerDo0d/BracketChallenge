import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Bracket } from '../../models/bracket.model';
import { BracketMapper } from '../../core/bracket/data/bracket-mapper';
import { KEYS } from '../../constants/global.constants';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  resultsForm: FormGroup;
  masterBracket: Bracket;

  constructor(private db: AngularFireDatabase, private router: Router) { }

  ngOnInit() {
    this.db.object(`bracket/${KEYS.MASTER}`).snapshotChanges().take(1).subscribe(data => {
      const bracket = data.payload.val();

      this.masterBracket = BracketMapper(bracket);
    });

    this.resultsForm = new FormGroup({
      // Round 1
      topSeed0000: new FormControl(0, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      bottomSeed0000: new FormControl(0, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      topSeed0001: new FormControl(0, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      bottomSeed0001: new FormControl(0, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      topSeed0100: new FormControl(0, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      bottomSeed0100: new FormControl(0, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      topSeed0101: new FormControl(0, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      bottomSeed0101: new FormControl(0, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      topSeed1000: new FormControl(0, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      bottomSeed1000: new FormControl(0, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      topSeed1001: new FormControl(0, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      bottomSeed1001: new FormControl(0, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      topSeed1100: new FormControl(0, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      bottomSeed1100: new FormControl(0, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      topSeed1101: new FormControl(0, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      bottomSeed1101: new FormControl(0, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      // Round 2
      topSeed0010: new FormControl(0, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      bottomSeed0010: new FormControl(0, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      topSeed0110: new FormControl(0, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      bottomSeed0110: new FormControl(0, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      topSeed1010: new FormControl(0, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      bottomSeed1010: new FormControl(0, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      topSeed1110: new FormControl(0, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      bottomSeed1110: new FormControl(0, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      // Conference finals
      topSeed00: new FormControl(0, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      bottomSeed01: new FormControl(0, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      topSeed10: new FormControl(0, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      bottomSeed11: new FormControl(0, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      // Finals
      topSeed: new FormControl(0, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      bottomSeed: new FormControl(0, [Validators.pattern(/\d/), Validators.min(0), Validators.max(4)]),
      totalGoals: new FormControl(0, [Validators.pattern(/\d/), Validators.min(0)])
    });

    this.db.object('results').snapshotChanges().take(1).subscribe(data => {
      const results = data.payload.val();

      _.keys(results).forEach(result => {
        this.resultsForm.patchValue({
          [result]: results[result]
        });
      });
    });
  }

  saveScores() {
    const results = {
      // Round 1
      topSeed0000: this.resultsForm.value['topSeed0000'],
      bottomSeed0000: this.resultsForm.value['bottomSeed0000'],
      topSeed0001: this.resultsForm.value['topSeed0001'],
      bottomSeed0001: this.resultsForm.value['bottomSeed0001'],
      topSeed0100: this.resultsForm.value['topSeed0100'],
      bottomSeed0100: this.resultsForm.value['bottomSeed0100'],
      topSeed0101: this.resultsForm.value['topSeed0101'],
      bottomSeed0101: this.resultsForm.value['bottomSeed0101'],
      topSeed1000: this.resultsForm.value['topSeed1000'],
      bottomSeed1000: this.resultsForm.value['bottomSeed1000'],
      topSeed1001: this.resultsForm.value['topSeed1001'],
      bottomSeed1001: this.resultsForm.value['bottomSeed1001'],
      topSeed1100: this.resultsForm.value['topSeed1100'],
      bottomSeed1100: this.resultsForm.value['bottomSeed1100'],
      topSeed1101: this.resultsForm.value['topSeed1101'],
      bottomSeed1101: this.resultsForm.value['bottomSeed1101'],
      // Round 2
      topSeed0010: this.resultsForm.value['topSeed0010'],
      bottomSeed0010: this.resultsForm.value['bottomSeed0010'],
      topSeed0110: this.resultsForm.value['topSeed0110'],
      bottomSeed0110: this.resultsForm.value['bottomSeed0110'],
      topSeed1010: this.resultsForm.value['topSeed1010'],
      bottomSeed1010: this.resultsForm.value['bottomSeed1010'],
      topSeed1110: this.resultsForm.value['topSeed1110'],
      bottomSeed1110: this.resultsForm.value['bottomSeed1110'],
      // Conference finals
      topSeed00: this.resultsForm.value['topSeed00'],
      bottomSeed01: this.resultsForm.value['bottomSeed01'],
      topSeed10: this.resultsForm.value['topSeed10'],
      bottomSeed11: this.resultsForm.value['bottomSeed11'],
      // Finals
      topSeed: this.resultsForm.value['topSeed'],
      bottomSeed: this.resultsForm.value['bottomSeed'],
      totalGoals: this.resultsForm.value['totalGoals']
    };

    this.db.object('results').update(results).then(
      () => this.router.navigate(['/admin']),
      error => console.log(error)
    );
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

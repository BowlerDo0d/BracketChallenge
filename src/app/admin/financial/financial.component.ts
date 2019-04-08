import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Bracket } from '../../models/bracket.model';

@Component({
  selector: 'app-financial',
  templateUrl: './financial.component.html',
  styleUrls: ['./financial.component.scss']
})
export class FinancialComponent implements OnInit {
  brackets$: Observable<any>;
  formControls: any = {};
  paidForm: FormGroup;

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    this.brackets$ = this.db.list('scoreboard').snapshotChanges().pipe(take(1)).pipe(map(changes => {
      return changes.map(c => {
        const bracket: any = c.payload.val(),
          max = 13,
          truncatedName = bracket.name.length > max ? `${bracket.name.substr(0, max)}...` : bracket.name;

        this.formControls[`isPaid${c.payload.key}`] = new FormControl(bracket.isPaid ? bracket.isPaid : false);

        return { key: c.payload.key, truncatedName, ...bracket };
      });
    }));

    this.paidForm = new FormGroup(this.formControls);
  }

  updatePaid(key: string) {
    const isPaid = this.paidForm.controls[`isPaid${key}`].value;

    this.db.object(`scoreboard/${key}`).update({ isPaid });
  }
}

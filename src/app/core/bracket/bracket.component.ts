import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import 'rxjs/add/operator/take';

import { AuthService } from '../../auth/auth.service';
import { Bracket } from '../../models/bracket.model';
import { BracketNameValidator } from './bracket-name-validator';
import { VIEW_MODES } from '../../constants/form.constants';

// Test data
import { BracketMock } from './bracket-mock';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss']
})
export class BracketComponent implements OnInit {
  id: string;
  bracket: Bracket;
  bracketForm: FormGroup;
  viewMode = VIEW_MODES.DETAIL;

  constructor(private authService: AuthService, private db: AngularFireDatabase, private router: Router, private route: ActivatedRoute) {
    this.bracket = new Bracket();
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];

      if (this.id) {
        // this.db.object(`bracket/${this.id}`).snapshotChanges().take(1).subscribe(bracket => {
        //   this.bracket = bracket.payload.val();
        //   this.bracketForm.patchValue({
        //     bracketName: this.bracket.name
        //   });
        // });
        this.bracket = BracketMock;
        this.bracketForm.patchValue({
          bracketName: this.bracket.name
        });
      } else {
        this.viewMode = VIEW_MODES.CREATE;
      }
    });

    this.bracketForm = new FormGroup({
      bracketName: new FormControl(null, [Validators.required, BracketNameValidator.checkBracketName])
    });
  }

  cancel() {
    if (this.isEditMode()) {
      this.viewMode = VIEW_MODES.DETAIL;
    } else {
      this.router.navigate(['/']);
    }
  }

  editBracket() {
    this.viewMode = VIEW_MODES.EDIT;
  }

  isBracketNameTaken() {
    return this.bracketForm.get('bracketName').errors && this.bracketForm.get('bracketName').errors.bracket_name_exists;
  }

  isDetailMode() {
    return this.viewMode === VIEW_MODES.DETAIL;
  }

  isEditMode() {
    return this.viewMode === VIEW_MODES.EDIT;
  }

  submitBracket() {
    if (this.viewMode === VIEW_MODES.CREATE) {
      this.bracket = {
        conferences: null,
        name: this.bracketForm.value['bracketName'],
        owner: this.authService.getUsername(),
        score: 0
      };

      this.db.list('bracket').push(this.bracket).then(() => this.router.navigate(['/']));

    } else if (this.viewMode === VIEW_MODES.EDIT) {
      this.bracket.name = this.bracketForm.value['bracketName'];

      this.db.object(`bracket/${this.id}`).update(this.bracket).then(() => this.viewMode = VIEW_MODES.DETAIL).catch((error) => {
        console.log(error);
      });
    }
  }
}

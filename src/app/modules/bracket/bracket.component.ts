import { ActivatedRoute, Event, NavigationEnd, Params, Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { KEYS } from 'src/app/constants/global.constants';

declare enum ViewModes {
  Create = 'CREATE',
  Detail = 'DETAIL',
  Edit = 'EDIT'
}

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss']
})
export class BracketComponent implements OnInit, OnDestroy {
  bracket: IBracket;
  bracketForm: FormGroup;
  canEdit: boolean;
  key: string;
  masterBracket: IBracket;
  navigationSubscription: Subscription;
  results: unknown; // TODO: Type this
  showResults: boolean;
  viewMode: ViewModes;

  constructor(
    private authService: AuthService,
    private db: AngularFireDatabase,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.navigationSubscription = this.router.events.subscribe({
      next: (evt: Event) => {
        if (evt instanceof NavigationEnd) {
          this.ngOnInit();
        }
      }
    });
  }

  ngOnInit(): void {
    this.canEdit = false;
    this.showResults = !this.isMasterBracket() && this.isPastDeadline();

    this.bracketForm = new FormGroup({
      bracketName: new FormControl(null, [Validators.required])
      // numberOfGames001: new FormControl(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
      // numberOfGames002: new FormControl(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
      // numberOfGames003: new FormControl(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
      // numberOfGames004: new FormControl(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
      // numberOfGames011: new FormControl(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
      // numberOfGames012: new FormControl(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
      // numberOfGames013: new FormControl(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
      // numberOfGames101: new FormControl(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
      // numberOfGames102: new FormControl(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
      // numberOfGames103: new FormControl(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
      // numberOfGames104: new FormControl(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
      // numberOfGames111: new FormControl(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
      // numberOfGames112: new FormControl(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
      // numberOfGames113: new FormControl(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
      // numberOfGamesFinal: new FormControl(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
      // numberOfGoalsFinal: new FormControl(null, [Validators.pattern(/\d+/), Validators.min(4)])
    });

    this.route.params.subscribe((params: Params) => {
      this.key = params.key as string;

      if (this.key === 'new') {
        // Create mode
        if (this.isPastDeadline()) {
          this.router.navigate(['/']);
        } else {
          this.viewMode = ViewModes.Create;
          this.bracket = null; // TODO: Create a blank bracket model (e.g. cloneDeep(BlankNHLBracket))
          this.bracket.owner = this.authService.getUsername();
        }
      } else {
        // Load bracket data
        if (this.key === 'mock') {
          this.bracket = null; // TODO: Create mock bracket _.cloneDeep(BracketMock);
          this.canEdit = true;
        } else {
          if (this.authService.isAdmin()) {
            if (this.key === 'master') {
              // Master bracket key
              this.key = KEYS.MASTER;
            } else if (this.key === 'dummy') {
              this.key = KEYS.DUMMY;
            }
          }

          this.db.object(`bracket/${this.key}`).snapshotChanges().pipe(take(1)).subscribe(data => {
            if (data.payload.val()) {
              this.bracket = data.payload.val() as IBracket;

              if (
                (!this.isPastDeadline() && (this.authService.isAdmin() || this.bracket.owner === this.authService.getUsername())) ||
                this.authService.isAdmin() && this.isMasterBracket()
              ) {
                this.canEdit = true;
              } else if (this.viewMode === ViewModes.Edit) {
                this.router.navigate(['bracket', this.key]);
              }

              this.bracketForm.patchValue({
                bracketName: this.bracket.name
                // numberOfGames001: this.bracket.conferences[0].divisions[0].rounds[0].matchups[0].games,
                // numberOfGames002: this.bracket.conferences[0].divisions[0].rounds[0].matchups[1].games,
                // numberOfGames003: this.bracket.conferences[0].divisions[0].rounds[1].matchups[0].games,
                // numberOfGames004: this.bracket.conferences[0].games,
                // numberOfGames011: this.bracket.conferences[0].divisions[1].rounds[0].matchups[0].games,
                // numberOfGames012: this.bracket.conferences[0].divisions[1].rounds[0].matchups[1].games,
                // numberOfGames013: this.bracket.conferences[0].divisions[1].rounds[1].matchups[0].games,
                // numberOfGames101: this.bracket.conferences[1].divisions[0].rounds[0].matchups[0].games,
                // numberOfGames102: this.bracket.conferences[1].divisions[0].rounds[0].matchups[1].games,
                // numberOfGames103: this.bracket.conferences[1].divisions[0].rounds[1].matchups[0].games,
                // numberOfGames104: this.bracket.conferences[1].games,
                // numberOfGames111: this.bracket.conferences[1].divisions[1].rounds[0].matchups[0].games,
                // numberOfGames112: this.bracket.conferences[1].divisions[1].rounds[0].matchups[1].games,
                // numberOfGames113: this.bracket.conferences[1].divisions[1].rounds[1].matchups[0].games,
                // numberOfGamesFinal: this.bracket.games,
                // numberOfGoalsFinal: this.bracket.goals
              });
            } else {
              this.router.navigate(['/']);
            }
          });

          if (!this.isMasterBracket()) {
            // Load the master bracket
            this.db.object(`bracket/${KEYS.MASTER}`).snapshotChanges().pipe(take(1)).subscribe(data => {
              if (data.payload.val()) {
                this.masterBracket = data.payload.val() as IBracket;
              }
            });
          }
        }
      }
    });

    // Get active results
    this.db.object('results').snapshotChanges().pipe(take(1)).subscribe(data => {
      this.results = data.payload.val();
    });
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  isMasterBracket(): boolean {
    return this.key === KEYS.MASTER;
  }

  isPastDeadline(): boolean {
    return false;
  }
}

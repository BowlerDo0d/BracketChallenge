import { AuthService } from '../../services/auth/auth.service';
import { Bracket, BracketForm } from '../../models/bracket.model';
import { BracketMock, BracketMockMaster } from './data/bracket-mock';
import { collection, doc, Firestore, getCountFromServer, onSnapshot, query, Unsubscribe, where } from '@angular/fire/firestore';
import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { DEADLINE, KEYS, VIEW_MODES } from '../../constants/global.constants';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe, Location, NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

type viewModeKeys = keyof typeof VIEW_MODES;
type viewModeValues = typeof VIEW_MODES[viewModeKeys];

@Component({
  selector: 'app-bracket',
  standalone: true,
  templateUrl: './bracket.component.html',
  styleUrl: './bracket.component.scss',
  imports: [
    FaIconComponent,
    NgClass,
    ReactiveFormsModule,
    RouterLink,
    JsonPipe
  ]
})
export class BracketComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private firestore = inject(Firestore);
  private location = inject(Location);
  private router = inject(Router);

  @Input() key: string = '';

  bracket: Bracket = {} as Bracket;
  canEdit: boolean = false;
  isComponentLoaded: boolean = false;
  masterBracket: Bracket = {} as Bracket;
  showResults: boolean = false;
  results: object = {};
  viewMode: viewModeValues = VIEW_MODES.CREATE;
  unsubscribeMethods: Unsubscribe[] = [];

  bracketForm = this.fb.group<BracketForm>({
    bracketName: this.fb.nonNullable.control<string>('', [Validators.required]),
    totalGamesA1: this.fb.control(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
    totalGamesA2: this.fb.control(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
    totalGamesA3: this.fb.control(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
    totalGamesB1: this.fb.control(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
    totalGamesB2: this.fb.control(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
    totalGamesB3: this.fb.control(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
    totalGamesC1: this.fb.control(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
    totalGamesC2: this.fb.control(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
    totalGamesC3: this.fb.control(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
    totalGamesD1: this.fb.control(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
    totalGamesD2: this.fb.control(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
    totalGamesD3: this.fb.control(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
    totalGamesAB: this.fb.control(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
    totalGamesCD: this.fb.control(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
    totalGamesFinal: this.fb.control(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
    totalGoalsFinal: this.fb.control(null, [Validators.pattern(/\d/), Validators.min(4)])
  });

  ngOnDestroy(): void {
    this.unsubscribeMethods.forEach((method) => {
      method();
    });
  }

  ngOnInit(): void {
    this.showResults = !this.isMasterBracket() && this.isPastDeadline();
    this.viewMode = location.pathname.indexOf('/edit') !== -1 ? VIEW_MODES.EDIT : VIEW_MODES.DETAIL;

    const bracketCollection = collection(this.firestore, 'bracket');

    this.bracketForm.get('bracketName')?.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(500)
    ).subscribe({
      next: async (newValue) => {
        const condensedName = newValue.replaceAll(' ','').toLowerCase();

        if (condensedName !== this.bracket.name_condensed) {
          const q = query(bracketCollection, where('name_condensed', '==', condensedName)),
            snapshot = await getCountFromServer(q);

          if (snapshot.data().count > 0) {
            this.bracketForm.get('bracketName')?.setErrors({ bracket_name_taken: true });
          }
        }
      }
    });

    this.setupBracket();
  }

  cancel(): void {
    if (this.isEditMode()) {
      this.location.replaceState(`/bracket/${this.key}`);
      this.viewMode = VIEW_MODES.DETAIL;
      this.loadBracketData(this.bracket);
    } else {
      this.router.navigate(['/']);
    }
  }

  canUserEdit(username: string): boolean {
    return (
      !this.isPastDeadline() &&
      (
        this.isAdmin ||
        this.isLoggedInUser(username)
      )
    ) ||
    (this.isAdmin && this.isMasterBracket());
  }

  editBracket(): void {
    this.location.replaceState(`/bracket/${this.key}/edit`);
    this.viewMode = VIEW_MODES.EDIT;
  }

  getBracketFromServer(bracketKey: string, isMaster: boolean = false): void {
    const docRef = doc(this.firestore, `bracket/${bracketKey}`),
      killSnapshot = onSnapshot(docRef, (snapshot) => {
        if (isMaster) {
          this.masterBracket = snapshot.data() as Bracket;
        } else {
          this.loadBracketData(snapshot.data() as Bracket);
        }
      });

    this.unsubscribeMethods.push(killSnapshot);
  }

  getClassMatchingMaster(conference: number = -1, division: number = -1, round: number = -1, matchup: number = -1, isTopSeed: boolean = true): string {
    return '';
    // const errorClass = 'text-danger',
    //   successClass = 'text-success';
    // let cssClass: string = null;

    // if (this.showResults && !this.isMasterBracket() && this.isDetailMode() && this.masterBracket) {
    //   if (conference === -1) {
    //     // Check overall winner
    //     if (_.get(this.masterBracket, 'winner.name') !== null) {
    //       if (this.bracket.winner.name ===
    //           _.get(this.masterBracket, `winner.name`)) {
    //         cssClass = successClass;
    //       } else {
    //         cssClass = errorClass;
    //       }
    //     } else {
    //       // Check everything....
    //       _.some(this.bracket.conferences, (conf, confIdx) => {
    //         return _.some(this.bracket.conferences[confIdx].divisions, (div, divIdx) => {
    //           // Check division winner
    //           if (_.get(this.masterBracket, `conferences[${confIdx}].divisions[${divIdx}].winner.name`) !== null) {
    //             if (this.bracket.winner.name ===
    //                 this.bracket.conferences[confIdx].divisions[divIdx].winner.name &&
    //                 this.bracket.conferences[confIdx].divisions[divIdx].winner.name !==
    //                 _.get(this.masterBracket, `conferences[${confIdx}].divisions[${divIdx}].winner.name`)) {
    //               cssClass = errorClass;
    //               return true;
    //             }
    //           }
    //           // Check matchup top seed
    //           if (_.get(this.masterBracket, `conferences[${confIdx}].divisions[${divIdx}].rounds[1].matchups[0].topSeed.name`) !== null) {
    //             if (this.bracket.winner.name ===
    //                 this.bracket.conferences[confIdx].divisions[divIdx].rounds[1].matchups[0].topSeed.name &&
    //                 this.bracket.conferences[confIdx].divisions[divIdx].rounds[1].matchups[0].topSeed.name !==
    //                 _.get(this.masterBracket, `conferences[${confIdx}].divisions[${divIdx}].rounds[1].matchups[0].topSeed.name`)) {
    //               cssClass = errorClass;
    //               return true;
    //             }
    //           }
    //           // Check bottom seed
    //           if (_.get(this.masterBracket, `conferences[${confIdx}].divisions[${divIdx}].rounds[1].matchups[0].bottomSeed.name`) !== null) {
    //             if (this.bracket.winner.name ===
    //                 this.bracket.conferences[confIdx].divisions[divIdx].rounds[1].matchups[0].bottomSeed.name &&
    //                 this.bracket.conferences[confIdx].divisions[divIdx].rounds[1].matchups[0].bottomSeed.name !==
    //                 _.get(this.masterBracket, `conferences[${confIdx}].divisions[${divIdx}].rounds[1].matchups[0].bottomSeed.name`)) {
    //               cssClass = errorClass;
    //               return true;
    //             }
    //           }
    //         });
    //       });
    //     }
    //   } else if (division === -1) {
    //     // Check conference winners
    //     if (_.get(this.masterBracket, `conferences[${conference}].winner.name`) !== null) {
    //       if (this.bracket.conferences[conference].winner.name ===
    //           _.get(this.masterBracket, `conferences[${conference}].winner.name`)) {
    //         cssClass = successClass;
    //       } else {
    //         cssClass = errorClass;
    //       }
    //     } else {
    //       // Check division winners and matchup winners under same conference
    //       _.some(this.bracket.conferences[conference].divisions, (div, idx) => {
    //         // Check division winner
    //         if (_.get(this.masterBracket, `conferences[${conference}].divisions[${idx}].winner.name`) !== null) {
    //           if (this.bracket.conferences[conference].winner.name ===
    //               this.bracket.conferences[conference].divisions[idx].winner.name &&
    //               this.bracket.conferences[conference].divisions[idx].winner.name !==
    //               _.get(this.masterBracket, `conferences[${conference}].divisions[${idx}].winner.name`)) {
    //             cssClass = errorClass;
    //             return true;
    //           }
    //         }
    //         // Check matchup top seed
    //         if (_.get(this.masterBracket, `conferences[${conference}].divisions[${idx}].rounds[1].matchups[0].topSeed.name`) !== null) {
    //           if (this.bracket.conferences[conference].winner.name ===
    //               this.bracket.conferences[conference].divisions[idx].rounds[1].matchups[0].topSeed.name &&
    //               this.bracket.conferences[conference].divisions[idx].rounds[1].matchups[0].topSeed.name !==
    //               _.get(this.masterBracket, `conferences[${conference}].divisions[${idx}].rounds[1].matchups[0].topSeed.name`)) {
    //             cssClass = errorClass;
    //             return true;
    //           }
    //         }
    //         // Check bottom seed
    //         if (_.get(this.masterBracket, `conferences[${conference}].divisions[${idx}].rounds[1].matchups[0].bottomSeed.name`) !== null) {
    //           if (this.bracket.conferences[conference].winner.name ===
    //               this.bracket.conferences[conference].divisions[idx].rounds[1].matchups[0].bottomSeed.name &&
    //               this.bracket.conferences[conference].divisions[idx].rounds[1].matchups[0].bottomSeed.name !==
    //               _.get(this.masterBracket, `conferences[${conference}].divisions[${idx}].rounds[1].matchups[0].bottomSeed.name`)) {
    //             cssClass = errorClass;
    //             return true;
    //           }
    //         }
    //       });
    //     }
    //   } else if (round === -1) {
    //     // Check division winners
    //     if (_.get(this.masterBracket, `conferences[${conference}].divisions[${division}].winner.name`) !== null) {
    //       if (this.bracket.conferences[conference].divisions[division].winner.name ===
    //           _.get(this.masterBracket, `conferences[${conference}].divisions[${division}].winner.name`)) {
    //         cssClass = successClass;
    //       } else {
    //         cssClass = errorClass;
    //       }
    //     } else {
    //       // Check matchups in division
    //       // Check top seed
    //       if (_.get(this.masterBracket, `conferences[${conference}].divisions[${division}].rounds[1].matchups[0].topSeed.name`) !== null) {
    //         if (this.bracket.conferences[conference].divisions[division].winner.name ===
    //             this.bracket.conferences[conference].divisions[division].rounds[1].matchups[0].topSeed.name &&
    //             this.bracket.conferences[conference].divisions[division].rounds[1].matchups[0].topSeed.name !==
    //             _.get(this.masterBracket, `conferences[${conference}].divisions[${division}].rounds[1].matchups[0].topSeed.name`)) {
    //           cssClass = errorClass;
    //         }
    //       }
    //       // Check bottom seed
    //       if (!cssClass && _.get(this.masterBracket, `conferences[${conference}].divisions[${division}].rounds[1].matchups[0].bottomSeed.name`) !== null) {
    //         if (this.bracket.conferences[conference].divisions[division].winner.name ===
    //             this.bracket.conferences[conference].divisions[division].rounds[1].matchups[0].bottomSeed.name &&
    //             this.bracket.conferences[conference].divisions[division].rounds[1].matchups[0].bottomSeed.name !==
    //             _.get(this.masterBracket, `conferences[${conference}].divisions[${division}].rounds[1].matchups[0].bottomSeed.name`)) {
    //           cssClass = errorClass;
    //         }
    //       }
    //     }
    //   } else {
    //     // Check round 2 winners
    //     if (isTopSeed ?
    //           _.get(this.masterBracket, `conferences[${conference}].divisions[${division}].rounds[${round}].matchups[${matchup}].topSeed.name`) !== null :
    //           _.get(this.masterBracket, `conferences[${conference}].divisions[${division}].rounds[${round}].matchups[${matchup}].bottomSeed.name`) !== null) {
    //       if (isTopSeed ?
    //             this.bracket.conferences[conference].divisions[division].rounds[round].matchups[matchup].topSeed.name ===
    //             _.get(this.masterBracket, `conferences[${conference}].divisions[${division}].rounds[${round}].matchups[${matchup}].topSeed.name`) :
    //             this.bracket.conferences[conference].divisions[division].rounds[round].matchups[matchup].bottomSeed.name ===
    //             _.get(this.masterBracket, `conferences[${conference}].divisions[${division}].rounds[${round}].matchups[${matchup}].bottomSeed.name`)) {
    //         cssClass = successClass;
    //       } else {
    //         cssClass = errorClass;
    //       }
    //     }
    //   }
    // }

    // return cssClass;
  }

  getResults(conference: number = -1, division: number = -1, round: number = -1, matchup: number = -1): string {
    return '';
    // let topSeed = null,
    //   topSeedResult = null,
    //   bottomSeed = null,
    //   bottomSeedResult = null,
    //   result = null;

    // if (!this.isMasterBracket() && this.results) {
    //   if (conference === -1) {
    //     // Check finals
    //     topSeed = this.getAbbr(this.masterBracket.conferences[0].winner.name);
    //     topSeedResult = +this.results['topSeed'];
    //     bottomSeed = this.getAbbr(this.masterBracket.conferences[1].winner.name);
    //     bottomSeedResult = +this.results['bottomSeed'];
    //   } else if (division === -1) {
    //     // Check conference finals
    //     topSeed = this.getAbbr(this.masterBracket.conferences[conference].divisions[0].winner.name);
    //     topSeedResult = +this.results[`topSeed${conference}0`];
    //     bottomSeed = this.getAbbr(this.masterBracket.conferences[conference].divisions[1].winner.name);
    //     bottomSeedResult = +this.results[`bottomSeed${conference}1`];
    //   } else {
    //     topSeed = this.getAbbr(this.masterBracket.conferences[conference].divisions[division].rounds[round].matchups[matchup].topSeed.name);
    //     topSeedResult = +this.results[`topSeed${conference}${division}${round}${matchup}`];
    //     bottomSeed = this.getAbbr(this.masterBracket.conferences[conference].divisions[division].rounds[round].matchups[matchup].bottomSeed.name);
    //     bottomSeedResult = +this.results[`bottomSeed${conference}${division}${round}${matchup}`];
    //   }

    //   if (topSeed !== null && bottomSeed !== null) {
    //     if (topSeedResult === bottomSeedResult) {
    //       result = `Series tied ${topSeedResult}-${bottomSeedResult}`;
    //     } else if (topSeedResult === 4) {
    //       // Top seed won
    //       result = `${topSeed} won ${topSeedResult}-${bottomSeedResult}`;
    //     } else if (bottomSeedResult === 4) {
    //       // Bottom seed won
    //       result = `${bottomSeed} won ${bottomSeedResult}-${topSeedResult}`;
    //     } else if (topSeedResult > bottomSeedResult) {
    //       // Top seed leads
    //       result = `${topSeed} leads ${topSeedResult}-${bottomSeedResult}`;
    //     } else if (topSeedResult < bottomSeedResult) {
    //       // Bottom seed leads
    //       result = `${bottomSeed} leads ${bottomSeedResult}-${topSeedResult}`;
    //     }
    //   }
    // }

    // return result;
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isBracketNameTaken(): boolean {
    return this.bracketForm.get('bracketName')?.errors?.['bracket_name_taken'];
  }

  isDetailMode(): boolean {
    return this.viewMode === VIEW_MODES.DETAIL;
  }

  isEditMode(): boolean {
    return this.viewMode === VIEW_MODES.EDIT;
  }

  isLoggedInUser(username: string): boolean {
    return username === this.authService.username;
  }

  isMasterBracket(): boolean {
    // return this.key === KEYS.MASTER;
    return this.key === 'master';
  }

  isMasterMatch(conference: number = -1, division: number = -1, round: number = -1, matchup: number = -1, isTopSeed: boolean = true): boolean {
    return false;
    // let isMatch = false;

    // if (this.showResults && !this.isMasterBracket() && this.isDetailMode() && this.masterBracket) {
    //   if (conference === -1) {
    //     // Check overall winner
    //     if (_.get(this.masterBracket, 'winner.name') === null ||
    //         this.bracket.winner.name ===
    //         _.get(this.masterBracket, 'winner.name')) {
    //       isMatch = true;
    //     }
    //   } else if (division === -1) {
    //     // Check conference winners
    //     if (_.get(this.masterBracket, `conferences[${conference}].winner.name`) === null ||
    //         this.bracket.conferences[conference].winner.name ===
    //         _.get(this.masterBracket, `conferences[${conference}].winner.name`)) {
    //       isMatch = true;
    //     }
    //   } else if (round === -1) {
    //     // Check division winners
    //     if (_.get(this.masterBracket, `conferences[${conference}].divisions[${division}].winner.name`) === null ||
    //         this.bracket.conferences[conference].divisions[division].winner.name ===
    //         _.get(this.masterBracket, `conferences[${conference}].divisions[${division}].winner.name`)) {
    //       isMatch = true;
    //     }
    //   } else {
    //     // Check round 2 winners
    //     if (isTopSeed ?
    //           _.get(this.masterBracket, `conferences[${conference}].divisions[${division}].rounds[${round}].matchups[${matchup}].topSeed.name`) !== null :
    //           _.get(this.masterBracket, `conferences[${conference}].divisions[${division}].rounds[${round}].matchups[${matchup}].bottomSeed.name`) !== null) {
    //       if (isTopSeed ?
    //             this.bracket.conferences[conference].divisions[division].rounds[round].matchups[matchup].topSeed.name ===
    //             _.get(this.masterBracket, `conferences[${conference}].divisions[${division}].rounds[${round}].matchups[${matchup}].topSeed.name`) :
    //             this.bracket.conferences[conference].divisions[division].rounds[round].matchups[matchup].bottomSeed.name ===
    //             _.get(this.masterBracket, `conferences[${conference}].divisions[${division}].rounds[${round}].matchups[${matchup}].bottomSeed.name`)) {
    //         isMatch = true;
    //       }
    //     }
    //   }
    // }

    // return this.showResults ? isMatch : true;
  }

  isPastDeadline(): boolean {
    const today = new Date();

    return today.getTime() > DEADLINE.getTime();
  }

  loadBracketData(bracketData: Bracket): void {
    if (bracketData) {
      this.bracket = bracketData;
      this.canEdit = this.canUserEdit(bracketData.owner?.email);

      if (!this.canEdit && this.isEditMode()) {
        this.location.replaceState(`/bracket/${this.key}`);
        this.viewMode = VIEW_MODES.DETAIL;
      }

      this.bracketForm.patchValue({
        bracketName: bracketData.name,
        totalGamesA1: bracketData.conferences?.[0].divisions?.[0].rounds?.[0].matchups?.[0].games,
        totalGamesA2: bracketData.conferences?.[0].divisions?.[0].rounds?.[0].matchups?.[1].games,
        totalGamesA3: bracketData.conferences?.[0].divisions?.[0].rounds?.[1].matchups?.[0].games,
        totalGamesAB: bracketData.conferences?.[0].games,
        totalGamesB1: bracketData.conferences?.[0].divisions?.[1].rounds?.[0].matchups?.[0].games,
        totalGamesB2: bracketData.conferences?.[0].divisions?.[1].rounds?.[0].matchups?.[1].games,
        totalGamesB3: bracketData.conferences?.[0].divisions?.[1].rounds?.[1].matchups?.[0].games,
        totalGamesC1: bracketData.conferences?.[1].divisions?.[0].rounds?.[0].matchups?.[0].games,
        totalGamesC2: bracketData.conferences?.[1].divisions?.[0].rounds?.[0].matchups?.[1].games,
        totalGamesC3: bracketData.conferences?.[1].divisions?.[0].rounds?.[1].matchups?.[0].games,
        totalGamesCD: bracketData.conferences?.[1].games,
        totalGamesD1: bracketData.conferences?.[1].divisions?.[1].rounds?.[0].matchups?.[0].games,
        totalGamesD2: bracketData.conferences?.[1].divisions?.[1].rounds?.[0].matchups?.[1].games,
        totalGamesD3: bracketData.conferences?.[1].divisions?.[1].rounds?.[1].matchups?.[0].games,
        totalGamesFinal: bracketData.games,
        totalGoalsFinal: bracketData.goals
      });
    } else {
      this.router.navigate(['/']);
    }
  }

  pickTeam(round: number, division: number, matchupId: number): void {}

  setupBracket(): void {
    if (this.key) {
      // Check for special keys
      if (this.key === 'mock') {
        this.loadBracketData(BracketMock);
        this.canEdit = true;
      } else {
        if (this.isAdmin) {
          if (this.key === 'master') {
            // this.key = KEYS.MASTER;
          } else if (this.key === 'dummy') {
            this.key = KEYS.DUMMY;
          }
        }

        if (this.key !== 'master') { // remove this
          this.getBracketFromServer(this.key);
        }
      }

      if (!this.isMasterBracket()) {
        // Load the master bracket
        // this.getBracketFromServer(KEYS.MASTER, true);
        this.masterBracket = BracketMockMaster;
      }
    } else {
      // Create mode
      if (this.isPastDeadline()) {
        this.router.navigate(['/']);
      } else {
        this.viewMode = VIEW_MODES.CREATE;
        this.bracket = {
          isComplete: false,
          isPaid: false,
          isTiebreakerComplete: false,
          owner: {
            email: this.authService.username,
            name: this.authService.username.split('@')[0]
          }
        } as Bracket;
      }
    }
  }

  submitBracket(): void {}
}

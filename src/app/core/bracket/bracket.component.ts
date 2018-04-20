import * as _ from 'lodash';
import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/take';

import { AuthService } from '../../auth/auth.service';
import { Bracket } from '../../models/bracket.model';
import { BracketMapper } from './data/bracket-mapper';
import { BracketNameValidator } from './bracket-name-validator';
import { BracketChecker } from './bracket-checker';
import { KEYS } from '../../constants/global.constants';
import { VIEW_MODES } from '../../constants/form.constants';

// Bracket data
import { BracketMock } from './data/bracket-mock';
import { BlankNHLBracket } from './data/blank-nhl-bracket';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss']
})
export class BracketComponent implements OnInit, OnDestroy {
  bracket: Bracket;
  bracketForm: FormGroup;
  canEdit: boolean;
  key: string;
  masterBracket: Bracket;
  navigationSubscription: Subscription;
  pastDeadline: boolean;
  showResults = false;
  viewMode: string;

  constructor(private authService: AuthService,
    private db: AngularFireDatabase,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location) {
    this.navigationSubscription = this.router.events.subscribe((evt: any) => {
      if (evt instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.key = params['key'];
      this.canEdit = false;
      this.pastDeadline = true;
      this.viewMode = location.pathname.indexOf('/edit') !== -1 ? VIEW_MODES.EDIT : VIEW_MODES.DETAIL;

      this.bracketForm = new FormGroup({
        bracketName: new FormControl(null, [Validators.required, BracketNameValidator.checkBracketName]),
        numberOfGames001: new FormControl(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
        numberOfGames002: new FormControl(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
        numberOfGames003: new FormControl(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
        numberOfGames004: new FormControl(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
        numberOfGames011: new FormControl(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
        numberOfGames012: new FormControl(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
        numberOfGames013: new FormControl(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
        numberOfGames101: new FormControl(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
        numberOfGames102: new FormControl(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
        numberOfGames103: new FormControl(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
        numberOfGames104: new FormControl(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
        numberOfGames111: new FormControl(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
        numberOfGames112: new FormControl(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
        numberOfGames113: new FormControl(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
        numberOfGamesFinal: new FormControl(null, [Validators.pattern(/\d/), Validators.min(4), Validators.max(7)]),
        numberOfGoalsFinal: new FormControl(null, [Validators.pattern(/\d+/), Validators.min(4)])
      });

      if (this.key) {
        // Load bracket data
        if (this.key === 'mock') {
          this.bracket = _.cloneDeep(BracketMock);
          this.canEdit = true;
        } else {
          if (this.key === 'master') {
            // Master bracket key
            this.key = KEYS.MASTER;
          } else if (this.key === 'dummy') {
            this.key = KEYS.DUMMY;
          }

          this.db.object(`bracket/${this.key}`).snapshotChanges().take(1).subscribe(data => {
            const bracket = data.payload.val();

            if (bracket) {
              // Load bracket
              this.bracket = BracketMapper(bracket);

              if (!this.pastDeadline && this.bracket.owner === this.authService.getUsername()) {
                this.canEdit = true;
              } else if (this.isEditMode()) {
                this.router.navigate(['bracket', this.key]);
              }

              this.bracketForm.patchValue({
                bracketName: this.bracket.name,
                numberOfGames001: this.bracket.conferences[0].divisions[0].rounds[0].matchups[0].games,
                numberOfGames002: this.bracket.conferences[0].divisions[0].rounds[0].matchups[1].games,
                numberOfGames003: this.bracket.conferences[0].divisions[0].rounds[1].matchups[0].games,
                numberOfGames004: this.bracket.conferences[0].games,
                numberOfGames011: this.bracket.conferences[0].divisions[1].rounds[0].matchups[0].games,
                numberOfGames012: this.bracket.conferences[0].divisions[1].rounds[0].matchups[1].games,
                numberOfGames013: this.bracket.conferences[0].divisions[1].rounds[1].matchups[0].games,
                numberOfGames101: this.bracket.conferences[1].divisions[0].rounds[0].matchups[0].games,
                numberOfGames102: this.bracket.conferences[1].divisions[0].rounds[0].matchups[1].games,
                numberOfGames103: this.bracket.conferences[1].divisions[0].rounds[1].matchups[0].games,
                numberOfGames104: this.bracket.conferences[1].games,
                numberOfGames111: this.bracket.conferences[1].divisions[1].rounds[0].matchups[0].games,
                numberOfGames112: this.bracket.conferences[1].divisions[1].rounds[0].matchups[1].games,
                numberOfGames113: this.bracket.conferences[1].divisions[1].rounds[1].matchups[0].games,
                numberOfGamesFinal: this.bracket.games,
                numberOfGoalsFinal: this.bracket.goals
              });
            } else {
              this.router.navigate(['/']);
            }
          });

          if (this.key !== KEYS.MASTER) {
            // Load the master bracket
            this.db.object(`bracket/${KEYS.MASTER}`).snapshotChanges().take(1).subscribe(data => {
              const masterBracket = data.payload.val();

              if (masterBracket) {
                this.masterBracket = BracketMapper(masterBracket);
              }
            });
          }
        }
      } else {
        // Create mode
        if (this.pastDeadline) {
          this.router.navigate(['/']);
        } else {
          this.viewMode = VIEW_MODES.CREATE;
          this.bracket = _.cloneDeep(BlankNHLBracket);
          this.bracket.owner = this.authService.getUsername();
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  cancel() {
    if (this.isEditMode()) {
      this.router.navigate(['bracket', this.key]);
    } else {
      this.router.navigate(['/']);
    }
  }

  clearTeam(team, conference, division, round) {
    if (round === 0 &&
      this.bracket.conferences[conference].divisions[division].winner.seed === team.seed &&
      this.bracket.conferences[conference].divisions[division].winner.name === team.name) {
        this.bracket.conferences[conference].divisions[division].winner.clear();
      }

    if (round <= 1 &&
      this.bracket.conferences[conference].winner.seed === team.seed &&
      this.bracket.conferences[conference].winner.name === team.name) {
        this.bracket.conferences[conference].winner.clear();
    }

    if (round <= 2 &&
      this.bracket.winner.seed === team.seed &&
      this.bracket.winner.name === team.name) {
        this.bracket.winner.clear();
      }
    }

  editBracket() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  getClassMatchingMaster(conference: number = -1, division: number = -1, round: number = -1, matchup: number = -1, isTopSeed: boolean = true) {
    const errorClass = 'text-danger',
      successClass = 'text-success';
    let cssClass: string = null;

    if (this.showResults && this.key !== KEYS.MASTER && this.isDetailMode() && this.masterBracket) {
      if (conference === -1) {
        // Check overall winner
        if (_.get(this.masterBracket, 'winner.name') !== null) {
          if (this.bracket.winner.name ===
              _.get(this.masterBracket, `winner.name`)) {
            cssClass = successClass;
          } else {
            cssClass = errorClass;
          }
        } else {
          // Check everything....
          _.some(this.bracket.conferences, (conf, confIdx) => {
            return _.some(this.bracket.conferences[confIdx].divisions, (div, divIdx) => {
              // Check division winner
              if (_.get(this.masterBracket, `conferences[${confIdx}].divisions[${divIdx}].winner.name`) !== null) {
                if (this.bracket.winner.name ===
                    this.bracket.conferences[confIdx].divisions[divIdx].winner.name &&
                    this.bracket.conferences[confIdx].divisions[divIdx].winner.name !==
                    _.get(this.masterBracket, `conferences[${confIdx}].divisions[${divIdx}].winner.name`)) {
                  cssClass = errorClass;
                  return true;
                }
              }
              // Check matchup top seed
              if (_.get(this.masterBracket, `conferences[${confIdx}].divisions[${divIdx}].rounds[1].matchups[0].topSeed.name`) !== null) {
                if (this.bracket.winner.name ===
                    this.bracket.conferences[confIdx].divisions[divIdx].rounds[1].matchups[0].topSeed.name &&
                    this.bracket.conferences[confIdx].divisions[divIdx].rounds[1].matchups[0].topSeed.name !==
                    _.get(this.masterBracket, `conferences[${confIdx}].divisions[${divIdx}].rounds[1].matchups[0].topSeed.name`)) {
                  cssClass = errorClass;
                  return true;
                }
              }
              // Check bottom seed
              if (_.get(this.masterBracket, `conferences[${confIdx}].divisions[${divIdx}].rounds[1].matchups[0].bottomSeed.name`) !== null) {
                if (this.bracket.winner.name ===
                    this.bracket.conferences[confIdx].divisions[divIdx].rounds[1].matchups[0].bottomSeed.name &&
                    this.bracket.conferences[confIdx].divisions[divIdx].rounds[1].matchups[0].bottomSeed.name !==
                    _.get(this.masterBracket, `conferences[${confIdx}].divisions[${divIdx}].rounds[1].matchups[0].bottomSeed.name`)) {
                  cssClass = errorClass;
                  return true;
                }
              }
            });
          });
        }
      } else if (division === -1) {
        // Check conference winners
        if (_.get(this.masterBracket, `conferences[${conference}].winner.name`) !== null) {
          if (this.bracket.conferences[conference].winner.name ===
              _.get(this.masterBracket, `conferences[${conference}].winner.name`)) {
            cssClass = successClass;
          } else {
            cssClass = errorClass;
          }
        } else {
          // Check division winners and matchup winners under same conference
          _.some(this.bracket.conferences[conference].divisions, (div, idx) => {
            // Check division winner
            if (_.get(this.masterBracket, `conferences[${conference}].divisions[${idx}].winner.name`) !== null) {
              if (this.bracket.conferences[conference].winner.name ===
                  this.bracket.conferences[conference].divisions[idx].winner.name &&
                  this.bracket.conferences[conference].divisions[idx].winner.name !==
                  _.get(this.masterBracket, `conferences[${conference}].divisions[${idx}].winner.name`)) {
                cssClass = errorClass;
                return true;
              }
            }
            // Check matchup top seed
            if (_.get(this.masterBracket, `conferences[${conference}].divisions[${idx}].rounds[1].matchups[0].topSeed.name`) !== null) {
              if (this.bracket.conferences[conference].winner.name ===
                  this.bracket.conferences[conference].divisions[idx].rounds[1].matchups[0].topSeed.name &&
                  this.bracket.conferences[conference].divisions[idx].rounds[1].matchups[0].topSeed.name !==
                  _.get(this.masterBracket, `conferences[${conference}].divisions[${idx}].rounds[1].matchups[0].topSeed.name`)) {
                cssClass = errorClass;
                return true;
              }
            }
            // Check bottom seed
            if (_.get(this.masterBracket, `conferences[${conference}].divisions[${idx}].rounds[1].matchups[0].bottomSeed.name`) !== null) {
              if (this.bracket.conferences[conference].winner.name ===
                  this.bracket.conferences[conference].divisions[idx].rounds[1].matchups[0].bottomSeed.name &&
                  this.bracket.conferences[conference].divisions[idx].rounds[1].matchups[0].bottomSeed.name !==
                  _.get(this.masterBracket, `conferences[${conference}].divisions[${idx}].rounds[1].matchups[0].bottomSeed.name`)) {
                cssClass = errorClass;
                return true;
              }
            }
          });
        }
      } else if (round === -1) {
        // Check division winners
        if (_.get(this.masterBracket, `conferences[${conference}].divisions[${division}].winner.name`) !== null) {
          if (this.bracket.conferences[conference].divisions[division].winner.name ===
              _.get(this.masterBracket, `conferences[${conference}].divisions[${division}].winner.name`)) {
            cssClass = successClass;
          } else {
            cssClass = errorClass;
          }
        } else {
          // Check matchups in division
          // Check top seed
          if (_.get(this.masterBracket, `conferences[${conference}].divisions[${division}].rounds[1].matchups[0].topSeed.name`) !== null) {
            if (this.bracket.conferences[conference].divisions[division].winner.name ===
                this.bracket.conferences[conference].divisions[division].rounds[1].matchups[0].topSeed.name &&
                this.bracket.conferences[conference].divisions[division].rounds[1].matchups[0].topSeed.name !==
                _.get(this.masterBracket, `conferences[${conference}].divisions[${division}].rounds[1].matchups[0].topSeed.name`)) {
              cssClass = errorClass;
            }
          }
          // Check bottom seed
          if (!cssClass && _.get(this.masterBracket, `conferences[${conference}].divisions[${division}].rounds[1].matchups[0].bottomSeed.name`) !== null) {
            if (this.bracket.conferences[conference].divisions[division].winner.name ===
                this.bracket.conferences[conference].divisions[division].rounds[1].matchups[0].bottomSeed.name &&
                this.bracket.conferences[conference].divisions[division].rounds[1].matchups[0].bottomSeed.name !==
                _.get(this.masterBracket, `conferences[${conference}].divisions[${division}].rounds[1].matchups[0].bottomSeed.name`)) {
              cssClass = errorClass;
            }
          }
        }
      } else {
        // Check round 2 winners
        if (isTopSeed ?
              _.get(this.masterBracket, `conferences[${conference}].divisions[${division}].rounds[${round}].matchups[${matchup}].topSeed.name`) !== null :
              _.get(this.masterBracket, `conferences[${conference}].divisions[${division}].rounds[${round}].matchups[${matchup}].bottomSeed.name`) !== null) {
          if (isTopSeed ?
                this.bracket.conferences[conference].divisions[division].rounds[round].matchups[matchup].topSeed.name ===
                _.get(this.masterBracket, `conferences[${conference}].divisions[${division}].rounds[${round}].matchups[${matchup}].topSeed.name`) :
                this.bracket.conferences[conference].divisions[division].rounds[round].matchups[matchup].bottomSeed.name ===
                _.get(this.masterBracket, `conferences[${conference}].divisions[${division}].rounds[${round}].matchups[${matchup}].bottomSeed.name`)) {
            cssClass = successClass;
          } else {
            cssClass = errorClass;
          }
        }
      }
    }

    return cssClass;
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

  isMasterMatch(conference: number = -1, division: number = -1, round: number = -1, matchup: number = -1, isTopSeed: boolean = true) {
    let isMatch = false;

    if (this.showResults && this.key !== KEYS.MASTER && this.isDetailMode() && this.masterBracket) {
      if (conference === -1) {
        // Check overall winner
        if (_.get(this.masterBracket, 'winner.name') === null ||
            this.bracket.winner.name ===
            _.get(this.masterBracket, 'winner.name')) {
          isMatch = true;
        }
      } else if (division === -1) {
        // Check conference winners
        if (_.get(this.masterBracket, `conferences[${conference}].winner.name`) === null ||
            this.bracket.conferences[conference].winner.name ===
            _.get(this.masterBracket, `conferences[${conference}].winner.name`)) {
          isMatch = true;
        }
      } else if (round === -1) {
        // Check division winners
        if (_.get(this.masterBracket, `conferences[${conference}].divisions[${division}].winner.name`) === null ||
            this.bracket.conferences[conference].divisions[division].winner.name ===
            _.get(this.masterBracket, `conferences[${conference}].divisions[${division}].winner.name`)) {
          isMatch = true;
        }
      } else {
        // Check round 2 winners
        if (isTopSeed ?
              _.get(this.masterBracket, `conferences[${conference}].divisions[${division}].rounds[${round}].matchups[${matchup}].topSeed.name`) !== null :
              _.get(this.masterBracket, `conferences[${conference}].divisions[${division}].rounds[${round}].matchups[${matchup}].bottomSeed.name`) !== null) {
          if (isTopSeed ?
                this.bracket.conferences[conference].divisions[division].rounds[round].matchups[matchup].topSeed.name ===
                _.get(this.masterBracket, `conferences[${conference}].divisions[${division}].rounds[${round}].matchups[${matchup}].topSeed.name`) :
                this.bracket.conferences[conference].divisions[division].rounds[round].matchups[matchup].bottomSeed.name ===
                _.get(this.masterBracket, `conferences[${conference}].divisions[${division}].rounds[${round}].matchups[${matchup}].bottomSeed.name`)) {
            isMatch = true;
          }
        }
      }
    }

    return this.showResults ? isMatch : true;
  }

  pickTeam(conference, division, matchup, isTopSeed = false) {
    switch (matchup) {
      case 1:
        if (isTopSeed) {
          // Top seed picked
          this.clearTeam(
            this.bracket.conferences[conference].divisions[division].rounds[1].matchups[0].topSeed,
            conference,
            division,
            0
          );

          this.bracket.conferences[conference].divisions[division].rounds[1].matchups[0].topSeed.seed =
            this.bracket.conferences[conference].divisions[division].rounds[0].matchups[0].topSeed.seed;
          this.bracket.conferences[conference].divisions[division].rounds[1].matchups[0].topSeed.name =
            this.bracket.conferences[conference].divisions[division].rounds[0].matchups[0].topSeed.name;
        } else {
          // Bottom seed picked
          this.clearTeam(
            this.bracket.conferences[conference].divisions[division].rounds[1].matchups[0].topSeed,
            conference,
            division,
            0
          );

          this.bracket.conferences[conference].divisions[division].rounds[1].matchups[0].topSeed.seed =
            this.bracket.conferences[conference].divisions[division].rounds[0].matchups[0].bottomSeed.seed;
          this.bracket.conferences[conference].divisions[division].rounds[1].matchups[0].topSeed.name =
            this.bracket.conferences[conference].divisions[division].rounds[0].matchups[0].bottomSeed.name;
        }
        break;
      case 2:
        if (isTopSeed) {
          // Top seed picked
          this.clearTeam(
            this.bracket.conferences[conference].divisions[division].rounds[1].matchups[0].bottomSeed,
            conference,
            division,
            0
          );

          this.bracket.conferences[conference].divisions[division].rounds[1].matchups[0].bottomSeed.seed =
            this.bracket.conferences[conference].divisions[division].rounds[0].matchups[1].topSeed.seed;
          this.bracket.conferences[conference].divisions[division].rounds[1].matchups[0].bottomSeed.name =
            this.bracket.conferences[conference].divisions[division].rounds[0].matchups[1].topSeed.name;
        } else {
          // Bottom seed picked
          this.clearTeam(
            this.bracket.conferences[conference].divisions[division].rounds[1].matchups[0].bottomSeed,
            conference,
            division,
            0
          );

          this.bracket.conferences[conference].divisions[division].rounds[1].matchups[0].bottomSeed.seed =
            this.bracket.conferences[conference].divisions[division].rounds[0].matchups[1].bottomSeed.seed;
          this.bracket.conferences[conference].divisions[division].rounds[1].matchups[0].bottomSeed.name =
            this.bracket.conferences[conference].divisions[division].rounds[0].matchups[1].bottomSeed.name;
        }
        break;
      case 3:
        if (isTopSeed) {
          // Top seed picked
          this.clearTeam(
            this.bracket.conferences[conference].divisions[division].winner,
            conference,
            division,
            1
          );

          this.bracket.conferences[conference].divisions[division].winner.seed =
            this.bracket.conferences[conference].divisions[division].rounds[1].matchups[0].topSeed.seed;
          this.bracket.conferences[conference].divisions[division].winner.name =
            this.bracket.conferences[conference].divisions[division].rounds[1].matchups[0].topSeed.name;
        } else {
          // Bottom seed picked
          this.clearTeam(
            this.bracket.conferences[conference].divisions[division].winner,
            conference,
            division,
            1
          );

          this.bracket.conferences[conference].divisions[division].winner.seed =
            this.bracket.conferences[conference].divisions[division].rounds[1].matchups[0].bottomSeed.seed;
          this.bracket.conferences[conference].divisions[division].winner.name =
            this.bracket.conferences[conference].divisions[division].rounds[1].matchups[0].bottomSeed.name;
        }
        break;
      case 4:
        if (isTopSeed) {
          // Top seed picked
          this.clearTeam(
            this.bracket.conferences[conference].winner,
            conference,
            0,
            2
          );

          this.bracket.conferences[conference].winner.seed = this.bracket.conferences[conference].divisions[0].winner.seed;
          this.bracket.conferences[conference].winner.name = this.bracket.conferences[conference].divisions[0].winner.name;
        } else {
          // Bottom seed picked
          this.clearTeam(
            this.bracket.conferences[conference].winner,
            conference,
            1,
            2
          );

          this.bracket.conferences[conference].winner.seed = this.bracket.conferences[conference].divisions[1].winner.seed;
          this.bracket.conferences[conference].winner.name = this.bracket.conferences[conference].divisions[1].winner.name;
        }
        break;
      default:
        if (isTopSeed) { // Top seed is the left side winner in this case
          // Left side winner picked
          this.bracket.winner.seed = this.bracket.conferences[0].winner.seed;
          this.bracket.winner.name = this.bracket.conferences[0].winner.name;
        } else {
          // Right side winner picked
          this.bracket.winner.seed = this.bracket.conferences[1].winner.seed;
          this.bracket.winner.name = this.bracket.conferences[1].winner.name;
        }
    }
  }

  submitBracket() {
    const scoreboard = {
        isComplete: false,
        isTiebreakerComplete: false,
        name: this.bracketForm.value['bracketName'],
        owner: {
          email: this.bracket.owner,
          name: this.bracket.owner.substr(0, this.bracket.owner.indexOf('@'))
        },
        score: this.bracket.score
      },
      updateScoreboard = this.key === KEYS.MASTER || this.key === KEYS.DUMMY ? false : true;

    this.bracket.name = this.bracketForm.value['bracketName'];
    this.bracket.conferences[0].divisions[0].rounds[0].matchups[0].games = this.bracketForm.value['numberOfGames001'];
    this.bracket.conferences[0].divisions[0].rounds[0].matchups[1].games = this.bracketForm.value['numberOfGames002'];
    this.bracket.conferences[0].divisions[0].rounds[1].matchups[0].games = this.bracketForm.value['numberOfGames003'];
    this.bracket.conferences[0].games = this.bracketForm.value['numberOfGames004'];
    this.bracket.conferences[0].divisions[1].rounds[0].matchups[0].games = this.bracketForm.value['numberOfGames011'];
    this.bracket.conferences[0].divisions[1].rounds[0].matchups[1].games = this.bracketForm.value['numberOfGames012'];
    this.bracket.conferences[0].divisions[1].rounds[1].matchups[0].games = this.bracketForm.value['numberOfGames013'];
    this.bracket.conferences[1].divisions[0].rounds[0].matchups[0].games = this.bracketForm.value['numberOfGames101'];
    this.bracket.conferences[1].divisions[0].rounds[0].matchups[1].games = this.bracketForm.value['numberOfGames102'];
    this.bracket.conferences[1].divisions[0].rounds[1].matchups[0].games = this.bracketForm.value['numberOfGames103'];
    this.bracket.conferences[1].games = this.bracketForm.value['numberOfGames104'];
    this.bracket.conferences[1].divisions[1].rounds[0].matchups[0].games = this.bracketForm.value['numberOfGames111'];
    this.bracket.conferences[1].divisions[1].rounds[0].matchups[1].games = this.bracketForm.value['numberOfGames112'];
    this.bracket.conferences[1].divisions[1].rounds[1].matchups[0].games = this.bracketForm.value['numberOfGames113'];
    this.bracket.games = this.bracketForm.value['numberOfGamesFinal'];
    this.bracket.goals = this.bracketForm.value['numberOfGoalsFinal'];

    scoreboard.isComplete = BracketChecker.isBracketComplete(this.bracket, false);
    scoreboard.isTiebreakerComplete = BracketChecker.isBracketComplete(this.bracket);

    if (this.viewMode === VIEW_MODES.CREATE) {
      this.db.list('bracket').push(this.bracket)
        .then((response) => {
          this.db.object(`scoreboard/${response.key}`).update(scoreboard)
            .then(() => this.router.navigate([`/bracket/${response.key}`]), error => console.log(error));
        }, error => console.log(error));
    } else if (this.viewMode === VIEW_MODES.EDIT) {
      this.db.object(`bracket/${this.key}`).update(this.bracket)
        .then(() => {
          if (updateScoreboard) {
            this.db.object(`scoreboard/${this.key}`).update(scoreboard)
              .then(() => this.router.navigate([`/bracket/${this.key}`]));
          } else {
            this.router.navigate([`/bracket/${this.key}`]);
          }
        }).catch(error => console.log(error));
    }
  }

  toggleResults(toggleStatus: boolean) {
    this.showResults = toggleStatus;
  }
}

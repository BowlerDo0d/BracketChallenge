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
  key: string;
  bracket: Bracket;
  bracketForm: FormGroup;
  canEdit: boolean;
  navigationSubscription: Subscription;
  pastDeadline: boolean;
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
        numberOfGoalsFinal: new FormControl(null, [Validators.pattern(/\d+/), Validators.min(7)])
      });

      if (this.key) {
        // Load bracket data
        if (this.key === 'mock') {
          this.bracket = _.cloneDeep(BracketMock);
          this.canEdit = true;
        } else {
          if (this.key === 'master') {
            // Master bracket key
            this.key = '-LA-gCwWEEZxe5jUmj39';
          } else if (this.key === 'dummy') {
            this.key = '-LA-iP4kxzQ65R1x2ad6';
          }

          this.db.object(`bracket/${this.key}`).snapshotChanges().take(1).subscribe(data => {
            const bracket = data.payload.val();

            if (bracket) {
              // Load bracket
              this.bracket = BracketMapper(bracket);

              if ((this.authService.getUsername() === 'pfeifert@gmail.com' || !this.pastDeadline) && this.bracket.owner === this.authService.getUsername()) {
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
        }
      } else {
        // Create mode
        if (this.authService.getUsername() !== 'pfeifert@gmail.com' && this.pastDeadline) {
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

  isBracketNameTaken() {
    return this.bracketForm.get('bracketName').errors && this.bracketForm.get('bracketName').errors.bracket_name_exists;
  }

  isDetailMode() {
    return this.viewMode === VIEW_MODES.DETAIL;
  }

  isEditMode() {
    return this.viewMode === VIEW_MODES.EDIT;
  }

  pickTeam(conference, division, matchup, topSeed = false) {
    switch (matchup) {
      case 1:
        if (topSeed) {
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
        if (topSeed) {
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
        if (topSeed) {
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
        if (topSeed) {
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
        if (topSeed) { // Top seed is the left side winner in this case
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
      updateScoreboard = this.key === '-LA-gCwWEEZxe5jUmj39' || this.key === '-LA-iP4kxzQ65R1x2ad6' ? false : true;

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
}

import { AngularFireDatabase } from '@angular/fire/database';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { SORT_TYPES } from './team-manager.constants';
import { TeamEditorComponent } from './team-editor/team-editor.component';

enum Fields {
  Conference = 'conference_full_name',
  Division = 'conference_division_full_name',
  Overall = 'full_name'
}

@Component({
  selector: 'team-manager',
  templateUrl: './team-manager.component.html',
  styleUrls: ['./team-manager.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TeamManagerComponent implements OnInit {
  readonly Fields = Fields;
  readonly SORT_TYPES = SORT_TYPES;

  activeSort: number = SORT_TYPES.DIVISION;
  field$: BehaviorSubject<Fields>;
  isExtraSmall: Observable<BreakpointState>;
  teams$: Observable<ITeam[]>;

  constructor(private db: AngularFireDatabase, public dialog: MatDialog, private readonly breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.field$ = new BehaviorSubject(Fields.Division);
    this.teams$ = this.field$.pipe(
      switchMap((field) => {
        return this.db.list<ITeam>('lookups/teams', ref => ref.orderByChild(field))
          .snapshotChanges()
          .pipe(
            map((data) => data.map(d => ({
              key: d.key,
              ...d.payload.val()
            })))
          );
      })
    );
    this.isExtraSmall = this.breakpointObserver.observe(Breakpoints.XSmall);
  }

  addTeam(): void {
    this.openDialog();
  }

  changeSort(newSort: number): void {
    this.activeSort = newSort;

    switch (newSort) {
      case SORT_TYPES.DIVISION:
        this.field$.next(Fields.Division);
        break;
      case SORT_TYPES.CONFERENCE:
        this.field$.next(Fields.Conference);
        break;
      default:
        this.field$.next(Fields.Overall);
    }
  }

  editTeam(team: ITeam): void {
    this.openDialog(team);
  }

  logoName(team: ITeam): string {
    return (team.location && team.name) ?
      `${team.location.replace(/\s/g, '-').toLowerCase()}-${team.name.replace(/\s/g, '-').toLowerCase()}` :
      null;
  }

  showDivider(team: ITeam, nextTeam: ITeam, last: boolean): boolean {
    switch (this.field$.value) {
      case Fields.Division:
        return team && nextTeam && team.division === nextTeam.division;
      case Fields.Conference:
        return team && nextTeam && team.conference === nextTeam.conference;
      default:
        return !last;
    }
  }

  trackByKey(index: number, item: ITeam) {
    return item.key;
  }

  private openDialog(teamInfo: ITeam = null): void {
    const dialogRef: MatDialogRef<TeamEditorComponent, void> = this.dialog.open(TeamEditorComponent, {
        disableClose: true,
        data: {
          ...teamInfo
        }
      }),
      size$: Subscription = this.isExtraSmall.subscribe((size) => {
        if (size.matches) {
          dialogRef.updateSize('100vw', 'calc(100vh - 50px)');
        } else {
          dialogRef.updateSize();
        }
      });

    dialogRef.beforeClosed().subscribe(() => {
      this.field$.next(this.field$.value);
    });

    dialogRef.afterClosed().subscribe(() => {
      size$.unsubscribe();
    });
  }
}

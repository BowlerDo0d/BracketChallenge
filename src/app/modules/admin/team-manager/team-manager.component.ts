import { forEach, groupBy } from 'lodash';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Observable, BehaviorSubject } from 'rxjs';
import { TeamEditorComponent } from './team-editor/team-editor.component';
import { MatTabChangeEvent } from '@angular/material/tabs';

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

  field$: BehaviorSubject<Fields>;
  teams$: Observable<ITeam[]>;

  constructor(private db: AngularFireDatabase, public dialog: MatDialog) { }

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
  }

  addTeam(): void {
    this.dialog.open(TeamEditorComponent, {
      disableClose: true
    });
  }

  changeView(evt: MatTabChangeEvent): void {
    switch (evt.index) {
      case 0:
        this.field$.next(Fields.Division);
        break;
      case 1:
        this.field$.next(Fields.Conference);
        break;
      default:
        this.field$.next(Fields.Overall);
    }
  }

  editTeam(team: ITeam): void {
    this.dialog.open(TeamEditorComponent, {
      disableClose: true,
      data: {
        ...team
      }
    });
  }

  logoName(team: ITeam): string {
    return (team.location && team.name) ?
      `${team.location.replace(/\s/g, '-').toLowerCase()}-${team.name.replace(/\s/g, '-').toLowerCase()}` :
      null;
  }

  trackByKey(index: number, item: ITeam) {
    return item.key;
  }
}

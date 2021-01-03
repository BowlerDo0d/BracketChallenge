import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, take, first } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'team-editor',
  templateUrl: './team-editor.component.html',
  styleUrls: ['./team-editor.component.scss']
})
export class TeamEditorComponent implements OnInit {
  conferences: IConference[];
  teamFormGroup: FormGroup;

  constructor(
    private db: AngularFireDatabase,
    public dialogRef: MatDialogRef<TeamEditorComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: ITeam,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.db.list<IConference>('lookups/conferences')
      .snapshotChanges()
      .pipe(
        take(1),
        map((data) => data.map(d => d.payload.val()))
      )
      .subscribe((conferences) => {
        this.conferences = conferences;
      });

    this.teamFormGroup = new FormGroup({
      abbreviation: new FormControl(null, [Validators.required, Validators.maxLength(3)]),
      conference: new FormControl(null),
      division: new FormControl(null, Validators.required),
      location: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      nickname: new FormControl()
    });

    this.teamFormGroup.get('division').valueChanges.subscribe((newValue) => {
      const conferenceField = this.teamFormGroup.get('conference');
      conferenceField.reset();

      this.conferences.some((conference) => {
        conference.divisions.some((division) => {
          if (division.name === newValue) {
            conferenceField.setValue(conference.name);

            return true;
          }
        });

        return !!conferenceField.value;
      });
    });

    this.teamFormGroup.get('abbreviation').valueChanges.subscribe((newValue) => {
      this.teamFormGroup.get('abbreviation').setValue(newValue.toUpperCase(), { emitEvent: false });
    });

    if (this.dialogData) {
      this.teamFormGroup.patchValue({
        abbreviation: this.dialogData.abbreviation,
        conference: this.dialogData.conference,
        division: this.dialogData.division,
        location: this.dialogData.location,
        name: this.dialogData.name,
        nickname: this.dialogData.nickname
      }, { emitEvent: false });
    }
  }

  get logo(): string {
    const location = this.teamFormGroup.get('location').value,
      name = this.teamFormGroup.get('name').value;

    return (location && name) ? `${location.replace(/\s/g, '-').toLowerCase()}-${name.replace(/\s/g, '-').toLowerCase()}` : null;
  }

  save(): void {
    if (this.teamFormGroup.valid) {
      const fullName = `${this.teamFormGroup.get('location').value.toLowerCase()} ${this.teamFormGroup.get('name').value.toLowerCase()}`,
        confFullName = (`${this.teamFormGroup.get('conference').value.toLowerCase()}-` +
          `${this.teamFormGroup.get('location').value.toLowerCase()}-` +
          `${this.teamFormGroup.get('name').value.toLowerCase()}`).replace(/\s/g, '-'),
        confDivFullName = (`${this.teamFormGroup.get('conference').value.toLowerCase()}-` +
          `${this.teamFormGroup.get('division').value.toLowerCase()}-` +
          `${this.teamFormGroup.get('location').value.toLowerCase()}-` +
          `${this.teamFormGroup.get('name').value.toLowerCase()}`).replace(/\s/g, '-');

      this.db.list('lookups/teams', ref => ref.orderByChild('full_name').equalTo(fullName))
          .snapshotChanges()
          .pipe(first())
          .subscribe((snap) => {
            if (snap.length && (!this.dialogData || snap[0].key !== this.dialogData.key)) {
              this.snackBar.open(
                'Team already exists!',
                null,
                {
                  duration: 5000,
                  panelClass: ['bc-snackbar', 'bc-error']
                }
              );
            } else {
              if (this.dialogData && this.dialogData.key) {
                this.db.object(`lookups/teams/${this.dialogData.key}`).update({
                  abbreviation: this.teamFormGroup.value.abbreviation || null,
                  conference_division_full_name: confDivFullName,
                  conference_full_name: confFullName,
                  division: this.teamFormGroup.value.division || null,
                  full_name: fullName,
                  location: this.teamFormGroup.value.location || null,
                  name: this.teamFormGroup.value.name || null,
                  nickname: this.teamFormGroup.value.nickname || null
                })
                .then(() => {
                  this.snackBar.open(
                    'Team updated!',
                    null,
                    {
                      duration: 2500,
                      panelClass: ['bc-snackbar', 'bc-success']
                    }
                  );
                  this.dialogRef.close();
                });
              } else {
                this.db.list('lookups/teams').push({
                  full_name: fullName,
                  ...this.teamFormGroup.value
                })
                .then(() => {
                  this.snackBar.open(
                    'Team added!',
                    null,
                    {
                      duration: 2500,
                      panelClass: ['bc-snackbar', 'bc-success']
                    }
                  );

                  this.dialogRef.close();
                });
              }
            }
          });
    }
  }
}

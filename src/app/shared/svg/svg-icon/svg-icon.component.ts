import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss']
})
export class SvgIconComponent implements OnInit {
  logos: string[] = [];
  @Input() iconSize = 35;
  @Input() name: string;

  constructor(private db: AngularFireDatabase) {}

  ngOnInit(): void {
    this.db.list<string>('lookups/logos')
      .snapshotChanges()
      .pipe(
        take(1),
        map((data) => data.map(d => d.payload.val()))
      )
      .subscribe((logos) => {
        this.logos = logos;
      });
  }

  get href() {
    return this.logos.includes(this.name) ? `#${this.name}` : '#nhl';
  }
}

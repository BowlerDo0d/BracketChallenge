import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  data: any[];
  displayedColumns: string[];

  constructor() { }

  ngOnInit(): void {
    this.displayedColumns = ['round', 'points'];
    this.data = [
      { round: 'Stanley Cup Champions', points: 16 },
      { round: 'Conference Winner', points: 8 },
      { round: 'Division Winner', points: 4 },
      { round: 'Round 1', points: 2 },
      { round: 'Games Per Series', points: 1 }
    ];
  }
}

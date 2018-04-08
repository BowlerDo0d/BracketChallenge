import { Bracket } from '../../../models/bracket.model';
import { Team } from '../../../models/team.model';
import { Conference } from '../../../models/conference.model';
import { Division } from '../../../models/division.model';
import { Round } from '../../../models/round.model';
import { Matchup } from '../../../models/matchup.model';

export const BracketMock: Bracket = new Bracket(
  'My Mock Bracket',
  'Me',
  [new Conference('Western Conference', [
    new Division('Pacific Division', [
      new Round('Round 1', [
        new Matchup(1, new Team(1, 'Team 1'), new Team(8, 'Team 8')),
        new Matchup(2, new Team(4, 'Team 4'), new Team(5, 'Team 5'))
      ]),
      new Round('Quarterfinals', [
        new Matchup(3, new Team(), new Team())
      ])
    ]),
    new Division('Central Division', [
      new Round('Round 1', [
        new Matchup(1, new Team(3, 'Team 3'), new Team(6, 'Team 6')),
        new Matchup(2, new Team(2, 'Team 2'), new Team(7, 'Team 7'))
      ]),
      new Round('Quarterfinals', [
        new Matchup(3, new Team(), new Team())
      ])
    ])
  ]),
  new Conference('Eastern Conference', [
    new Division('Atlantic Division', [
      new Round('Round 1', [
        new Matchup(1, new Team(1, 'Team 1'), new Team(8, 'Team 8')),
        new Matchup(2, new Team(4, 'Team 4'), new Team(5, 'Team 5'))
      ]),
      new Round('Quarterfinals', [
        new Matchup(3, new Team(), new Team())
      ])
    ]),
    new Division('Metropolitan Division', [
      new Round('Round 1', [
        new Matchup(1, new Team(3, 'Team 3'), new Team(6, 'Team 6')),
        new Matchup(2, new Team(2, 'Team 2'), new Team(7, 'Team 7'))
      ]),
      new Round('Quarterfinals', [
        new Matchup(3, new Team(), new Team())
      ])
    ])
  ])]
);

import { Bracket } from '../../../models/bracket.model';
import { Team } from '../../../models/team.model';
import { Conference } from '../../../models/conference.model';
import { Division } from '../../../models/division.model';
import { Round } from '../../../models/round.model';
import { Matchup } from '../../../models/matchup.model';

export const BlankNHLBracket: Bracket = new Bracket(
  null,
  null,
  [new Conference('Western Conference', [
    new Division('Central Division', [
      new Round('Round 1', [
        new Matchup(1, new Team(1, 'Nashville'), new Team(4, 'Colorado')),
        new Matchup(2, new Team(2, 'Winnipeg'), new Team(3, 'Minnesota'))
      ]),
      new Round('Quarterfinals', [
        new Matchup(3, new Team(), new Team())
      ])
    ]),
    new Division('Pacific Division', [
      new Round('Round 1', [
        new Matchup(1, new Team(1, 'Vegas'), new Team(4, 'Los Angeles')),
        new Matchup(2, new Team(2, 'Anaheim'), new Team(3, 'San Jose'))
      ]),
      new Round('Quarterfinals', [
        new Matchup(3, new Team(), new Team())
      ])
    ])
  ]),
  new Conference('Eastern Conference', [
    new Division('Atlantic Division', [
      new Round('Round 1', [
        new Matchup(1, new Team(1, 'Tampa Bay'), new Team(4, 'New Jersey')),
        new Matchup(2, new Team(2, 'Boston'), new Team(3, 'Toronto'))
      ]),
      new Round('Quarterfinals', [
        new Matchup(3, new Team(), new Team())
      ])
    ]),
    new Division('Metropolitan Division', [
      new Round('Round 1', [
        new Matchup(1, new Team(1, 'Washington'), new Team(4, 'Columbus')),
        new Matchup(2, new Team(2, 'Pittsburgh'), new Team(3, 'Philadelphia'))
      ]),
      new Round('Quarterfinals', [
        new Matchup(3, new Team(), new Team())
      ])
    ])
  ])]
);

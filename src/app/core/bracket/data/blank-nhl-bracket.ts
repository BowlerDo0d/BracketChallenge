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
        new Matchup(1, new Team(1, 'Colorado'), new Team(4, 'Nashville')),
        new Matchup(2, new Team(2, 'Minnesota'), new Team(3, 'St. Louis'))
      ]),
      new Round('Quarterfinals', [
        new Matchup(3, new Team(), new Team())
      ])
    ]),
    new Division('Pacific Division', [
      new Round('Round 1', [
        new Matchup(1, new Team(1, 'Calgary'), new Team(4, 'Dallas')),
        new Matchup(2, new Team(2, 'Edmonton'), new Team(3, 'Los Angeles'))
      ]),
      new Round('Quarterfinals', [
        new Matchup(3, new Team(), new Team())
      ])
    ])
  ]),
  new Conference('Eastern Conference', [
    new Division('Atlantic Division', [
      new Round('Round 1', [
        new Matchup(1, new Team(1, 'Florida'), new Team(4, 'Washington')),
        new Matchup(2, new Team(2, 'Toronto'), new Team(3, 'Tampa Bay'))
      ]),
      new Round('Quarterfinals', [
        new Matchup(3, new Team(), new Team())
      ])
    ]),
    new Division('Metropolitan Division', [
      new Round('Round 1', [
        new Matchup(1, new Team(1, 'Carolina'), new Team(4, 'Boston')),
        new Matchup(2, new Team(2, 'NY Rangers'), new Team(3, 'Pittsburgh'))
      ]),
      new Round('Quarterfinals', [
        new Matchup(3, new Team(), new Team())
      ])
    ])
  ])]
);

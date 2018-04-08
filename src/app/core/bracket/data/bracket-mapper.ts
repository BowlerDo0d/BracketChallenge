import { Bracket } from '../../../models/bracket.model';
import { Conference } from '../../../models/conference.model';
import { Division } from '../../../models/division.model';
import { Round } from '../../../models/round.model';
import { Matchup } from '../../../models/matchup.model';
import { Team } from '../../../models/team.model';

export const BracketMapper = (bracketData): Bracket => {
  const bracket = new Bracket();

  if (bracketData._name) {
    bracket.name = bracketData._name;
  }

  if (bracketData._owner) {
    bracket.owner = bracketData._owner;
  }

  if (bracketData._score) {
    bracket.score = bracketData._score;
  }

  if (bracketData._winner) {
    bracket.winner.seed = bracketData._winner._seed;
    bracket.winner.name = bracketData._winner._name;
  }

  if (bracketData._conferences.length) {
    bracketData._conferences.forEach((conference) => {
      const conf = new Conference(conference._name);

      if (conference._divisions.length) {
        conference._divisions.forEach((division) => {
          const div = new Division(division._name);

          if (division._rounds.length) {
            division._rounds.forEach((round) => {
              const r = new Round(round._name);

              if (round._matchups.length) {
                round._matchups.forEach((matchup) => {
                  const match = new Matchup(matchup._id);

                  if (matchup._topSeed) {
                    match.topSeed.seed = matchup._topSeed._seed;
                    match.topSeed.name = matchup._topSeed._name;
                  }

                  if (matchup._bottomSeed) {
                    match.bottomSeed.seed = matchup._bottomSeed._seed;
                    match.bottomSeed.name = matchup._bottomSeed._name;
                  }

                  r.matchups.push(match);
                });
              }

              div.rounds.push(r);
            });
          }

          if (division._winner) {
            div.winner.seed = division._winner._seed;
            div.winner.name = division._winner._name;
          }

          conf.divisions.push(div);
        });
      }

      if (conference._winner) {
        conf.winner.seed = conference._winner._seed;
        conf.winner.name = conference._winner._name;
      }

      bracket.conferences.push(conf);
    });
  }

  return bracket;
};

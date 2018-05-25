import * as _ from 'lodash';
import { Bracket } from '../../models/bracket.model';

export const BracketChecker = {
  getBracketScore: (bracket: Bracket, masterBracket: Bracket): number => {
    let score = 0;

    masterBracket.conferences.forEach((conference, cIdx) => {
      conference.divisions.forEach((division, dIdx) => {
        if (_.get(division.rounds[1].matchups[0], 'topSeed.name') === bracket.conferences[cIdx].divisions[dIdx].rounds[1].matchups[0].topSeed.name) {
          score += 2;
        }

        if (_.get(division.rounds[1].matchups[0], 'bottomSeed.name') === bracket.conferences[cIdx].divisions[dIdx].rounds[1].matchups[0].bottomSeed.name) {
          score += 2;
        }

        if (_.get(division, 'winner.name') === bracket.conferences[cIdx].divisions[dIdx].winner.name) {
          score += 4;
        }
      });

      if (_.get(conference, 'winner.name') === bracket.conferences[cIdx].winner.name) {
        score += 8;
      }
    });

    if (_.get(masterBracket, 'winner.name') === bracket.winner.name) {
      score += 16;
    }

    return score;
  },
  isBracketComplete: (bracket: Bracket, includeTiebreakers: boolean = true): boolean => {
    const picks = !!(
        _.get(bracket, 'winner.name') &&
        _.get(bracket.conferences[0], 'winner.name') &&
        _.get(bracket.conferences[1], 'winner.name') &&
        _.get(bracket.conferences[0].divisions[0], 'winner.name') &&
        _.get(bracket.conferences[0].divisions[1], 'winner.name') &&
        _.get(bracket.conferences[1].divisions[0], 'winner.name') &&
        _.get(bracket.conferences[1].divisions[1], 'winner.name') &&
        _.get(bracket.conferences[0].divisions[0].rounds[1].matchups[0], 'topSeed.name') &&
        _.get(bracket.conferences[0].divisions[0].rounds[1].matchups[0], 'bottomSeed.name') &&
        _.get(bracket.conferences[0].divisions[1].rounds[1].matchups[0], 'topSeed.name') &&
        _.get(bracket.conferences[0].divisions[1].rounds[1].matchups[0], 'bottomSeed.name') &&
        _.get(bracket.conferences[1].divisions[0].rounds[1].matchups[0], 'topSeed.name') &&
        _.get(bracket.conferences[1].divisions[0].rounds[1].matchups[0], 'bottomSeed.name') &&
        _.get(bracket.conferences[1].divisions[1].rounds[1].matchups[0], 'topSeed.name') &&
        _.get(bracket.conferences[1].divisions[1].rounds[1].matchups[0], 'bottomSeed.name')
      ),
      tiebreakers = !!(
        _.get(bracket, 'games') &&
        _.get(bracket, 'goals') &&
        _.get(bracket.conferences[0], 'games') &&
        _.get(bracket.conferences[0].divisions[0].rounds[1].matchups[0], 'games') &&
        _.get(bracket.conferences[0].divisions[0].rounds[0].matchups[0], 'games') &&
        _.get(bracket.conferences[0].divisions[0].rounds[0].matchups[1], 'games') &&
        _.get(bracket.conferences[0].divisions[1].rounds[1].matchups[0], 'games') &&
        _.get(bracket.conferences[0].divisions[1].rounds[0].matchups[0], 'games') &&
        _.get(bracket.conferences[0].divisions[1].rounds[0].matchups[1], 'games') &&
        _.get(bracket.conferences[1], 'games') &&
        _.get(bracket.conferences[1].divisions[0].rounds[1].matchups[0], 'games') &&
        _.get(bracket.conferences[1].divisions[0].rounds[0].matchups[0], 'games') &&
        _.get(bracket.conferences[1].divisions[0].rounds[0].matchups[1], 'games') &&
        _.get(bracket.conferences[1].divisions[1].rounds[1].matchups[0], 'games') &&
        _.get(bracket.conferences[1].divisions[1].rounds[0].matchups[0], 'games') &&
        _.get(bracket.conferences[1].divisions[1].rounds[0].matchups[1], 'games')
      );

    return picks && (includeTiebreakers ? tiebreakers : true);
  },
  sortBrackets: (a, b) => {
    if (a.score === b.score) {
      return a.tieRank - b.tieRank;
    } else {
      return a.score - b.score;
    }
  }
};

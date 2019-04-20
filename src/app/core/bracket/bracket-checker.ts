import * as _ from 'lodash';
import { Bracket } from '../../models/bracket.model';

export const BracketChecker = {
  getBracketScore: (bracket: Bracket, masterBracket: Bracket): number => {
    let score = 0;

    masterBracket.conferences.forEach((conference, cIdx) => {
      conference.divisions.forEach((division, dIdx) => {
        // Check first round top matchup games
        if (_.get(bracket.conferences[cIdx].divisions[dIdx].rounds[0].matchups[0], 'games') && +_.get(division.rounds[0].matchups[0], 'games') === +_.get(bracket.conferences[cIdx].divisions[dIdx].rounds[0].matchups[0], 'games')) {
          score += 1;
        }

        // Check first round bottom matchup games
        if (_.get(bracket.conferences[cIdx].divisions[dIdx].rounds[0].matchups[1], 'games') && +_.get(division.rounds[0].matchups[1], 'games') === +_.get(bracket.conferences[cIdx].divisions[dIdx].rounds[0].matchups[1], 'games')) {
          score += 1;
        }

        // Check second round (winners of first round) matchup games
        if (_.get(bracket.conferences[cIdx].divisions[dIdx].rounds[1].matchups[0], 'games') && +_.get(division.rounds[1].matchups[0], 'games') === +_.get(bracket.conferences[cIdx].divisions[dIdx].rounds[1].matchups[0], 'games')) {
          score += 1;
        }

        // Check first round top matchup winner
        if (_.get(division.rounds[1].matchups[0], 'topSeed.name') === bracket.conferences[cIdx].divisions[dIdx].rounds[1].matchups[0].topSeed.name) {
          score += 2;
        }

        // Check first round bottom matchup winner
        if (_.get(division.rounds[1].matchups[0], 'bottomSeed.name') === bracket.conferences[cIdx].divisions[dIdx].rounds[1].matchups[0].bottomSeed.name) {
          score += 2;
        }

        // Check second round matchup winner (division winner)
        if (_.get(division, 'winner.name') === bracket.conferences[cIdx].divisions[dIdx].winner.name) {
          score += 4;
        }
      });

      // Check third round matchup games
      if (_.get(bracket.conferences[cIdx], 'games') && +_.get(conference, 'games') === +_.get(bracket.conferences[cIdx], 'games')) {
        score += 1;
      }

      // Check third round matchup winner (conference winner)
      if (_.get(conference, 'winner.name') === bracket.conferences[cIdx].winner.name) {
        score += 8;
      }
    });

    // Check final round matchup games
    if (_.get(bracket, 'games') && +_.get(masterBracket, 'games') === +_.get(bracket, 'games')) {
      score += 1;
    }

    // Check final round matchup winner (cup winner)
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

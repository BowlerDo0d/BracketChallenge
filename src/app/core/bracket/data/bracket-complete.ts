import * as _ from 'lodash';
import { Bracket } from "../../../models/bracket.model";

export const isBracketComplete = (bracket: Bracket, includeTiebreakers: boolean = true): boolean => {
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
  }
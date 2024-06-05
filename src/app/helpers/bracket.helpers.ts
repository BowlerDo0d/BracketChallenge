import { Bracket } from '../models/bracket.model';

export const getBracketScore = (bracket: Bracket, masterBracket: Bracket): number => {
  let score = 0;

  masterBracket.conferences.forEach((conference, cIdx) => {
    conference.divisions.forEach((division, dIdx) => {
      // Check first round top matchup games
      if (bracket?.conferences[cIdx]?.divisions[dIdx]?.rounds[0]?.matchups[0]?.games && +division?.rounds[0]?.matchups[0]?.games === +bracket?.conferences[cIdx]?.divisions[dIdx]?.rounds[0]?.matchups[0]?.games) {
        score += 1;
      }

      // Check first round bottom matchup games
      if (bracket?.conferences[cIdx]?.divisions[dIdx]?.rounds[0]?.matchups[1]?.games && +division?.rounds[0]?.matchups[1]?.games === +bracket?.conferences[cIdx]?.divisions[dIdx]?.rounds[0]?.matchups[1]?.games) {
        score += 1;
      }

      // Check second round (winners of first round) matchup games
      if (bracket?.conferences[cIdx]?.divisions[dIdx]?.rounds[1]?.matchups[0]?.games && +division?.rounds[1]?.matchups[0]?.games === +bracket?.conferences[cIdx]?.divisions[dIdx]?.rounds[1]?.matchups[0]?.games) {
        score += 1;
      }

      // Check first round top matchup winner
      if (division?.rounds[1]?.matchups[0]?.topSeed?.name === bracket?.conferences[cIdx]?.divisions[dIdx]?.rounds[1]?.matchups[0]?.topSeed?.name) {
        score += 2;
      }

      // Check first round bottom matchup winner
      if (division?.rounds[1]?.matchups[0]?.bottomSeed?.name === bracket?.conferences[cIdx]?.divisions[dIdx]?.rounds[1]?.matchups[0]?.bottomSeed?.name) {
        score += 2;
      }

      // Check second round matchup winner (division winner)
      if (division?.winner?.name === bracket?.conferences[cIdx]?.divisions[dIdx]?.winner?.name) {
        score += 4;
      }
    });

    // Check third round matchup games
    if (bracket?.conferences[cIdx]?.games && +conference.games === +bracket?.conferences[cIdx]?.games) {
      score += 1;
    }

    // Check third round matchup winner (conference winner)
    if (conference?.winner?.name === bracket?.conferences[cIdx]?.winner?.name) {
      score += 8;
    }
  });

  // Check final round matchup games
  if (bracket?.games && +masterBracket?.games === +bracket?.games) {
    score += 1;
  }

  // Check final round matchup winner (cup winner)
  if (masterBracket?.winner?.name === bracket?.winner?.name) {
    score += 16;
  }

  return score;
};

export const isBracketComplete = (bracket: Bracket, includeTiebreakers: boolean = true): boolean => {
  const picks = !!(
      bracket?.winner?.name &&
      bracket?.conferences[0]?.winner?.name &&
      bracket?.conferences[1]?.winner?.name &&
      bracket?.conferences[0]?.divisions[0]?.winner?.name &&
      bracket?.conferences[0]?.divisions[1]?.winner?.name &&
      bracket?.conferences[1]?.divisions[0]?.winner?.name &&
      bracket?.conferences[1]?.divisions[1]?.winner?.name &&
      bracket?.conferences[0]?.divisions[0]?.rounds[1]?.matchups[0]?.topSeed.name &&
      bracket?.conferences[0]?.divisions[0]?.rounds[1]?.matchups[0]?.bottomSeed.name &&
      bracket?.conferences[0]?.divisions[1]?.rounds[1]?.matchups[0]?.topSeed.name &&
      bracket?.conferences[0]?.divisions[1]?.rounds[1]?.matchups[0]?.bottomSeed.name &&
      bracket?.conferences[1]?.divisions[0]?.rounds[1]?.matchups[0]?.topSeed.name &&
      bracket?.conferences[1]?.divisions[0]?.rounds[1]?.matchups[0]?.bottomSeed.name &&
      bracket?.conferences[1]?.divisions[1]?.rounds[1]?.matchups[0]?.topSeed.name &&
      bracket?.conferences[1]?.divisions[1]?.rounds[1]?.matchups[0]?.bottomSeed.name
    ),
    tiebreakers = !!(
      bracket?.games &&
      bracket?.goals &&
      bracket?.conferences[0]?.games &&
      bracket?.conferences[0]?.divisions[0]?.rounds[1]?.matchups[0]?.games &&
      bracket?.conferences[0]?.divisions[0]?.rounds[0]?.matchups[0]?.games &&
      bracket?.conferences[0]?.divisions[0]?.rounds[0]?.matchups[1]?.games &&
      bracket?.conferences[0]?.divisions[1]?.rounds[1]?.matchups[0]?.games &&
      bracket?.conferences[0]?.divisions[1]?.rounds[0]?.matchups[0]?.games &&
      bracket?.conferences[0]?.divisions[1]?.rounds[0]?.matchups[1]?.games &&
      bracket?.conferences[1]?.games &&
      bracket?.conferences[1]?.divisions[0]?.rounds[1]?.matchups[0]?.games &&
      bracket?.conferences[1]?.divisions[0]?.rounds[0]?.matchups[0]?.games &&
      bracket?.conferences[1]?.divisions[0]?.rounds[0]?.matchups[1]?.games &&
      bracket?.conferences[1]?.divisions[1]?.rounds[1]?.matchups[0]?.games &&
      bracket?.conferences[1]?.divisions[1]?.rounds[0]?.matchups[0]?.games &&
      bracket?.conferences[1]?.divisions[1]?.rounds[0]?.matchups[1]?.games
    );

  return picks && (includeTiebreakers ? tiebreakers : true);
};

export const sortBrackets = (a: Bracket, b: Bracket): number => {
  if (a.score === b.score) {
    return b.tieRank - a.tieRank;
  } else {
    return b.score - a.score;
  }
};

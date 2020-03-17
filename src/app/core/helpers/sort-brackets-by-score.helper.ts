export const sortBracketsByScore: (b1: IBracket, b2: IBracket) => number = (b1: IBracket, b2: IBracket) => {
  if (b1.score === b2.score) {
    return b2.tieRank - b1.tieRank;
  } else {
    return b2.score - b1.score;
  }
};

interface IBracket {
  conferences: IConference[];
  games: number;
  goals: number;
  isComplete: boolean;
  isPaid: boolean;
  isTiebreakerComplete: boolean;
  key: string;
  name: string;
  owner: string;
  score: number;
  tieRank: number;
  winner: ITeam;
}

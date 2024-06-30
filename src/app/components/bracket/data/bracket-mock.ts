import { Bracket } from '../../../models/bracket.model';
import { Team } from '../../../models/team.model';

export const BracketMock: Bracket = {
  name: 'My Mock Bracket',
  name_condensed: 'mymockbracket',
  owner: {
    email: '',
    name: 'Me'
  },
  conferences: [{
    name: 'Western Conference',
    games: 0,
    winner: {} as Team,
    divisions: [{
      name: 'Pacific Division',
      rounds: [{
        name: 'Round 1',
        matchups: [{
          id: 1,
          games: 7,
          topSeed: {
            name: 'Team 1',
            seed: 1
          },
          bottomSeed: {
            name: 'Team 8',
            seed: 8
          }
        }, {
          id: 2,
          games: 7,
          topSeed: {
            name: 'Team 4',
            seed: 4
          },
          bottomSeed: {
            name: 'Team 5',
            seed: 5
          }
        }]
      }, {
        name: 'Quarterfinals',
        matchups: [{
          id: 3,
          games: 0,
          topSeed: {} as Team,
          bottomSeed: {} as Team
        }]
      }],
      winner: {} as Team
    }, {
      name: 'Central Division',
      rounds: [{
        name: 'Round 1',
        matchups: [{
          id: 1,
          games: 7,
          topSeed: {
            name: 'Team 3',
            seed: 3
          },
          bottomSeed: {
            name: 'Team 6',
            seed: 6
          }
        }, {
          id: 2,
          games: 7,
          topSeed: {
            name: 'Team 2',
            seed: 2
          },
          bottomSeed: {
            name: 'Team 7',
            seed: 7
          }
        }]
      }, {
        name: 'Quarterfinals',
        matchups: [{
          id: 3,
          games: 0,
          topSeed: {} as Team,
          bottomSeed: {} as Team
        }]
      }],
      winner: {} as Team
    }]
  }, {
    name: 'Eastern Conference',
    games: 0,
    winner: {} as Team,
    divisions: [{
      name: 'Atlantic Division',
      rounds: [{
        name: 'Round 1',
        matchups: [{
          id: 1,
          games: 7,
          topSeed: {
            name: 'Team 1',
            seed: 1
          },
          bottomSeed: {
            name: 'Team 8',
            seed: 8
          }
        }, {
          id: 2,
          games: 7,
          topSeed: {
            name: 'Team 4',
            seed: 4
          },
          bottomSeed: {
            name: 'Team 5',
            seed: 5
          }
        }]
      }, {
        name: 'Quarterfinals',
        matchups: [{
          id: 3,
          games: 0,
          topSeed: {} as Team,
          bottomSeed: {} as Team
        }]
      }],
      winner: {} as Team
    }, {
      name: 'Metropolitan Division',
      rounds: [{
        name: 'Round 1',
        matchups: [{
          id: 1,
          games: 7,
          topSeed: {
            name: 'Team 3',
            seed: 3
          },
          bottomSeed: {
            name: 'Team 6',
            seed: 6
          }
        }, {
          id: 2,
          games: 7,
          topSeed: {
            name: 'Team 2',
            seed: 2
          },
          bottomSeed: {
            name: 'Team 7',
            seed: 7
          }
        }]
      }, {
        name: 'Quarterfinals',
        matchups: [{
          id: 3,
          games: 0,
          topSeed: {} as Team,
          bottomSeed: {} as Team
        }]
      }],
      winner: {} as Team
    }]
  }],
  games: 0,
  goals: 0,
  isComplete: false,
  isPaid: false,
  isTiebreakerComplete: false,
  key: 'mock',
  score: 0,
  tieRank: 0,
  winner: {} as Team
};

export const BracketMockMaster: Bracket = {
  name: 'Mock Master Bracket',
  name_condensed: 'mockmasterbracket',
  owner: {
    email: 'smahony22@gmail.com',
    name: 'smahony22'
  },
  conferences: [{
    name: 'Western Conference',
    games: 6,
    winner: {
      name: 'Edmonton Oilers',
      seed: 2
    },
    divisions: [{
      name: 'Pacific Division',
      rounds: [{
        name: 'Round 1',
        matchups: [{
          id: 1,
          games: 6,
          topSeed: {
            name: 'Vancouver Canucks',
            seed: 1
          },
          bottomSeed: {
            name: 'Nashville Predators',
            seed: 4
          }
        }, {
          id: 2,
          games: 5,
          topSeed: {
            name: 'Edmonton Oilers',
            seed: 2
          },
          bottomSeed: {
            name: 'Los Angeles Kings',
            seed: 3
          }
        }]
      }, {
        name: 'Quarterfinals',
        matchups: [{
          id: 3,
          games: 7,
          topSeed: {
            name: 'Vancouver Canucks',
            seed: 1
          },
          bottomSeed: {
            name: 'Edmonton Oilers',
            seed: 2
          }
        }]
      }],
      winner: {
        name: 'Edmonton Oilers',
        seed: 2
      }
    }, {
      name: 'Central Division',
      rounds: [{
        name: 'Round 1',
        matchups: [{
          id: 1,
          games: 7,
          topSeed: {
            name: 'Dallas Stars',
            seed: 1
          },
          bottomSeed: {
            name: 'Vegas Golden Knights',
            seed: 4
          }
        }, {
          id: 2,
          games: 5,
          topSeed: {
            name: 'Winnipeg Jets',
            seed: 2
          },
          bottomSeed: {
            name: 'Colorado Avalanche',
            seed: 3
          }
        }]
      }, {
        name: 'Quarterfinals',
        matchups: [{
          id: 3,
          games: 6,
          topSeed: {
            name: 'Dallas Stars',
            seed: 1
          },
          bottomSeed: {
            name: 'Colorado Avalanche',
            seed: 3
          }
        }]
      }],
      winner: {
        name: 'Dallas Stars',
        seed: 1
      }
    }]
  }, {
    name: 'Eastern Conference',
    games: 6,
    winner: {
      name: 'Florida Panthers',
      seed: 1
    },
    divisions: [{
      name: 'Atlantic Division',
      rounds: [{
        name: 'Round 1',
        matchups: [{
          id: 1,
          games: 5,
          topSeed: {
            name: 'Florida Panthers',
            seed: 1
          },
          bottomSeed: {
            name: 'Tampa Bay Lightning',
            seed: 4
          }
        }, {
          id: 2,
          games: 7,
          topSeed: {
            name: 'Boston Bruins',
            seed: 2
          },
          bottomSeed: {
            name: 'Toronto Maple Leafs',
            seed: 3
          }
        }]
      }, {
        name: 'Quarterfinals',
        matchups: [{
          id: 3,
          games: 6,
          topSeed: {
            name: 'Florida Panthers',
            seed: 1
          },
          bottomSeed: {
            name: 'Boston Bruins',
            seed: 2
          }
        }]
      }],
      winner: {
        name: 'Florida Panthers',
        seed: 1
      }
    }, {
      name: 'Metropolitan Division',
      rounds: [{
        name: 'Round 1',
        matchups: [{
          id: 1,
          games: 4,
          topSeed: {
            name: 'New York Ranger',
            seed: 1
          },
          bottomSeed: {
            name: 'Washington Capitals',
            seed: 4
          }
        }, {
          id: 2,
          games: 5,
          topSeed: {
            name: 'Carolina Hurricanes',
            seed: 2
          },
          bottomSeed: {
            name: 'New York Islanders',
            seed: 3
          }
        }]
      }, {
        name: 'Quarterfinals',
        matchups: [{
          id: 3,
          games: 6,
          topSeed: {
            name: 'New York Rangers',
            seed: 1
          },
          bottomSeed: {
            name: 'Carolina Hurricanes',
            seed: 2
          }
        }]
      }],
      winner: {
        name: 'New York Rangers',
        seed: 1
      }
    }]
  }],
  games: 5,
  goals: 30,
  isComplete: true,
  isPaid: true,
  isTiebreakerComplete: true,
  key: 'master',
  score: 0,
  tieRank: 0,
  winner: {
    name: 'Florida Panthers',
    seed: 1
  }
};

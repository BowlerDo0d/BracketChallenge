export const BracketMock = {
    name: 'My Mock Bracket',
    owner: 'Me',
    score: 5,
    conferences: [{
        name: 'Western Conference',
        divisions: [{
            name: 'Pacific Division',
            matchups: [{
                id: 1,
                topSeed: {
                    seed: 1,
                    name: 'Team 1'
                },
                bottomSeed: {
                    seed: 8,
                    name: 'Team 8'
                }
            }, {
                id: 2,
                topSeed: {
                    seed: 4,
                    name: 'Team 4'
                },
                bottomSeed: {
                    seed: 5,
                    name: 'Team 5'
                }
            }]
        }, {
            name: 'Central Division',
            matchups: [{
                id: 3,
                topSeed: {
                    seed: 3,
                    name: 'Team 3'
                },
                bottomSeed: {
                    seed: 6,
                    name: 'Team 6'
                }
            }, {
                id: 4,
                topSeed: {
                    seed: 2,
                    name: 'Team 2'
                },
                bottomSeed: {
                    seed: 7,
                    name: 'Team 7'
                }
            }]
        }]
    }, {
        name: 'Eastern Conference',
        divisions: [{
            name: 'Atlantic Division',
            matchups: [{
                id: 1,
                topSeed: {
                    seed: 1,
                    name: 'Team 1'
                },
                bottomSeed: {
                    seed: 8,
                    name: 'Team 8'
                }
            }, {
                id: 2,
                topSeed: {
                    seed: 4,
                    name: 'Team 4'
                },
                bottomSeed: {
                    seed: 5,
                    name: 'Team 5'
                }
            }]
        }, {
            name: 'Metropolitan Division',
            matchups: [{
                id: 3,
                topSeed: {
                    seed: 3,
                    name: 'Team 3'
                },
                bottomSeed: {
                    seed: 6,
                    name: 'Team 6'
                }
            }, {
                id: 4,
                topSeed: {
                    seed: 2,
                    name: 'Team 2'
                },
                bottomSeed: {
                    seed: 7,
                    name: 'Team 7'
                }
            }]
        }]
    }]
};

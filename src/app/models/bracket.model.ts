export class Bracket {
    name: string;
    owner: string;
    score: Number;

    constructor() {
        this.name = null;
        this.owner = null;
        this.score = 0;
    }
}

// export class Bracket {
//     conferences: [{
//         name: 'Eastern Conference',
//         divisions: [{
//             name: 'Atlantic',
//             matchups: [{
//                 id: 1,
//                 topSeed: {
//                     seed: 1,
//                     name: 'Pittsburgh'
//                 },
//                 bottomSeed: {
//                     seed: 8,
//                     name: 'Philly'
//                 }
//             }, {
//                 id: 2,
//                 topSeed: {
//                     seed: 4,
//                     name: 'Pittsburgh'
//                 },
//                 bottomSeed: {
//                     seed: 5,
//                     name: 'Philly'
//                 }
//             }, {
//                 id: 3,
//                 topSeed: {
//                     seed: 3,
//                     name: 'Pittsburgh'
//                 },
//                 bottomSeed: {
//                     seed: 6,
//                     name: 'Philly'
//                 }
//             }, {
//                 id: 4,
//                 topSeed: {
//                     seed: 2,
//                     name: 'Pittsburgh'
//                 },
//                 bottomSeed: {
//                     seed: 7,
//                     name: 'Philly'
//                 }
//             }, {
//                 id: 5,
//                 topSeed: null, // Winner of matchup 1
//                 bottomSeed: null // Winner of matchup 2
//             }, {
//                 id: 6,
//                 topSeed: null, // Winner of matchup 3
//                 bottomSeed: null // Winner of matchup 4
//             }, {
//                 id: 7,
//                 topSeed: null, // Winner of matchup 5
//                 bottomSeed: null // Winner of matchup 6
//             }, {
//                 id: 8,
//                 topSeed: null, // Winner of matchup 7
//                 bottomSeed: null // Always null
//             }]
//         }, {
//             name: 'Metropolitan'
//         }]
//     }, {
//         name: 'Western Conference',
//         divisions: [{
//             name: 'Central'
//         }, {
//             name: 'Pacific'
//         }]
//     }]
// }

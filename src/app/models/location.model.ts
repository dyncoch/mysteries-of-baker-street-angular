export enum GameLocation {
    Bank,
    Bar,
    Chemist,
    CarriageDepot,
    Docks,
    Hotel,
    Home,
    Locksmith,
    Museum,
    Newsagents,
    Park,
    Pawnbroker,
    Theatre,
    ScotlandYard,
    Tobacconist,
}

export function getLocationFromKey(locationName: string): GameLocation | undefined {
    return GameLocation[locationName as keyof typeof GameLocation];
}

export type Coordinates = { x: number, y: number };

type LocationShape = Coordinates[];

const bankShape: LocationShape = makeLocation(15, 17, 12, 15);
const barShape: LocationShape = makeLocation(14, 16, 8, 10);
const chemistShape: LocationShape = makeLocation(5, 7, 1, 4);
const carriageDepotShape: LocationShape = makeLocation(12, 15, 18, 19);
const hotelShape: LocationShape = makeLocation(7, 9, 13, 16);
const homeShape: LocationShape = makeLocation(0, 2, 0, 1);
const locksmithShape: LocationShape = makeLocation(9, 10, 0, 1);
const museumShape: LocationShape = makeLocation(1, 3, 6, 10);
const newsagentsShape: LocationShape = makeLocation(11, 13, 0, 1);
const parkShape: LocationShape = makeLocation(6, 11, 7, 10);
const pawnbrokerShape: LocationShape = makeLocation(3, 5, 12, 14);
const theatreShape: LocationShape = makeLocation(10, 13, 13, 15);
const scotlandYardShape: LocationShape = makeLocation(0, 1, 14, 19);
const tobacconistShape: LocationShape = makeLocation(3, 4, 18, 19);

const docksShapeTop: LocationShape = makeLocation(16, 19, 0, 3);
const docksShapeMiddle: LocationShape = makeLocation(18, 19, 4, 7);
const docksShapeBottom: LocationShape = makeLocation(19, 19, 8, 19);

const docksShape: LocationShape = [...docksShapeTop, ...docksShapeMiddle, ...docksShapeBottom];

function makeLocation(startCol: number, endCol: number, startRow: number, endRow: number): LocationShape {
    const locationShape: LocationShape = [];
    for (let x = startRow; x <= endRow; x++) {
        for (let y = startCol; y <= endCol; y++) {
            locationShape.push({ x, y });
        }
    }
    return locationShape;
}

// Map each location to a set of relative coordinates
export const locationShapes: Record<GameLocation, LocationShape> = {
    [GameLocation.Bank]: bankShape,
    [GameLocation.Bar]: barShape,
    [GameLocation.Chemist]: chemistShape,
    [GameLocation.CarriageDepot]: carriageDepotShape,
    [GameLocation.Docks]: docksShape,
    [GameLocation.Hotel]: hotelShape,
    [GameLocation.Home]: homeShape,
    [GameLocation.Locksmith]: locksmithShape,
    [GameLocation.Museum]: museumShape,
    [GameLocation.Newsagents]: newsagentsShape,
    [GameLocation.Park]: parkShape,
    [GameLocation.Pawnbroker]: pawnbrokerShape,
    [GameLocation.Theatre]: theatreShape,
    [GameLocation.ScotlandYard]: scotlandYardShape,
    [GameLocation.Tobacconist]: tobacconistShape,
};

export const locationDoors: Record<GameLocation, LocationShape> = {
    [GameLocation.Bank]: [{ x: 14, y: 15 }],
    [GameLocation.Bar]: [{ x: 10, y: 14 }],
    [GameLocation.Chemist]: [{ x: 3, y: 5 }],
    [GameLocation.CarriageDepot]: [{ x: 18, y: 13 }, { x: 18, y: 14 }],
    [GameLocation.Docks]: [{ x: 5, y: 18 }, { x: 6, y: 18 }],
    [GameLocation.Hotel]: [{ x: 13, y: 8 }],
    [GameLocation.Home]: [{ x: 1, y: 1 }],
    [GameLocation.Locksmith]: [{ x: 1, y: 9 }],
    [GameLocation.Museum]: [{ x: 6, y: 2 }, { x: 10, y: 2 }],
    [GameLocation.Newsagents]: [{ x: 1, y: 12 }],
    [GameLocation.Park]: [
        { x: 8, y: 6 },
        { x: 9, y: 6 },
        { x: 8, y: 11 },
        { x: 9, y: 11 },
    ],
    [GameLocation.Pawnbroker]: [{ x: 13, y: 3 }],
    [GameLocation.Theatre]: [{ x: 15, y: 11 }, { x: 15, y: 12 }],
    [GameLocation.ScotlandYard]: [{ x: 18, y: 1 }, { x: 19, y: 1 }],
    [GameLocation.Tobacconist]: [{ x: 18, y: 4 },]
};
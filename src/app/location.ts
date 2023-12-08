export enum Location {
    Bank,
    Bar,
    Chemist,
    CarriageDepot,
    Docks,
    Hotel,
    Locksmith,
    Museum,
    Newsagents,
    Park,
    Pawnbroker,
    Theatre,
    ScotlandYard,
    Tobacconist,
}

export function getLocationEnumValue(locationName: string): Location | undefined {
    return Location[locationName as keyof typeof Location];
}

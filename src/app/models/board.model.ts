import { GameLocation } from "./location.model";

// board.model.ts
export enum SquareType {
  Street = 'street',
  Door = 'door',
  Building = 'building'
}

export interface Square {
  type: SquareType;
  location?: GameLocation;
  // Add more properties as needed, like coordinates, id, etc.
}

export type Board = Square[][];

export function getSquareType(number: number): SquareType {
  switch (number) {
    case 0:
      return SquareType.Street;
    case 1:
      return SquareType.Door;
    case 2:
      return SquareType.Building;
    default:
      return SquareType.Street;
  }
}

// board.model.ts
export enum SquareType {
  Street = 'street',
  Door = 'door',
  Building = 'building'
}

export interface Square {
  type: SquareType;
  // Add more properties as needed, like coordinates, id, etc.
}

export type Board = Square[][];


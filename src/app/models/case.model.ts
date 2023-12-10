import { GameLocation } from './location.model'; // Import Location enum

export interface Case {
    id: string;
    name: string;
    description: string;
    objectives: string[];
    hints: { [key in GameLocation]?: string };
    solution: string;
}

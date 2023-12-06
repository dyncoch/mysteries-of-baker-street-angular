import { Location } from './location'; // Import Location enum

export interface Case {
    id: string;
    name: string;
    description: string;
    objectives: string[];
    hints: { [key in Location]?: string };
    solution: string;
}
import { Component } from '@angular/core';
import { CaseViewComponent } from '../case-view/case-view.component';
import { CommonModule } from '@angular/common';
import { Case } from '../models/case.model';
import { GameLocation } from '../models/location.model';
import { LocationsButtonsComponent } from '../locations-buttons/locations-buttons.component';
import { getLocationFromKey } from '../models/location.model';
import { HintViewComponent } from '../hint-view/hint-view.component';
import { CaseSliderComponent } from '../case-slider/case-slider.component';
import { BoardComponent } from '../board/board.component';

enum GameState {
  NotStarted,
  ChooseCase,
  ShowBoard,
  ShowCase,
  ShowHints,
  Solved
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CaseViewComponent,
    LocationsButtonsComponent,
    HintViewComponent,
    CaseSliderComponent,
    BoardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  GameState = GameState;

  // gameState: GameState = GameState.NotStarted;
  gameState: GameState = GameState.ShowBoard;
  currentCase!: Case;
  selectedLocation?: GameLocation;
  visitedLocations: GameLocation[] = [];


  startGame() {
    this.gameState = GameState.ChooseCase;
    this.currentCase = this.case;
  }

  locationValues = Object.values(GameLocation).filter(location => typeof location === 'string') as string[];

  onLocationSelect(locationString: string) {
    console.log('location clicked: ' + locationString);
    let location = getLocationFromKey(locationString);

    this.selectedLocation = location;
    this.visitedLocations.push(location!);
    this.gameState = GameState.ShowHints;

    // this.locationSelected.emit(location!);

  }

  onCaseSelect(caseId: string) {
    console.log('case clicked: ' + caseId);
    this.currentCase = this.cases.find(c => c.id === caseId)!;
    this.gameState = GameState.ShowCase;
  }

  onBack() {
    this.gameState = GameState.ShowCase;
  }

  cases: Case[] = [];

  constructor() {
    // Populate the cases array with multiple Case objects
    this.cases = [
      {
        id: '1',
        name: 'The Mystery of the Missing Pudding',
        description: 'The famous pudding chef, Mrs. Hudson, has had her secret recipe stolen! Help Sherlock Holmes and Dr. Watson find the thief and recover the recipe.',
        objectives: [
          'Find the thief',
          'Recover the recipe'
        ],
        hints: {
          [GameLocation.Bank]: 'The thief is not in the bank',
          [GameLocation.Bar]: 'The thief is not in the bar',
          [GameLocation.Chemist]: 'The thief is not in the chemist',
          [GameLocation.CarriageDepot]: 'The thief is not in the carriage depot',
          [GameLocation.Docks]: 'The thief is not in the docks',
          [GameLocation.Hotel]: 'The thief is not in the hotel',
          [GameLocation.Locksmith]: 'The thief is not in the locksmith',
          [GameLocation.Museum]: 'The thief is not in the museum',
          [GameLocation.Newsagents]: 'The thief is not in the newsagents',
          [GameLocation.Park]: 'The thief is not in the park',
          [GameLocation.Pawnbroker]: 'The thief is not in the pawnbroker',
          [GameLocation.Theatre]: 'The thief is not in the theatre',
          [GameLocation.ScotlandYard]: 'The thief is not in Scotland Yard',
          [GameLocation.Tobacconist]: 'The thief is not in the tobacconist'
        },
        solution: 'The thief is in the tobacconist'
      },
      {
        id: '2',
        name: 'The Mystery of Loren Ipsum',
        description: 'The famous pudding chef, Mrs. Hudson, has had her secret recipe stolen! Help Sherlock Holmes and Dr. Watson find the thief and recover the recipe.',
        objectives: [
          'Find the thief',
          'Recover the recipe'
        ],
        hints: {
          [GameLocation.Bank]: 'The thief is not in the bank',
          [GameLocation.Bar]: 'The thief is not in the bar',
          [GameLocation.Chemist]: 'The thief is not in the chemist',
          [GameLocation.CarriageDepot]: 'The thief is not in the carriage depot',
          [GameLocation.Docks]: 'The thief is not in the docks',
          [GameLocation.Hotel]: 'The thief is not in the hotel',
          [GameLocation.Locksmith]: 'The thief is not in the locksmith',
          [GameLocation.Museum]: 'The thief is not in the museum',
          [GameLocation.Newsagents]: 'The thief is not in the newsagents',
          [GameLocation.Park]: 'The thief is not in the park',
          [GameLocation.Pawnbroker]: 'The thief is not in the pawnbroker',
          [GameLocation.Theatre]: 'The thief is not in the theatre',
          [GameLocation.ScotlandYard]: 'The thief is not in Scotland Yard',
          [GameLocation.Tobacconist]: 'The thief is not in the tobacconist'
        },
        solution: 'The thief is in the tobacconist'
      },
      {
        id: '3',
        name: 'A Study in Scarlet',
        description: 'The famous pudding chef, Mrs. Hudson, has had her secret recipe stolen! Help Sherlock Holmes and Dr. Watson find the thief and recover the recipe.',
        objectives: [
          'Find the thief',
          'Recover the recipe'
        ],
        hints: {
          [GameLocation.Bank]: 'The thief is not in the bank',
          [GameLocation.Bar]: 'The thief is not in the bar',
          [GameLocation.Chemist]: 'The thief is not in the chemist',
          [GameLocation.CarriageDepot]: 'The thief is not in the carriage depot',
          [GameLocation.Docks]: 'The thief is not in the docks',
          [GameLocation.Hotel]: 'The thief is not in the hotel',
          [GameLocation.Locksmith]: 'The thief is not in the locksmith',
          [GameLocation.Museum]: 'The thief is not in the museum',
          [GameLocation.Newsagents]: 'The thief is not in the newsagents',
          [GameLocation.Park]: 'The thief is not in the park',
          [GameLocation.Pawnbroker]: 'The thief is not in the pawnbroker',
          [GameLocation.Theatre]: 'The thief is not in the theatre',
          [GameLocation.ScotlandYard]: 'The thief is not in Scotland Yard',
          [GameLocation.Tobacconist]: 'The thief is not in the tobacconist'
        },
        solution: 'The thief is in the tobacconist'
      },
    ];
  }

  case: Case = {
    id: '1',
    name: 'The Mystery of the Missing Pudding',
    description: 'The famous pudding chef, Mrs. Hudson, has had her secret recipe stolen! Help Sherlock Holmes and Dr. Watson find the thief and recover the recipe.',
    objectives: [
      'Find the thief',
      'Recover the recipe'
    ],
    hints: {
      [GameLocation.Bank]: 'The thief is not in the bank',
      [GameLocation.Bar]: 'The thief is not in the bar',
      [GameLocation.Chemist]: 'The thief is not in the chemist',
      [GameLocation.CarriageDepot]: 'The thief is not in the carriage depot',
      [GameLocation.Docks]: 'The thief is not in the docks',
      [GameLocation.Hotel]: 'The thief is not in the hotel',
      [GameLocation.Locksmith]: 'The thief is not in the locksmith',
      [GameLocation.Museum]: 'The thief is not in the museum',
      [GameLocation.Newsagents]: 'The thief is not in the newsagents',
      [GameLocation.Park]: 'The thief is not in the park',
      [GameLocation.Pawnbroker]: 'The thief is not in the pawnbroker',
      [GameLocation.Theatre]: 'The thief is not in the theatre',
      [GameLocation.ScotlandYard]: 'The thief is not in Scotland Yard',
      [GameLocation.Tobacconist]: 'The thief is not in the tobacconist'
    },
    solution: 'The thief is in the tobacconist'
  }

}

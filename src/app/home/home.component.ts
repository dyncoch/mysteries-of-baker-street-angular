import { Component } from '@angular/core';
import { CaseViewComponent } from '../case-view/case-view.component';
import { CommonModule } from '@angular/common';
import { Case } from '../case';
import { Location } from '../location';

enum GameState {
  NotStarted,
  InProgress,
  Solved
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CaseViewComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  GameState = GameState;

  gameState: GameState = GameState.NotStarted;
  currentCase!: Case;
  selectedLocation?: Location;

  startGame() {
    this.gameState = GameState.InProgress;
    this.currentCase = this.case;
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
      [Location.Bank]: 'The thief is not in the bank',
      [Location.Bar]: 'The thief is not in the bar',
      [Location.Chemist]: 'The thief is not in the chemist',
      [Location.CarriageDepot]: 'The thief is not in the carriage depot',
      [Location.Docks]: 'The thief is not in the docks',
      [Location.Hotel]: 'The thief is not in the hotel',
      [Location.Locksmith]: 'The thief is not in the locksmith',
      [Location.Museum]: 'The thief is not in the museum',
      [Location.Newsagents]: 'The thief is not in the newsagents',
      [Location.Park]: 'The thief is not in the park',
      [Location.Pawnbroker]: 'The thief is not in the pawnbroker',
      [Location.Theatre]: 'The thief is not in the theatre',
      [Location.ScotlandYard]: 'The thief is not in Scotland Yard',
      [Location.Tobacconist]: 'The thief is not in the tobacconist'
    },
    solution: 'The thief is in the tobacconist'
  }
}

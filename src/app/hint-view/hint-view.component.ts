import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GameLocation } from '../models/location.model';
import { Case } from '../models/case.model';

@Component({
  selector: 'app-hint-view',
  standalone: true,
  imports: [],
  templateUrl: './hint-view.component.html',
  styleUrl: './hint-view.component.scss'
})
export class HintViewComponent {
  @Input() case!: Case;
  @Input() selectedLocation!: GameLocation;

  @Output() onBack = new EventEmitter<void>();

  hint: string = '';
  location: string = '';

  // Use ngOnChanges to update the hint when inputs change
  ngOnChanges(): void {
    this.hint = this.getHint(this.case, this.selectedLocation);
    this.location = GameLocation[Object.keys(GameLocation).indexOf(this.selectedLocation.toString())];
  }

  onBackClick() {
    this.onBack.emit();
  }

  private getHint(currentCase: Case, currentLocation: GameLocation): string {
    const hint = currentCase.hints[currentLocation];
    return hint ? hint.toString() : 'No hint available for this location';
  }
}

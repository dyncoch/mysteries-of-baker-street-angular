import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '../location';
import { Case } from '../case';

@Component({
  selector: 'app-hint-view',
  standalone: true,
  imports: [],
  templateUrl: './hint-view.component.html',
  styleUrl: './hint-view.component.scss'
})
export class HintViewComponent {
  @Input() case!: Case;
  @Input() selectedLocation!: Location;

  @Output() onBack = new EventEmitter<void>();

  hint: string = '';
  location: string = '';

  // Use ngOnChanges to update the hint when inputs change
  ngOnChanges(): void {
    this.hint = this.getHint(this.case, this.selectedLocation);
    this.location = Location[Object.keys(Location).indexOf(this.selectedLocation.toString())];
  }

  onBackClick() {
    this.onBack.emit();
  }

  private getHint(currentCase: Case, currentLocation: Location): string {
    const hint = currentCase.hints[currentLocation];
    return hint ? hint.toString() : 'No hint available for this location';
  }
}

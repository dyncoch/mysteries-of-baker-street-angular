import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Case } from '../case';
import { CommonModule } from '@angular/common';
import { LocationsButtonsComponent } from '../locations-buttons/locations-buttons.component';
import { Location } from '../location';
import { getLocationEnumValue } from '../location';

@Component({
  selector: 'app-case-view',
  standalone: true,
  imports: [
    CommonModule,
    LocationsButtonsComponent,
  ],
  templateUrl: './case-view.component.html',
  styleUrl: './case-view.component.scss'
})
export class CaseViewComponent {
  @Input() case!: Case;
  @Input() selectedLocation?: Location;
  @Input() visitedLocations: Location[] = [];

  // @Output() locationSelected = new EventEmitter<Location>();
  // @Input() locations!: string[];

  // locationValues = Object.values(Location).map(location => location.toString());
  locationValues = Object.values(Location).filter(location => typeof location === 'string') as string[];

  onLocationSelect(locationString: string) {
    console.log('location clicked: ' + locationString);
    let location = getLocationEnumValue(locationString);

    this.selectedLocation = location;
    this.visitedLocations.push(location!);

    // this.locationSelected.emit(location!);

  }

}

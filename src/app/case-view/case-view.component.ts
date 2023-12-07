import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Case } from '../case';
import { CommonModule } from '@angular/common';
import { LocationsButtonsComponent } from '../locations-buttons/locations-buttons.component';
import { Location } from '../location';


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

  @Output() locationSelected = new EventEmitter<Location>();
  // @Input() locations!: string[];

  // locationValues = Object.values(Location).map(location => location.toString());
  locationValues = Object.values(Location).filter(location => typeof location === 'string') as string[];

  onLocationSelect(location: string) {
    console.log('location clicked: ' + location);
    this.locationSelected.emit(Location.Tobacconist);
  }

}

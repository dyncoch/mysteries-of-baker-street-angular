import { Component, Input } from '@angular/core';
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
  // @Input() locations!: string[];

  locationValues = Object.values(Location).map(location => location.toString());

}

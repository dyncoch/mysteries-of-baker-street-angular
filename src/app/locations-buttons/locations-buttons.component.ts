import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-locations-buttons',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './locations-buttons.component.html',
  styleUrl: './locations-buttons.component.scss'
})
export class LocationsButtonsComponent {
  @Input() locations!: string[];

  @Output() locationSelected = new EventEmitter<string>();

  onLocationClick(location: string) {
    this.locationSelected.emit(location);
  }

}

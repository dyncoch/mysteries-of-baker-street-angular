import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

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
}

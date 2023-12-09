import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Case } from '../case';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-case-slider',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './case-slider.component.html',
  styleUrl: './case-slider.component.scss'
})
export class CaseSliderComponent {
  @Input() cases!: Case[];
}

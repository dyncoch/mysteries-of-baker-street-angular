import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Case } from '../models/case.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-case-view',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './case-view.component.html',
  styleUrl: './case-view.component.scss'
})
export class CaseViewComponent {
  @Input() case!: Case;

  // @Output() locationSelected = new EventEmitter<Location>();
  // @Input() locations!: string[];

  // locationValues = Object.values(Location).map(location => location.toString());
  ngOnChanges(): void {
    console.log('case-view ngOnChanges');
  }

}

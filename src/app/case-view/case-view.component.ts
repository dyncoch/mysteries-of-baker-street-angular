import { Component, Input } from '@angular/core';
import { Case } from '../case';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-case-view',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './case-view.component.html',
  styleUrl: './case-view.component.scss'
})
export class CaseViewComponent {
  @Input() case!: Case;
}

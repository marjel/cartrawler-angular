import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Legend } from '../../models/legend.model';

@Component({
  selector: 'app-legend',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './legend.component.html'
})
export class LegendComponent {
  @Input() legend!: Legend | null;
}

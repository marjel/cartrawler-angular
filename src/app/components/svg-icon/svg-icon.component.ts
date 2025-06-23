import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-svg-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss']
})
export class SvgIconComponent implements OnChanges {
  @Input() icon!: string;
  @Input() alt = '';
  @Input() class = '';

  svgHtml: SafeHtml = ''; 

  private http = inject(HttpClient);
  private domSan = inject(DomSanitizer);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['icon'] && this.icon) {
      this.http.get(`assets/vendors/${this.icon}.svg`, { responseType: 'text' })
        .pipe(
          catchError(() => of(`<svg xmlns="http://www.w3.org/2000/svg"></svg>`))
        )
        .subscribe(svgText => {
          this.svgHtml = this.domSan.bypassSecurityTrustHtml(svgText);
        });
    }
  }
}

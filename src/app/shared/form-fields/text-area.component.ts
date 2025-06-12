import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
            <div class="form-group">
              <label>{{ label }}</label>
              <textarea class="form-control" rows="4" [formControl]="control"></textarea>
              <small class="form-text text-muted" *ngIf="helpText">{{ helpText }}</small>
            </div>
            `,
})
export class TextAreaComponent {
  @Input() label: string = 'Multi-line Text';
  @Input() helpText: string = '';
  @Input() control = new FormControl('');
}

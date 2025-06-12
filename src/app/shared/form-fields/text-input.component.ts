import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
            <div class="form-group">
              <label>{{ label }}</label>
              <input type="text" class="form-control" [formControl]="control">
              <small class="form-text text-muted" *ngIf="helpText">{{ helpText }}</small>
            </div>
          `,
  // styleUrl: './text-input.component.scss'
})
export class TextInputComponent {
  @Input() label: string = 'Text Input';
  @Input() helpText: string = '';
  @Input() control = new FormControl('');
}

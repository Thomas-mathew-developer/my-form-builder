import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-radio-group',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="form-group">
      <label>{{ label }}</label>
      <div *ngFor="let option of options" class="form-check">
        <input 
          type="radio" 
          class="form-check-input" 
          [value]="option" 
          [formControl]="control" 
          name="{{label}}">
        <label class="form-check-label">{{ option }}</label>
      </div>
      <small class="form-text text-muted" *ngIf="helpText">{{ helpText }}</small>
    </div>
  `
})
export class RadioGroupComponent {
  @Input() label: string = 'Radio Group';
  @Input() helpText: string = '';
  @Input() options: string[] = ['Option 1', 'Option 2', 'Option 3'];
  @Input() control = new FormControl('');
}

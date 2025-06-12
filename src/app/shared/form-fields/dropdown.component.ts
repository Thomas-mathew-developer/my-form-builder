import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="form-group">
      <label>{{ label }}</label>
      <select class="form-control" [formControl]="control">
        <option *ngFor="let option of options" [value]="option">{{ option }}</option>
      </select>
      <small class="form-text text-muted" *ngIf="helpText">{{ helpText }}</small>
    </div>
  `
})
export class DropdownComponent {
  @Input() label: string = 'Dropdown';
  @Input() helpText: string = '';
  @Input() options: string[] = ['Option 1', 'Option 2', 'Option 3'];
  @Input() control = new FormControl('');
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox-group',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="form-group">
      <label>{{ label }}</label>
      <div *ngFor="let option of options" class="form-check">
        <input type="checkbox" class="form-check-input" [value]="option" (change)="onCheckboxChange($event)">
        <label class="form-check-label">{{ option }}</label>
      </div>
      <small class="form-text text-muted" *ngIf="helpText">{{ helpText }}</small>
    </div>
  `
})
export class CheckboxGroupComponent {
  @Input() label: string = 'Checkbox Group';
  @Input() helpText: string = '';
  @Input() options: string[] = ['Option 1', 'Option 2', 'Option 3'];
  selectedOptions: string[] = [];

  onCheckboxChange(event: any) {
    if (event.target.checked) {
      this.selectedOptions.push(event.target.value);
    } else {
      this.selectedOptions = this.selectedOptions.filter(o => o !== event.target.value);
    }
  }
}

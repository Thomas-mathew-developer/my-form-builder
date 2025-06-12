import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
  ],
  template: `
    <mat-form-field appearance="fill" class="w-100">
      <mat-label>{{ label }}</mat-label>
      <input matInput [matDatepicker]="picker" [formControl]="control">
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
    </mat-form-field>
    <small class="form-text text-muted" *ngIf="helpText">{{ helpText }}</small>
  `
})
export class DatePickerComponent {
  @Input() label: string = 'Select Date';
  @Input() helpText: string = '';
  @Input() control = new FormControl('');
}

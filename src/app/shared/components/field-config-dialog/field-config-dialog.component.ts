import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FieldConfigFormControls, FormField } from '../../models/form-field.model';

@Component({
  selector: 'app-field-config-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './field-config-dialog.component.html',
  styleUrl: './field-config-dialog.component.scss'
})
export class FieldConfigDialogComponent implements OnInit {
  configForm: FormGroup<FieldConfigFormControls>;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FieldConfigDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public field: FormField
  ) {
    this.configForm = this.fb.group<FieldConfigFormControls>({
      label: this.fb.control('', { nonNullable: true }),
      required: this.fb.control(false, { nonNullable: true }),
      helpText: this.fb.control('', { nonNullable: true }),
      minLength: this.fb.control<number | null>(null),
      maxLength: this.fb.control<number | null>(null),
      pattern: this.fb.control('', { nonNullable: true }),
      options: this.fb.array<FormControl<string>>([])
    });
  }

  ngOnInit(): void {
    if (this.field) {
      this.configForm.patchValue({
        label: this.field.label,
        required: this.field.required,
        helpText: this.field.helpText ?? '',
        minLength: this.field.validations?.minLength ?? null,
        maxLength: this.field.validations?.maxLength ?? null,
        pattern: this.field.validations?.pattern || ''
      });

      if (this.field.type === 'select' || this.field.type === 'radio' || this.field.type === 'checkbox') {
        this.options.clear();
        (this.field.options ?? []).forEach(opt =>
          this.options.push(this.fb.control(opt, { nonNullable: true }))
        );
      }
    }
  }

  applyChanges(): void {
    const formValue = this.configForm.getRawValue();

    const updatedField: FormField = {
      ...this.field,
      label: formValue.label || '',
      required: formValue.required,
      helpText: formValue.helpText,
      validations: {
        minLength: formValue.minLength ?? undefined,
        maxLength: formValue.maxLength ?? undefined,
        pattern: formValue.pattern || undefined
      },
      options: this.options.value
    };

    this.dialogRef.close(updatedField);
  }

  get options(): FormArray<FormControl<string>> {
    return this.configForm.get('options') as FormArray<FormControl<string>>;
  }

  addOption(): void {
    this.options.push(this.fb.control('', { nonNullable: true }));
  }

  removeOption(index: number): void {
    this.options.removeAt(index);
  }
}

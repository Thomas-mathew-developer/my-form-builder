import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormStorageService } from '../form-management/services/form-storage.service';
import { SubmissionService } from '../form-submissions/submission-service.service';
import { FormTemplate } from '../shared/models/form-field.model';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  selector: 'app-form-filler',
  templateUrl: './form-filler.component.html',
  styleUrl: './form-filler.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule
  ]
})
export class FormFillerComponent implements OnInit {
  formTemplate?: FormTemplate;
  form: FormGroup = this.fb.group({});

  constructor(
    private route: ActivatedRoute,
    private formStorage: FormStorageService,
    private fb: FormBuilder,
    private submissionService: SubmissionService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.formTemplate = this.formStorage.getFormById(id);
      if (this.formTemplate) {
        this.buildForm();
      } else {
        alert('Form not found!');
      }
    }
  }

  buildForm() {
    this.form = this.fb.group({});
    this.formTemplate?.fields.forEach(field => {
      const validators = [];

      if (field.required) validators.push(Validators.required);
      if (field.validations?.minLength)
        validators.push(Validators.minLength(field.validations.minLength));
      if (field.validations?.maxLength)
        validators.push(Validators.maxLength(field.validations.maxLength));
      if (field.validations?.pattern)
        validators.push(Validators.pattern(field.validations.pattern));

      const initialValue = field.type === 'checkbox' ? [] : '';
      this.form.addControl(field.id, this.fb.control(initialValue, validators));
    });
  }

  onCheckboxChange(event: any, fieldId: string, optionValue: string) {
    const control = this.form.get(fieldId);
    if (control) {
      const currentValue = control.value || [];
      if (event.target.checked) {
        control.setValue([...currentValue, optionValue]);
      } else {
        control.setValue(currentValue.filter((v: string) => v !== optionValue));
      }
    }
  }

  submitForm() {
    if (this.form.valid) {
      const submission = {
        id: crypto.randomUUID(),
        formId: this.formTemplate?.id,
        formName: this.formTemplate?.name,
        timestamp: new Date().toISOString(),
        data: this.form.value
      };

      // Save locally as fallback
      this.submissionService.saveSubmission(submission);

      // Submit to mock API
      this.submissionService.submitToApi(submission).subscribe({
        next: (res) => {
          this.snackBar.open('Form submitted successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['/submissions']);
        },
        error: (err) => {
          console.error('Mock API submission failed:', err);
          this.snackBar.open('Failed to submit to server. Saved locally.', 'Close', { duration: 4000 });
        }
      });

    } else {
      this.form.markAllAsTouched();
      this.snackBar.open('Please fix form errors before submitting.', 'Close', { duration: 3000 });
    }
  }
}

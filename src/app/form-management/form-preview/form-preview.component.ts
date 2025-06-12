import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormStorageService } from '../services/form-storage.service';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormTemplate } from '../../shared/models/form-field.model';

@Component({
  selector: 'app-form-preview',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-preview.component.html',
  styleUrl: './form-preview.component.scss'
})
export class FormPreviewComponent implements OnInit {
  formTemplate: FormTemplate | undefined;
  form: FormGroup = this.fb.group({});
  fieldsDisabled: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private storage: FormStorageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const formId = this.route.snapshot.paramMap.get('id');
    if (formId) {
      this.formTemplate = this.storage.getFormById(formId);
      if (this.formTemplate) {
        this.buildForm();
      }
    }
  }

  buildForm() {
    this.formTemplate?.fields.forEach(field => {
      this.form.addControl(field.id, this.fb.control(''));
    });
  }
}

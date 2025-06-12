import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { TextInputComponent } from '../shared/form-fields/text-input.component';
import { TextAreaComponent } from '../shared/form-fields/text-area.component';
import { DropdownComponent } from '../shared/form-fields/dropdown.component';
import { CheckboxGroupComponent } from '../shared/form-fields/checkbox-group.component';
import { RadioGroupComponent } from '../shared/form-fields/radio-group.component';
import { DatePickerComponent } from '../shared/form-fields/datepicker.component';
import { FormField, FormTemplate } from '../shared/models/form-field.model';
import { FormStorageService } from '../form-management/services/form-storage.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { FieldConfigDialogComponent } from '../shared/components/field-config-dialog/field-config-dialog.component';

@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './form-builder.component.html',
  styleUrl: './form-builder.component.scss'
})
export class FormBuilderComponent implements OnInit {
  availableFields = ['text', 'textarea', 'select', 'checkbox', 'radio', 'date'];
  formFields: FormField[] = [];
  form: FormGroup;
  formTemplate?: FormTemplate;
  formName: string = '';  // <-- Added form name property
  selectedField: FormField | null = null;

  constructor(
    private fb: FormBuilder,
    private formStorage: FormStorageService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.form = this.fb.group({});
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.formTemplate = this.formStorage.getFormById(id);
      if (this.formTemplate) {
        console.log('Loaded form for edit:', this.formTemplate);
        this.formFields = this.formTemplate.fields;
        this.formName = this.formTemplate.name; // <-- Load existing form name
        this.buildFormControls();
      }
    }
  }

  fieldComponents: { [key: string]: any } = {
    text: TextInputComponent,
    textarea: TextAreaComponent,
    select: DropdownComponent,
    checkbox: CheckboxGroupComponent,
    radio: RadioGroupComponent,
    date: DatePickerComponent
  };

  selectField(field: FormField): void {
    const dialogRef = this.dialog.open(FieldConfigDialogComponent, {
      width: '450px',
      data: field
    });

    dialogRef.afterClosed().subscribe(updatedField => {
      if (updatedField) {
        this.onFieldUpdate(updatedField);
      }
    });
  }

  onFieldUpdate(updatedField: FormField) {
    const index = this.formFields.findIndex(f => f.id === updatedField.id);
    if (index > -1) {
      this.formFields[index] = updatedField;
      this.updateFormControl(updatedField);
    }
  }

  updateFormControl(field: FormField) {
    const control = this.form.get(field.id);
    if (control) {
      const validators = [];

      if (field.required) validators.push(Validators.required);
      if (field.validations?.minLength)
        validators.push(Validators.minLength(field.validations.minLength));
      if (field.validations?.maxLength)
        validators.push(Validators.maxLength(field.validations.maxLength));
      if (field.validations?.pattern)
        validators.push(Validators.pattern(field.validations.pattern));

      control.setValidators(validators);
      control.updateValueAndValidity();
    }
  }

  buildFormControls() {
    this.form = this.fb.group({});
    this.formFields.forEach(field => {
      this.form.addControl(field.id, this.fb.control(''));
    });
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const newField: FormField = {
        id: Date.now().toString(),
        type: event.previousContainer.data[event.previousIndex],
        label: '',
        required: false,
        options: []
      };
      this.formFields.push(newField);
      this.form.addControl(newField.id, this.fb.control(''));
    }
  }

  submitForm() {
    const template: FormTemplate = {
      id: this.formTemplate ? this.formTemplate.id : this.generateId(),
      name: this.formName || 'Untitled Form',  // <-- Use form name here
      fields: this.formFields
    };

    this.formStorage.saveForm(template);
    alert('Form saved successfully!');
  }

  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
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
}

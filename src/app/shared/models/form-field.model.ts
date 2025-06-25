// shared/models/form-field.model.ts

import { FormArray, FormControl } from "@angular/forms";

export type FieldType = 'text' | 'textarea' | 'select' | 'checkbox' | 'date' | 'radio';

export interface ValidationRules {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
}

export interface FormField {
    id: string;
    type: FieldType;
    label: string;
    required: boolean;
    helpText?: string;
    validations?: ValidationRules;
    options?: string[]; // For dropdown, radio, checkbox group
}

export interface FieldConfigFormControls {
    label: FormControl<string>;
    required: FormControl<boolean>;
    helpText: FormControl<string>;
    minLength: FormControl<number | null>;
    maxLength: FormControl<number | null>;
    pattern: FormControl<string>;
    options?: FormArray<FormControl<string>>;

}

export interface FormTemplate {
  id: string;
  name: string;
  description?: string;
  fields: FormField[];
}

export interface FormBuilderState {
  fields: FormField[];
  selectedFieldId: string | null;
}

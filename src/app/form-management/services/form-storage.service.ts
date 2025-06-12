import { Injectable } from '@angular/core';
import { FormTemplate } from '../../shared/models/form-field.model';

const STORAGE_KEY = 'dynamic_form_templates';

@Injectable({
  providedIn: 'root'
})
export class FormStorageService {

  constructor() {}

  getForms(): FormTemplate[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  getFormById(id: string): FormTemplate | undefined {
    return this.getForms().find(f => f.id === id);
  }

  saveForm(template: FormTemplate): void {
    const forms = this.getForms();
    const index = forms.findIndex(f => f.id === template.id);

    if (index > -1) {
      forms[index] = template;
    } else {
      forms.push(template);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(forms));
  }

  deleteForm(id: string): void {
    const forms = this.getForms().filter(f => f.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(forms));
  }
}

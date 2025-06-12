import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormTemplate } from '../../shared/models/form-field.model';
import { FormStorageService } from '../services/form-storage.service';
import { AuthService } from '../../auth/services/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-form-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule, MatIconModule],
  templateUrl: './form-list.component.html',
  styleUrl: './form-list.component.scss'
})
export class FormListComponent implements OnInit {
  formTemplates: FormTemplate[] = [];

  constructor(
    private formStorage: FormStorageService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loadForms();
  }

  get role() {
    return this.authService.getRole();
  }

  loadForms() {
    this.formTemplates = this.formStorage.getForms();
  }

  onPreview(template: FormTemplate) {
    this.router.navigate(['/form-preview', template.id]);
  }

  onEdit(template: FormTemplate) {
    this.router.navigate(['/form-builder', template.id]);
  }

  onDelete(id: string) {
    this.formStorage.deleteForm(id);
    this.loadForms();
  }
}

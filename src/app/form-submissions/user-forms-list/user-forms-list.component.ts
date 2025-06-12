import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormStorageService } from '../../form-management/services/form-storage.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-user-forms-list',
  templateUrl: './user-forms-list.component.html',
  styleUrl: './user-forms-list.component.scss',
  imports: [CommonModule, MatButtonModule]
})
export class UserFormsListComponent implements OnInit {
  forms: any[] = [];

  constructor(
    private formStorage: FormStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.forms = this.formStorage.getForms();
  }

  fillForm(id: string) {
    this.router.navigate(['/fill', id]);
  }
}

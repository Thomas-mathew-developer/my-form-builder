import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { SubmissionService } from '../submission-service.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-submissions-list',
  templateUrl: './submissions-list.component.html',
  styleUrl: './submissions-list.component.scss',
  imports: [CommonModule, MatButtonModule, MatIconModule]
})
export class SubmissionsListComponent implements OnInit {
  submissions: any[] = [];

  constructor(
    private submissionService: SubmissionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.submissions = this.submissionService.getSubmissions();
  }

  viewDetails(id: string) {
    this.router.navigate(['/submissions', id]);
  }
}

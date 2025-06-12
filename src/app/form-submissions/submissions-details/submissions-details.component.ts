import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SubmissionService } from '../submission-service.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// import { SubmissionService } from './submission-service.service';

@Component({
  standalone: true,
  selector: 'app-submission-details',
  imports: [CommonModule, MatButtonModule, RouterModule, MatIconModule],
  templateUrl: './submissions-details.component.html',
  styleUrl: './submissions-details.component.scss',
  
})
export class SubmissionsDetailsComponent implements OnInit {
  submission: any;
  objectKeys = Object.keys;

  constructor(
    private route: ActivatedRoute,
    private submissionService: SubmissionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.submission = this.submissionService.getSubmissionById(id);
      if (!this.submission) {
        alert('Submission not found!');
        this.router.navigate(['/submissions']);
      }
    }
  }
}

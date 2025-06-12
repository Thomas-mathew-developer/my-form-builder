import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  private storageKey = 'form_submissions';
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // Mock API endpoint

  constructor(private http: HttpClient) { }

  // Get all submissions from local storage
  getSubmissions() {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  // Get submission by ID
  getSubmissionById(id: string) {
    const submissions = this.getSubmissions();
    return submissions.find((sub: any) => sub.id === id);
  }

  // Save submission locally to local storage
  saveSubmission(submission: any) {
    const submissions = this.getSubmissions();
    submissions.push(submission);
    localStorage.setItem(this.storageKey, JSON.stringify(submissions));
  }

  // Submit to mock API with error handling
  submitToApi(submission: any): Observable<any> {
    return this.http.post(this.apiUrl, submission).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('API submission failed:', error);
        return throwError(() => new Error('Failed to submit form to server.'));
      })
    );
  }
}

import { TestBed } from '@angular/core/testing';
import { FormFillerComponent } from './form-filler.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FormStorageService } from '../form-management/services/form-storage.service';
import { SubmissionService } from '../form-submissions/submission-service.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

describe('FormFillerComponent', () => {
    let formStorageServiceSpy: jasmine.SpyObj<FormStorageService>;
    let submissionServiceSpy: jasmine.SpyObj<SubmissionService>;

    beforeEach(async () => {
        formStorageServiceSpy = jasmine.createSpyObj('FormStorageService', ['getFormById']);
        submissionServiceSpy = jasmine.createSpyObj('SubmissionService', ['saveSubmission', 'submitToApi']);

        // Add a mock implementation for submitToApi that returns a successful observable
        submissionServiceSpy.submitToApi.and.returnValue(of({ status: 'success' }));

        await TestBed.configureTestingModule({
            imports: [
                FormFillerComponent,
                ReactiveFormsModule,
                MatButtonModule,
                MatInputModule,
                NoopAnimationsModule
            ],
            providers: [
                { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 'test-id' } } } },
                { provide: FormStorageService, useValue: formStorageServiceSpy },
                { provide: SubmissionService, useValue: submissionServiceSpy }
            ]
        }).compileComponents();
    });

    it('should create component', () => {
        const fixture = TestBed.createComponent(FormFillerComponent);
        const component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });

    it('should submit form successfully', () => {
        const fixture = TestBed.createComponent(FormFillerComponent);
        const component = fixture.componentInstance;

        // Mock formTemplate
        component.formTemplate = {
            id: 'test-id',
            name: 'Test Form',
            fields: [
                { id: 'field1', label: 'Field 1', type: 'text', required: true }
            ]
        };
        component.buildForm();
        component.form.get('field1')?.setValue('Test Value');

        // Trigger submit
        component.submitForm();

        // Expect saveSubmission to be called
        expect(submissionServiceSpy.saveSubmission).toHaveBeenCalled();

        // Expect submitToApi to be called
        expect(submissionServiceSpy.submitToApi).toHaveBeenCalled();
    });
});

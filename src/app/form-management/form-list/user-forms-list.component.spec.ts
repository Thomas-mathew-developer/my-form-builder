import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormListComponent } from './form-list.component';
import { FormStorageService } from '../services/form-storage.service';
import { AuthService } from '../../auth/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('FormListComponent', () => {
    let component: FormListComponent;
    let fixture: ComponentFixture<FormListComponent>;
    let formStorageServiceSpy: jasmine.SpyObj<FormStorageService>;
    let authServiceSpy: jasmine.SpyObj<AuthService>;

    beforeEach(async () => {
        const formStorageSpy = jasmine.createSpyObj('FormStorageService', ['getForms', 'deleteForm']);
        const authSpy = jasmine.createSpyObj('AuthService', ['getRole']);

        await TestBed.configureTestingModule({
            imports: [FormListComponent, RouterTestingModule],
            providers: [
                { provide: FormStorageService, useValue: formStorageSpy },
                { provide: AuthService, useValue: authSpy }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(FormListComponent);
        component = fixture.componentInstance;
        formStorageServiceSpy = TestBed.inject(FormStorageService) as jasmine.SpyObj<FormStorageService>;
        authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load forms on init', () => {
        const mockForms = [{ id: '1', name: 'Test Form', fields: [] }];
        formStorageServiceSpy.getForms.and.returnValue(mockForms);

        component.ngOnInit();

        expect(component.formTemplates.length).toBe(1);
        expect(component.formTemplates[0].name).toBe('Test Form');
    });

    it('should delete a form and reload forms', () => {
        const mockForms = [{ id: '1', name: 'Test Form', fields: [] }];
        formStorageServiceSpy.getForms.and.returnValue(mockForms);

        component.loadForms();
        expect(component.formTemplates.length).toBe(1);

        component.onDelete('1');
        expect(formStorageServiceSpy.deleteForm).toHaveBeenCalledWith('1');
        expect(formStorageServiceSpy.getForms).toHaveBeenCalledTimes(2); // initial + after delete
    });
});

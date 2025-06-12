import { Routes } from '@angular/router';
import { FormPreviewComponent } from './form-management/form-preview/form-preview.component';
import { FormListComponent } from './form-management/form-list/form-list.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { SubmissionsListComponent } from './form-submissions/submissions-list/submissions-list.component';
import { SubmissionsDetailsComponent } from './form-submissions/submissions-details/submissions-details.component';
import { UserFormsListComponent } from './form-submissions/user-forms-list/user-forms-list.component';
import { authGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'form-builder',
        pathMatch: 'full',
    },
    {
        path: 'form-builder',
        canActivate: [authGuard],
        data: { expectedRoles: ['Admin'] },
        loadComponent: () =>
            import('./form-builder/form-builder.component').then((m) => m.FormBuilderComponent),
    },
    {
        path: 'fill/:id',
        canActivate: [authGuard],
        data: { expectedRoles: ['User'] },
        loadComponent: () => import('./form-filler/form-filler.component').then(m => m.FormFillerComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'unauthorized',
        canActivate: [authGuard],
        loadComponent: () => import('./shared/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent)
    },
    { path: 'form-builder/:id', data: { expectedRoles: ['Admin'] }, component: FormBuilderComponent, canActivate: [authGuard] },
    { path: 'form-preview/:id', component: FormPreviewComponent},
    { path: 'form-list', component: FormListComponent},
    { path: 'submissions', component: SubmissionsListComponent },
    { path: 'submissions/:id', component: SubmissionsDetailsComponent },
    { path: 'submit-forms', data: { expectedRoles: ['User'] }, component: UserFormsListComponent, canActivate: [authGuard] },

];

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const expectedRole = route.data?.['expectedRole'];
    const currentRole = authService.getRole();

    if (currentRole === expectedRole) {
        return true;
    } else {
        router.navigate(['/login']);
        return false;
    }
};

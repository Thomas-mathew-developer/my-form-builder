import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-unauthorized',
    template: `<h2>Unauthorized</h2><p>You do not have permission to view this page.</p>`,
    imports: [CommonModule]
})
export class UnauthorizedComponent { }

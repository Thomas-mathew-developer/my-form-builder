import { Component, ViewChild } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { AuthService } from './auth/services/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-form-builder-app';

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  sidenavMode: 'side' | 'over' = 'side';

  constructor(
    public authService: AuthService,
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    this.setupSidenavMode();
  }

  get role() {
    return this.authService.getRole();
  }

  setupSidenavMode() {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        if (result.matches) {
          this.sidenavMode = 'over';
          this.sidenav?.close();
        } else {
          this.sidenavMode = 'side';
          this.sidenav?.open();
        }
      });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

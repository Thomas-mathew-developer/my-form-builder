import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    BrowserAnimationsModule,
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(MatNativeDateModule),
    importProvidersFrom(HttpClientModule)
  ]
};

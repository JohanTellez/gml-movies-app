import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClientJsonpModule, provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { SearchComponent } from './pages/search/search.component';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    HttpClientJsonpModule,
    SearchComponent,
    RouterModule
  ]
};

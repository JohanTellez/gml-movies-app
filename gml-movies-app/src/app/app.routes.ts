import { Routes } from '@angular/router';

import { SearchComponent } from './pages/search/search.component';
import { DetailsComponent } from './pages/details/details.component';


export const routes: Routes = [
    { path: '', component: SearchComponent },
    { path: 'details/:id', component: DetailsComponent }
];
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
// import { ImprintComponent } from './shared/imprint/imprint.component';
import { PolicyComponent } from './shared/policy/policy.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    // { path: 'imprint', component: ImprintComponent },
    { path: 'policy', component: PolicyComponent },
    { path: '**', redirectTo: '' }
];
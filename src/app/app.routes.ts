import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmpmgtModule } from './empmgt/empmgt.module';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'dash', canActivate: [authGuard], component: DashboardComponent },
    // { path: '**', component: LandingComponent },
    { path: 'empmgt', canActivate: [authGuard], loadChildren: () => import('./empmgt/empmgt.module').then(m => EmpmgtModule) },
];

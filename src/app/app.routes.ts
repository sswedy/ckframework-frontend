import { Routes } from '@angular/router';
import {AuthCallbackComponent} from "./auth-callback/auth-callback.component";
import {TokenManagementComponent} from "./token-management/token-management.component";
import {AuthErrorComponent} from "./auth-error/auth-error.component";

export const routes: Routes = [
  { path: 'auth-callback', component: AuthCallbackComponent },
  { path: 'token-management', component: TokenManagementComponent },
  { path: 'auth-error', component: AuthErrorComponent },
];

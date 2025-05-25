import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-error',
  standalone: true,
  imports: [],
  templateUrl: './auth-error.component.html',
  styleUrl: './auth-error.component.css'
})
export class AuthErrorComponent {
  redirectToLogin(): void {
    const keycloakAuthUrl = 'http://localhost:8181/realms/myrealm/protocol/openid-connect/auth';
    const clientId = 'myclient';
    const redirectUri = encodeURIComponent('http://localhost:8000/auth-callback');
    const responseType = 'token';
    const scope = 'openid';

    const authUrl = `${keycloakAuthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
    window.location.href = authUrl;
  }
}

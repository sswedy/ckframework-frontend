import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {CredentialsService} from "../data/credentials.service";
import {TokenManagementStore} from "./token-management.store";
import {Router} from "@angular/router";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-token-management',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './token-management.component.html',
  styleUrl: './token-management.component.css'
})
export class TokenManagementComponent implements OnInit, OnDestroy {
  tokens$ = this.tokenManagementStore.tokens$;
  loading$ = this.tokenManagementStore.loading$;
  error$ = this.tokenManagementStore.error$;
  private subscription = new Subscription();

  constructor(
    public credentialsService: CredentialsService,
    private tokenManagementStore: TokenManagementStore,
    private router: Router
  ) {}

  ngOnInit(): void {

  }

  onGenerate(): void {
    this.tokenManagementStore.generateToken();
  }

  redirectToLogin(): void {
    const keycloakAuthUrl = 'http://localhost:8181/realms/myrealm/protocol/openid-connect/auth';
    const clientId = 'myclient';
    const redirectUri = encodeURIComponent('http://localhost:8000/auth-callback');
    const responseType = 'token';
    const scope = 'openid';

    const authUrl = `${keycloakAuthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
    window.location.href = authUrl;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

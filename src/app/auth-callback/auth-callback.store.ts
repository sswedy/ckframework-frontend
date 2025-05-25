import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import {CredentialsService} from "../data/credentials.service";

@Injectable({ providedIn: 'root' })
export class AuthCallbackStore implements OnDestroy {
  private readonly _tokenSaved$ = new Subject<void>();
  public readonly tokenSaved$ = this._tokenSaved$.asObservable();

  constructor(private credentialsService: CredentialsService) {}

  public saveAccessToken(token: string): void {
    if (token) {
      this.credentialsService.saveToken(token);
      this._tokenSaved$.next();
    }
  }

  ngOnDestroy(): void {
    this._tokenSaved$.complete();
  }
}

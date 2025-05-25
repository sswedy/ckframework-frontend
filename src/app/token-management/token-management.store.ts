import { Injectable, OnDestroy } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from "@ngrx/operators";
import { switchMap, tap } from 'rxjs/operators';

import { Subject } from 'rxjs';
import {ApiTokenService} from "../client/api/apiToken.service";
import {GetApiTokensResponse} from "../client/model/getApiTokensResponse";
import {ApiTokenDto} from "../client/model/apiTokenDto";

export interface TokenManagementState {
  tokens: ApiTokenDto[];
  loading: boolean;
  error: string | null;
}

@Injectable({ providedIn: 'root' })
export class TokenManagementStore extends ComponentStore<TokenManagementState> implements OnDestroy {
  readonly tokens$ = this.select(state => state.tokens);
  readonly loading$ = this.select(state => state.loading);
  readonly error$ = this.select(state => state.error);

  constructor(private apiTokenService: ApiTokenService) {
    super({ tokens: [], loading: false, error: null });
    this.loadTokens();
  }

  readonly loadTokens = this.effect<void>(trigger$ =>
    trigger$.pipe(
      tap(() => this.patchState({ loading: true, error: null })),
      switchMap(() =>
        this.apiTokenService.getTokens().pipe(
          tapResponse(
            (response: GetApiTokensResponse) => {
              this.patchState({ tokens: response.tokens, loading: false });
            },
            _ => {
              this.patchState({ error: 'Ошибка загрузки токенов', loading: false });
            }
          )
        )
      )
    )
  );

  readonly generateToken = this.effect<void>(trigger$ =>
    trigger$.pipe(
      tap(() => this.patchState({ loading: true, error: null })),
      switchMap(() =>
        this.apiTokenService.generateToken().pipe(
          tapResponse(
            (newToken: ApiTokenDto) => {
              this.patchState(state => ({ tokens: [newToken, ...state.tokens], loading: false }));
            },
            _ => {
              this.patchState({ error: 'Ошибка генерации токена', loading: false });
            }
          )
        )
      )
    )
  );

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}

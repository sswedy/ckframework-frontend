import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthCallbackStore} from "./auth-callback.store";

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  imports: [],
  templateUrl: './auth-callback.component.html',
  styleUrl: './auth-callback.component.css'
})
export class AuthCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authCallbackStore: AuthCallbackStore
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const accessToken = params.get('access_token');
      if (accessToken) {
        this.authCallbackStore.saveAccessToken(accessToken);
        this.authCallbackStore.tokenSaved$.subscribe(() => {
          this.router.navigate(['/token-management']);
        });
      } else {
        this.router.navigate(['/auth-error']);
      }
    });
  }
}

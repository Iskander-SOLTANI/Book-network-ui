import { HttpInterceptorFn } from '@angular/common/http';
import { AuthenticationService } from '../services';
import { inject } from '@angular/core';
import { TokenService } from '../token/token.service';

export const httpInterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthenticationService);
  const tokenService = inject(TokenService);
  const token: string = tokenService.getToken || '';

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};


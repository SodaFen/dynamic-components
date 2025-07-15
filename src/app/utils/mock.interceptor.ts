import {
  HttpRequest,
  HttpResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { of } from 'rxjs';
import * as mockData from '../../assets/pages.json';

export const mockInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next,
) => {
  if (req.url === '/api/pages') {
    return of(
      new HttpResponse({
        status: 200,
        body: mockData.pages,
      }),
    );
  }
  return next(req);
};

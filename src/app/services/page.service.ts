import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PageConfig } from '../models/page-config.model';

@Injectable({ providedIn: 'root' })
export class PageService {
  constructor(private http: HttpClient) {}

  getPageConfig(): Observable<PageConfig[]> {
    return this.http.get<PageConfig[]>(`/api/pages`);
  }
}

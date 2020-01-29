import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Injectable()
export class RequestService {
  constructor(private http: HttpClient, private router: Router) {}

  doGET(urlBE: string, params?: HttpParams) {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.get(environment.coreAPI + urlBE, { headers, params });
  }

  doPOST(urlBE: string, body: JSON, params?: HttpParams) {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.post(environment.coreAPI + urlBE, body, { headers, params });
  }
}

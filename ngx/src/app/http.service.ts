import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  public async post(path: string, command: string, options?: { headers?: HttpHeaders }): Promise<any> {
    return await this.httpPost(path, command, options).catch(this.handleError);
  }

  private async httpPost(path: string, command: string, options?: { headers?: HttpHeaders }): Promise<any> {
    if (!command || !path) {
      return Promise.reject(new Error('invalid arguments'));
    }
    const headers = options && options.headers ? options.headers : new HttpHeaders({ 'Content-Type': 'application/json' });
    const httpClientOptions = { headers: headers };
    return await this.httpClient
      .post('/api/' + path, JSON.stringify({ command: command }), httpClientOptions)
      .toPromise()
      .catch(this.handleError);
  }

  public async get(resource: string, options?: { headers?: HttpHeaders }): Promise<any> {
    return await this.httpGet(resource, options).catch(this.handleError);
  }

  private async httpGet(resource: string, options?: { headers?: HttpHeaders }): Promise<any> {
    if (!resource) {
      return Promise.reject(new Error('invalid arguments'));
    }
    const headers = options && options.headers ? options.headers : new HttpHeaders({ 'Content-Type': 'application/json' });
    const httpClientOptions = { headers: headers };
    return await this.httpClient
      .get('/api/' + resource, httpClientOptions)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

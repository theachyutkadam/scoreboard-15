import { Injectable } from '@angular/core';
import { API_URL, API_BASE_URL, authToken } from './config';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  AUTH_TOKEN = sessionStorage.getItem('authToken')
  constructor(private _http: HttpClient) { }

  httpHeaderWithToken = new HttpHeaders({
    'Accept': 'application/json',
    'content-type': 'application/json',
    'Authorization': `${authToken}`,
  })

  get(url: any, params: any = null): Observable<any> {
    const configured_params = this.configureParams(params)
    return this._http.get(`${API_BASE_URL}${url}${configured_params}`, { headers: this.httpHeaderWithToken })
  }

  post(url: any, payload: any, params: any = null) {
    const configured_params = this.configureParams(params)
    return this._http.post(`${API_BASE_URL}${url}${configured_params}`, payload, {headers: this.httpHeaderWithToken})
  }

  put(url: any, payload: any) {
    return this._http.put(`${API_BASE_URL}${url}`, payload, {headers: this.httpHeaderWithToken})
  }

  patch(url: any, payload: any) {
    return this._http.patch(`${API_BASE_URL}${url}`, payload, {headers: this.httpHeaderWithToken})
  }

  delete(url: any) {
    return this._http.delete(`${API_BASE_URL}${url}`, {headers: this.httpHeaderWithToken})
  }

  configureParams(params: any) {
    let params_string = ""
    if (params) {
      params.forEach((element: any, index: number) => {
        if (index == 0) {
          params_string += `?${element.key}=${element.value}`
        }

        if (index > 0 && params.length > 1) {
          params_string += `&${element.key}=${element.value}`
        }
      });
    }
    return params_string
  }
}

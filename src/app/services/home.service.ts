import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  baseUrl: string = 'https://www.empregos.com.br/user-controls/hdlSugest2.ashx?t=CE&term=';
  baseUrl2: string = 'https://www.empregos.com.br/user-controls/hdlSugest2.ashx?t=CE&term=';


  constructor(private http: HttpClient) { }

  search(queryString: string): Observable<any> {
    let URL = this.baseUrl + queryString;
    return this.http.get(URL);
}

searcJob(queryString: string): Observable<any> {
  let URL = this.baseUrl2 + queryString;
  return this.http.get(URL);
}
}

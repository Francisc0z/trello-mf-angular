import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListServiceService {
  private apiUrl = 'http://localhost:8081/api/v1/lists';

  constructor(private http: HttpClient) {}

  read(): Observable<any> {
    console.log("whas");
    let token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': token ? token : ''
    });
    
    // Correcto uso de `HttpHeaders` en la solicitud
    return this.http.post<any>(`${this.apiUrl}/read`, {}, { headers });
  }

  add(listName:string): Observable<any> {
    let token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': token ? token : ''
    });
    
    // Correcto uso de `HttpHeaders` en la solicitud
    return this.http.post<any>(`${this.apiUrl}/create`, {name: listName, board_id: "66c13b62992021c2ed739292"}, { headers });
  }

  delete(listId:string): Observable<any> {
    let token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': token ? token : ''
    });
    
    // Correcto uso de `HttpHeaders` en la solicitud
    return this.http.post<any>(`${this.apiUrl}/delete`, {_id: listId, board_id: "66c13b62992021c2ed739292"}, { headers });
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardServiceService {
  private messageSource = new BehaviorSubject<any>('default message');
  currentMessage = this.messageSource.asObservable();
  private apiUrl = 'http://localhost:8081/api/v1/cards';

  constructor(private http: HttpClient) {}
  changeMessage(message: string, listId: string) {
    const item = {task: message, listId: listId}
    this.messageSource.next(item);
  }
  cardAddTask(taskName:string){
    console.log(taskName);
    
  }

  create(cardAdded:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log(cardAdded);
    
    // Correcto uso de `HttpHeaders` en la solicitud
    return this.http.post<any>(`${this.apiUrl}/create`, cardAdded, { headers });
  }
  read(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });    
    return this.http.post<any>(`${this.apiUrl}/read`, { headers });
  }
  delete(id:string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });    
    return this.http.post<any>(`${this.apiUrl}/delete`, {id} ,{ headers });
  }
}

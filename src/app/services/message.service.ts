import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'http://localhost:5000/api/messages'; 

  constructor(private http: HttpClient) {}

  sendMessage(data: ContactMessage): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}

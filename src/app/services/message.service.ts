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
  // API-endpoint för att skicka meddelanden
  private apiUrl = 'https://rest-restaurant.onrender.com/api/messages'; 

  // HttpClient injiceras för att kunna göra HTTP-anrop
  constructor(private http: HttpClient) {}

  /**
   * Skickar ett kontaktmeddelande till servern via POST
   * @param data Objekt med kontaktinformation (namn, e-post, meddelande, etc.)
   * @returns Observable med svar från servern
   */
  sendMessage(data: ContactMessage): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BookingRequest {
  name: string;
  email: string;
  guests: number;
  date: string;
  time: string;
}

export interface BookingResponse {
  message: string;
  bookingId: number;
  assignedTable: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  // API-endpoint för bokningar
  private apiUrl = 'https://rest-restaurant.onrender.com/api/bookings';

  // Injektion av HttpClient för att göra HTTP-anrop
  constructor(private http: HttpClient) {}

  /**
   * Skickar en ny bokning till API:t.
   * @param data - Bokningsinformationen som skickas till servern
   * @returns Observable med serverns svar (bokningsbekräftelse eller fel)
   */
  createBooking(data: BookingRequest): Observable<BookingResponse> {
    return this.http.post<BookingResponse>(this.apiUrl, data);
  }
}
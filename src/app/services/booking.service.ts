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
  private apiUrl = 'https://rest-restaurant.onrender.com/api/bookings';

  constructor(private http: HttpClient) {}

  createBooking(data: BookingRequest): Observable<BookingResponse> {
    return this.http.post<BookingResponse>(this.apiUrl, data);
  }
}

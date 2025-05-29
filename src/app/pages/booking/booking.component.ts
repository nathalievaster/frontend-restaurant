import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService, BookingRequest } from '../../services/booking.service';

@Component({
  selector: 'app-booking',
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  // Alla fält i formuläret, initialvärden så formuläret är tomt vid start
    booking: BookingRequest = {
    name: '',
    email: '',
    guests: 1,
    date: '',
    time: ''
  };

  // Variabel för lyckade meddelanden, kan vara string eller null och sätts till null som start
  message: string | null = null;
  // Lagrar felmeddelanden i array
  error: string[] = [];

  // Använder servicen som sköter kommunikation med min backend
  constructor(private bookingService: BookingService) {}

  submitForm() {
    // Töm gamla felmeddelanden och meddelanden
    this.error = [];
    this.message = null;

    // Skickar bokning till backend via service, subscribe med observable
    this.bookingService.createBooking(this.booking).subscribe({
      next: (res) => {
        // Om bokning lyckades, återställ sedan formuläret
        this.message = `Bokning bekräftad! Bord #${res.assignedTable}`;
        this.booking = { name: '', email: '', guests: 1, date: '', time: '' };
      },
      error: (err) => {
        // Om backend skickar flera felmeddelanden
        if (err.error?.errors) {
          this.error = err.error.errors;
          // Om backend skickade ett enda
        } else {
          this.error = [err.error?.message || 'Något gick fel. Försök igen.'];
        }
      }
    });
  }
}

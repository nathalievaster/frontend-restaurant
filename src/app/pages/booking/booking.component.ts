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
  booking: BookingRequest = {
    name: '',
    email: '',
    guests: 1,
    date: '',
    time: ''
  };

  availableTimes: string[] = [];

  message: string | null = null;
  error: string[] = [];

  constructor(private bookingService: BookingService) {}

  onDateChange() {
    if (!this.booking.date) return;

    const selectedDate = new Date(this.booking.date);
    const day = selectedDate.getDay(); // 0 = söndag ... 6 = lördag

    let start = '';
    let end = '';

    if (day >= 0 && day <= 4) {
      // Sön–Tors: 11:00–22:00
      start = '11:00';
      end = '22:00';
    } else {
      // Fre–Lör: 12:00–23:30
      start = '12:00';
      end = '23:30';
    }

    this.availableTimes = this.generateTimeSlots(start, end, 30);
    // Nollställ vald tid om den inte längre är giltig
    if (!this.availableTimes.includes(this.booking.time)) {
      this.booking.time = '';
    }
  }

generateTimeSlots(start: string, end: string, intervalMinutes: number): string[] {
  const times: string[] = [];

  // Dela upp start- och sluttid i timmar och minuter
  let [startHour, startMin] = start.split(':').map(Number);
  let [endHour, endMin] = end.split(':').map(Number);

  // Skapa ett Date-objekt för starttiden
  const current = new Date();
  current.setHours(startHour, startMin, 0, 0);

  // Skapa ett Date-objekt för sluttiden
  const endTime = new Date();
  endTime.setHours(endHour, endMin, 0, 0);

  // Loopar och skapar tider så länge vi inte har passerat sluttiden
  while (current <= endTime) {
    // Hämta timmar och minuter, formaterat som "HH:mm"
    const hours = current.getHours().toString().padStart(2, '0');
    const minutes = current.getMinutes().toString().padStart(2, '0');
    
    // Lägg till tiden i listan
    times.push(`${hours}:${minutes}`);
    
    // Gå framåt med angivet intervall
    current.setMinutes(current.getMinutes() + intervalMinutes);
  }

  return times;
}

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
        this.availableTimes = [];
      },
      error: (err) => {
        // Om backend skickar flera felmeddelanden
        if (err.error?.errors) {
          this.error = err.error.errors;
        } else {
          this.error = [err.error?.message || 'Något gick fel. Försök igen.'];
        }
      }
    });
  }
}

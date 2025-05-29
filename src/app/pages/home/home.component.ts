import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService, ContactMessage } from '../../services/message.service';

@Component({
  selector: 'app-home',
  imports: [ CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // Kontaktformulärets data binds via ngmodel i HTML
  contact: ContactMessage = { name: '', email: '', message: '' };

  // En sträng visas om textformuläret skickats korrekt, annars null, initieras som null
  successMessage: string | null = null;
  // Samlar felmeddelanden i en array
  errorMessages: string[] = [];

  // Använder en service för att hantera anrop till API
  constructor(private messageService: MessageService) {}

  onSubmit() {

    // Nollställ felmeddelanden eller successmeddelanden
    this.errorMessages = [];
    this.successMessage = null;

    // Använd servicen för att skicka data till backend, observable för att subscribe
    this.messageService.sendMessage(this.contact).subscribe({
      // Om lyckat
      next: (res) => {
        this.successMessage = res.message;
        this.contact = { name: '', email: '', message: '' };
      },
      // Om det misslyckades
      error: (err) => {
        if (err.error?.errors) {
          this.errorMessages = err.error.errors;
        } else {
          this.errorMessages = [err.error?.message || 'Något gick fel. Försök igen.'];
        }
      }
    });
  }

  // Formuläret visas inte som utgångspunkt
  showContact = false;
// Växlar synlighet för formuläret
toggleContact() {
  this.showContact = !this.showContact;
}

// Getter för errorMessages i HTML
get errors(): string[] {
  return this.errorMessages;
}
}

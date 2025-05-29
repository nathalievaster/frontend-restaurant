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
  contact: ContactMessage = { name: '', email: '', message: '' };
  successMessage: string | null = null;
  errorMessages: string[] = [];

  constructor(private messageService: MessageService) {}

  onSubmit() {
    this.errorMessages = [];
    this.successMessage = null;

    this.messageService.sendMessage(this.contact).subscribe({
      next: (res) => {
        this.successMessage = res.message;
        this.contact = { name: '', email: '', message: '' };
      },
      error: (err) => {
        if (err.error?.errors) {
          this.errorMessages = err.error.errors;
        } else {
          this.errorMessages = [err.error?.message || 'Något gick fel. Försök igen.'];
        }
      }
    });
  }
  showContact = false;

toggleContact() {
  this.showContact = !this.showContact;
}

get errors(): string[] {
  return this.errorMessages;
}
}

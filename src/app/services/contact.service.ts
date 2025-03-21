import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactMessage } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'https://your-api-url/contact-messages'; // Replace with Firebase or backend API

  constructor(private http: HttpClient) {}

  /**
   * Submit a contact form message
   * @param contactData - The contact message details
   * @returns Observable<any> - Response from backend
   */
  sendMessage(contactData: ContactMessage): Observable<any> {
    return this.http.post(this.apiUrl, contactData);
  }

  /**
   * Retrieve all contact form messages
   * @returns Observable<ContactMessage[]> - List of messages from backend
   */
  getContactMessages(): Observable<ContactMessage[]> {
    return this.http.get<ContactMessage[]>(this.apiUrl);
  }
}

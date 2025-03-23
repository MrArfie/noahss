import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ContactMessage } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = `${environment.apiUrl}/contact-messages`; // ✅ Uses environment variable

  constructor(private http: HttpClient) {}

  /**
   * 📩 Submit a contact form message
   */
  sendMessage(contactData: ContactMessage): Observable<any> {
    return this.http.post(this.apiUrl, contactData).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * 📬 Retrieve all contact form messages
   */
  getContactMessages(): Observable<ContactMessage[]> {
    return this.http.get<ContactMessage[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * ❗ Handle API errors
   */
  private handleError(error: any): Observable<never> {
    console.error('ContactService Error:', error);
    const message = error?.error?.msg || 'Something went wrong with contact service.';
    return throwError(() => new Error(message));
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authStatus = new BehaviorSubject<boolean>(false); 

  constructor() {
    if (this.isLocalStorageAvailable()) {
      const token = localStorage.getItem('token');
      this.authStatus.next(!!token);
    }
  }

  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  getAuthStatus() {
    return this.authStatus.asObservable();
  }

  login(token: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('token', token);
      this.authStatus.next(true); 
    }
  }

  logout(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('token');
      this.authStatus.next(false); 
    }
  }
}

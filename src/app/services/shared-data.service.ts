import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  constructor(private http: HttpClient) {}

  // Register User in Database
  signup(userData: any) {
    const formData = new FormData();

    for (let key in userData) {
      formData.append(key, userData[key]);
    }

    return this.http.post<any>('http://localhost:4200/users', formData);
  }
}

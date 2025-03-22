import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShelterService {
  private apiUrl = 'http://localhost:5000/api/shelters';

  constructor(private http: HttpClient) {}

  // ✅ CREATE
  createShelter(shelter: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, shelter);
  }

  // ✅ READ
  getShelters(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // ✅ UPDATE
  updateShelter(id: string, shelter: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, shelter);
  }

  // ✅ DELETE
  deleteShelter(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

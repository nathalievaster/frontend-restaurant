import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  // URL till API:t där menydata hämtas
  private apiUrl = 'https://rest-restaurant.onrender.com/api/menu';

  // Injekterar HttpClient för att kunna utföra HTTP-anrop
  constructor(private http: HttpClient) {}

  /**
   * Hämtar menydata från API:t.
   * @returns Observable som innehåller en array av menyobjekt
   */
  getMenu(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.apiUrl);
  }
}

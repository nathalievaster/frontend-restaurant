import { Component } from '@angular/core';
import { MenuService, MenuItem } from '../../services/menu.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  // Array som kommer innehålla menyobjekten hämtade från API:t
  menuItems: MenuItem[] = [];

  // Injicerar MenuService för att hämta menydata
  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    // Prenumererar på observablen från menytjänsten
    this.menuService.getMenu().subscribe({
      next: (data) => {
        this.menuItems = data; // Tilldelar datan till menyItems vid lyckad hämtning
      },
      error: (err) => {
        console.error('Kunde inte hämta meny:', err); // Loggar eventuella fel
      }
    });
  }

  // Getter för att returnera en lista med unika kategorinamn från menyn
  get categories(): string[] {
    return Object.keys(this.groupedByCategory());
  }

  // Hjälpmetod för att gruppera menyobjekt efter kategori
  groupedByCategory(): { [category: string]: MenuItem[] } {
    return this.menuItems.reduce((groups, item) => {
      const cat = item.category || 'Okategoriserad'; // Hanterar fall där kategori saknas
      if (!groups[cat]) groups[cat] = [];            // Skapar ny kategori-array om den inte finns
      groups[cat].push(item);                        // Lägger till objektet i rätt kategori
      return groups;
    }, {} as { [key: string]: MenuItem[] });         // Typdefinierar ackumulatorn som objekt med kategorinycklar
  }
}
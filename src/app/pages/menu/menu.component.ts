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
  menuItems: MenuItem[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.getMenu().subscribe({
      next: (data) => {
        this.menuItems = data;
      },
      error: (err) => {
        console.error('Kunde inte hämta meny:', err);
      }
    });
  }

  get categories(): string[] {
    return Object.keys(this.groupedByCategory());
  }

  groupedByCategory(): { [category: string]: MenuItem[] } {
    return this.menuItems.reduce((groups, item) => {
      const cat = item.category || 'Okategoriserad';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(item);
      return groups;
    }, {} as { [key: string]: MenuItem[] });
  }
}

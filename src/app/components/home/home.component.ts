import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/model/Event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  events: Event[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  paginatedEvents: Event[] = [];
  totalPages: number = 0;
  
  sortDirection: 'nameAsc' | 'nameDesc' | 'dateAsc' | 'dateDesc' = 'nameAsc';


  eventTypes: string[] = [
    'Business & Professional',
    'Entertainment & Leisure',
    'Social & Community',
    'Awards & Recognition',
    'Various'
  ];
  
  filterType: string = 'all';
  // sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private router: Router, private route: ActivatedRoute, private eventService: EventService) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.events = data['events']; // Resolver-provided data
      this.updatePaginatedEvents();
    });
  }


  onFilterChange(event: any): void {
    this.filterType = event.target.value;
    this.currentPage = 1; // Reset to first page when filter changes
    this.updatePaginatedEvents();
  }

  onSortChange(direction: 'nameAsc' | 'nameDesc' | 'dateAsc' | 'dateDesc'): void {
    this.sortDirection = direction;
    this.updatePaginatedEvents();
  }
  
  updatePaginatedEvents(): void {
    let filteredAndSortedEvents = this.events;
  
    if (this.filterType !== 'all') {
      filteredAndSortedEvents = filteredAndSortedEvents.filter(event => event.type === this.filterType);
    }
  
    filteredAndSortedEvents = filteredAndSortedEvents.sort((a, b) => {
      switch (this.sortDirection) {
        case 'nameAsc':
          return a.name.localeCompare(b.name);
        case 'nameDesc':
          return b.name.localeCompare(a.name);
        case 'dateAsc':
          return new Date(a.doe).getTime() - new Date(b.doe).getTime();
        case 'dateDesc':
          return new Date(b.doe).getTime() - new Date(a.doe).getTime();
        default:
          return 0;
      }
    });
    
    this.totalPages = Math.ceil(filteredAndSortedEvents.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedEvents = filteredAndSortedEvents.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedEvents();
  }

  getTotalPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  onLinkClicked(id: string): void {
    this.router.navigate(['event', id]);
  }
}

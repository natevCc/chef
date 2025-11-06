import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  showSearch = signal<boolean>(true);
  showCreateButton = signal<boolean>(true);
  showSidebarText = signal<boolean>(false);
}

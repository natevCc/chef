import { Component, computed, inject, signal } from '@angular/core';
import { Shell } from '../shell/shell';
import { RouterLink, RouterOutlet } from '@angular/router';
import {
  ISidebarButtonData,
  SidebarButton,
} from '../sidebar-button/sidebar-button';
import { NavbarService } from '../../services/navbar.service';
import { Heart, House, Volleyball } from 'lucide-angular';

@Component({
  selector: 'app-main-layout',
  imports: [Shell, RouterOutlet, RouterLink, SidebarButton],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  private _navbarService = inject(NavbarService);

  showSearch = this._navbarService.showSearch;
  showCreateButton = this._navbarService.showCreateButton;

  showUserDropdown = signal<boolean>(false);
  sidebarButtons = signal<ISidebarButtonData[]>([
    {
      label: 'Browse',
      navigateTo: ['/'],
      icon: Volleyball,
    },
    {
      label: 'My Projects',
      navigateTo: ['/my-projects'],
      icon: House,
    },
    {
      label: 'Liked',
      navigateTo: ['/my-likes'],
      icon: Heart,
    },
  ]);

  handleUserProfileClick() {
    this.toggleUserDropdown();
  }

  setUserDropdown(show: boolean) {
    this.showUserDropdown.set(show);
  }

  toggleUserDropdown() {
    this.showUserDropdown.update((oldValue) => !oldValue);
  }
}

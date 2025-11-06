import { Component, inject, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideIconData, LucideAngularModule } from 'lucide-angular';
import { NavbarService } from '../../services/navbar.service';

export interface ISidebarButtonData {
  label: string;
  navigateTo: string[];
  icon: LucideIconData;
}

@Component({
  selector: 'app-sidebar-button',
  imports: [RouterLink, LucideAngularModule, RouterLinkActive],
  templateUrl: './sidebar-button.html',
  styleUrl: './sidebar-button.css',
})
export class SidebarButton {
  private _navbarService = inject(NavbarService);

  data = input.required<ISidebarButtonData>();

  showText = this._navbarService.showSidebarText;
  isActive = signal(false);

  onActiveChange(active: boolean) {
    this.isActive.set(active);
  }
}

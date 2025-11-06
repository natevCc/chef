import {
  Component,
  effect,
  HostListener,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import {
  ChevronLeft,
  ChevronRight,
  LucideAngularModule,
  Menu,
} from 'lucide-angular';

@Component({
  selector: 'app-shell',
  imports: [LucideAngularModule],
  templateUrl: './shell.html',
  styleUrl: './shell.css',
})
export class Shell implements OnInit {
  private _navbarService = inject(NavbarService);

  // When true on desktop, the sidebar collapses to a narrow rail
  collapsed = signal(false);

  // For small screens, sidebar becomes a drawer
  mobileMenuOpen = signal(false);

  // Tracks if viewport is currently mobile (< md)
  isMobile = signal(false);

  protected leftIcon = ChevronLeft;
  protected rightIcon = ChevronRight;
  protected menuIcon = Menu;

  constructor() {
    effect(() => {
      if (this.isMobile()) {
        return;
      }
      this._navbarService.showSidebarText.set(this.collapsed());
    });
  }

  ngOnInit(): void {
    this._navbarService.showSidebarText.set(this.collapsed());

    if (typeof window !== 'undefined') {
      this.updateIsMobile(window.innerWidth);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(e: UIEvent) {
    const w = (e.target as Window).innerWidth;
    this.updateIsMobile(w);
  }

  private updateIsMobile(width: number) {
    const mobile = width < 768; // Tailwind `md` breakpoint
    const wasMobile = this.isMobile();
    this.isMobile.set(mobile);

    // If switching to desktop, ensure drawer is closed
    if (!mobile && wasMobile) {
      this.mobileMenuOpen.set(false);
    }
  }

  toggleSidebar() {
    if (this.isMobile()) {
      this.mobileMenuOpen.set(!this.mobileMenuOpen());
    } else {
      this.collapsed.set(!this.collapsed());
    }
  }

  closeMobile() {
    if (this.isMobile()) this.mobileMenuOpen.set(false);
  }
}

import {
  Directive,
  ElementRef,
  HostListener,
  input,
  output,
} from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective {
  public clickOutside = output<void>();
  public isActive = input<boolean | undefined>(true);

  constructor(private _elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  onMouseClick(targetElement: any) {
    if (!this.isActive()) {
      return;
    }

    const clickedInside =
      this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}

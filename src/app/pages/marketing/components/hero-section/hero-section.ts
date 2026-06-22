import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'hero-section',
  imports: [ RouterLink ],
  templateUrl: './hero-section.html',
})
export default class HeroSection {
  scrollToPrices() {
    const prices = document.getElementById( 'precios' );

    if ( prices ) {
      prices.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    };
  };
};

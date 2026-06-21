import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TopBar } from "../components/top-bar/top-bar";

@Component({
  selector: 'landing',
  imports: [ RouterLink, TopBar ],
  templateUrl: './landing.html',
})
export default class Landing {

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

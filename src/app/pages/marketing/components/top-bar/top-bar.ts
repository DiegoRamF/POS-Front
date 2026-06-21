import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'top-bar',
  imports: [ RouterLink ],
  templateUrl: './top-bar.html',
})
export class TopBar {}

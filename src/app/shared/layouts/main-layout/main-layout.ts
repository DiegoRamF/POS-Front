import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'

@Component({
  selector: 'main-layout',
  imports: [ RouterOutlet ],
  templateUrl: './main-layout.html',
})
export default class MainLayout {}

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TopBar } from "../components/top-bar/top-bar";
import HeroSection from '../components/hero-section/hero-section';
import FeaturesSection from "../components/features-section/features-section";
import PricingSection from "../components/pricing-section/pricing-section";

@Component({
  selector: 'landing',
  imports: [RouterLink, TopBar, HeroSection, FeaturesSection, PricingSection],
  templateUrl: './landing.html',
})
export default class Landing {};

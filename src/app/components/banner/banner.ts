import { Component, signal, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BannerComponent implements OnInit, OnDestroy {
  banners = [
    {
      title: 'Modern Elegance',
      subtitle: 'Ergonomic Chair',
      description: 'Experience unparalleled comfort with our premium ergonomic design.',
      img: '/chair.png',
      ctaText: 'Shop Chairs',
      features: ['Ergonomic Design', 'Premium Materials', '24h Comfort'],
    },
    {
      title: 'Artistic Touch',
      subtitle: 'Ceramic Vase Collection',
      description: 'Transform your space with handcrafted ceramic vases, each unique.',
      img: '/vase.jpg',
      ctaText: 'Explore Vases',
      features: ['Handcrafted', 'Unique Designs', 'Premium Ceramic'],
    },
    {
      title: 'Timeless Precision',
      subtitle: 'Minimalist Clock',
      description: 'Minimalism meets precision. Perfect for any interior.',
      img: '/clock.jpg',
      ctaText: 'Discover Clocks',
      features: ['Quiet Movement', 'Sleek Design', 'Battery Included'],
    },
  ];

  activeBanner = signal(0);
  private intervalId!: number;

  ngOnInit(): void {
    this.intervalId = window.setInterval(() => {
      this.nextBanner();
    }, 3500);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  selectBanner(index: number) {
    this.activeBanner.set(index);
  }

  nextBanner() {
    const next = (this.activeBanner() + 1) % this.banners.length;
    this.activeBanner.set(next);
  }
}

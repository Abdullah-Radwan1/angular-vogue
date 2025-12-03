import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-banner',
  imports: [],
  templateUrl: './banner.html',
  styleUrl: './banner.scss',
})
export class Banner {
  // 🔥 STEP 1 — Banners Data
  banners = [
    {
      title: 'Modern Elegance',
      subtitle: 'Ergonomic Chair',
      description:
        'Experience unparalleled comfort with our premium ergonomic design, crafted for those who value both style and substance in their workspace.',
      img: '/chair.png',
      ctaText: 'Shop Chairs',
      features: ['Ergonomic Design', 'Premium Materials', '24h Comfort'],
    },
    {
      title: 'Artistic Touch',
      subtitle: 'Ceramic Vase Collection',
      description:
        'Transform your space with our handcrafted ceramic vases, each piece telling a unique story of artistry and timeless beauty.',
      img: '/vase.jpg',
      ctaText: 'Explore Vases',
      features: ['Handcrafted', 'Unique Designs', 'Premium Ceramic'],
    },
    {
      title: 'Timeless Precision',
      subtitle: 'Minimalist Clock',
      description:
        'Where modern minimalism meets precision engineering. A statement piece that complements any interior while keeping perfect time.',
      img: '/clock.jpg',
      ctaText: 'Discover Clocks',
      features: ['Quiet Movement', 'Sleek Design', 'Battery Included'],
    },
  ];

  // 🔥 STEP 2 — Active banner index as Signal
  activeBanner = signal(0);
  // 🔹 STEP 3 — Function to switch banner manually
  selectBanner(index: number) {
    this.activeBanner.set(index);
  }
  // 🔹 STEP 4 — Interval ID for automatic sliding
  private intervalId!: any;

  ngOnInit(): void {
    // 🔹 Auto-slide every 3 seconds
    this.intervalId = setInterval(() => {
      this.nextBanner();
    }, 3000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId); // stop auto-sliding when component is destroyed
  }

  // 🔹 Move to next banner
  nextBanner() {
    const next = (this.activeBanner() + 1) % this.banners.length;
    this.activeBanner.set(next);
  }
}

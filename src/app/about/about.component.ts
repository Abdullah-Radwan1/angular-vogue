// about.component.ts
import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Briefcase, Rocket, Layers } from 'lucide-angular';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  IconBriefcase = Briefcase;
  Rocket = Rocket;
  Layers = Layers;
}

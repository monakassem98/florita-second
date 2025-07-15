import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Discount } from '../../components/discount/discount';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-faq',
  imports: [MatExpansionModule, Discount],
  templateUrl: './faq.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './faq.css',
})
export class Faq {
  readonly panelOpenState = signal(false);
}

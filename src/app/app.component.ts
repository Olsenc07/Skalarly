import { Component } from '@angular/core'
import { NgClass } from '@angular/common'
import { RouterModule, TitleStrategy } from '@angular/router'
import { CustomTitleStrategy } from './assistant-level-code/custom-architecture-aids/services/router-strategies/title-strategy.service'
import { OrientationService } from './assistant-level-code/custom-architecture-aids/services/orientation.service'
import { NavBarComponent } from './nav-bar/nav-bar.component'
import { NavIconsComponent } from './nav-bar/nav-icons/nav-icons.component'
import { MatToolbarModule } from '@angular/material/toolbar'
import { scrollToggleDirective } from './assistant-level-code/custom-architecture-aids/directives/scroll-toggle.directive'
import { animate, state, style, transition, trigger } from '@angular/animations'

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    MatToolbarModule,
    NavBarComponent,
    NgClass,
    NavIconsComponent,
    RouterModule,
    scrollToggleDirective
  ],
  animations: [
    trigger('fadeMargin', [
      state(
        'withMargin',
        style({
          marginTop: '3.3rem'
        })
      ),
      state(
        'withoutMargin',
        style({
          marginTop: '0rem'
        })
      ),
      transition('withMargin <=> withoutMargin', animate('300ms ease-in-out'))
    ])
  ],
  providers: [{ provide: TitleStrategy, useClass: CustomTitleStrategy }]
})
export class AppComponent {
  marginState: 'withMargin' | 'withoutMargin' = 'withMargin'
  lines: Array<{
    top: string
    left: string
    data: string
    uniqueClass?: string
  }> = [
    // { top: '60%', left: '60%', data: '|Ψ⟩ = 1/√2 (|01⟩ + |10⟩)' },
    // { top: '1%', left: '30%', data: 'a² + b² = c²' },
    // { top: '65%', left: '47%', data: 'F = ma' },
    // { top: '45%', left: '5%', data: 'Life attracts life' },
    { top: '1%', left: '30%', data: 'i² = -1' },
    // { top: '30%', left: '30%', data: 'Λ = 8πGρ_{vac} / c²' },
    // { top: '60%', left: '30%', data: 'PV = nRT' },
    // { top: '50%', left: '60%', data: 'E = mc²' },
    // { top: '20%', left: '35%', data: 'E_total = K + U' },
    // { top: '50%', left: '60%', data: 'To be or not to be' },
    { top: '20%', left: '45%', data: 'Take up and read' },
    { top: '45%', left: '75%', data: 'ΔS ≥ 0' },
    // { top: '10%', left: '50%', data: 'd = vt + ½at²' },
    // { top: '15%', left: '40%', data: 'G = 6.674×10⁻¹¹ N m²/kg²' },-
    { top: '10%', left: '15%', data: 'e^{iπ} + 1 = 0' },
    // { top: '10%', left: '65%', data: 'φ = (1 + √5) / 2' },
    {
      top: '1%', left: '50%', data: 'Narrow the road that leads to life.'
    },
    { top: '25%', left: '50%', data: 'Memento Mori' }
  ]

  constructor(protected orientationService: OrientationService) {}
  onToggleHeader(show: boolean): void {
    this.marginState = show ? 'withMargin' : 'withoutMargin'
  }
}

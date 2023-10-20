import {html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {BitcoinConnectElement} from './BitcoinConnectElement';
import {withTwind} from './twind/withTwind';
import store from '../state/store';
import {backIcon} from './icons/backIcon';
import {Route} from './routes';
import {classes} from './css/classes';

@customElement('bc-navbar')
export class Navbar extends withTwind()(BitcoinConnectElement) {
  @property()
  heading?: string;
  @property()
  to: Route = '/start';

  override render() {
    return html`<div
      class="flex justify-center items-center gap-2 w-full relative pb-4"
    >
      <div class="absolute left-0 h-full flex items-center justify-center">
        <div
          class="${classes.interactive} ${classes['text-neutral-secondary']}"
          @click=${() => store.getState().setRoute(this.to)}
        >
          ${backIcon}
        </div>
      </div>
      <div class="font-sans font-medium ${classes['text-neutral-secondary']}">
        ${this.heading}
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-navbar': Navbar;
  }
}

import {customElement, state} from 'lit/decorators.js';
import {BitcoinConnectElement} from '../BitcoinConnectElement';
import {withTwind} from '../twind/withTwind';
import {html} from 'lit';
import '../internal/bci-button';
import {classes} from '../css/classes';
import store from '../../state/store';
import {mutinyNWCConnectorTitle} from '../connectors';

@customElement('bc-mutiny')
export class MutinyPage extends withTwind()(BitcoinConnectElement) {
  @state()
  private _nwcUrl = '';

  override render() {
    return html`<div class="w-full">
      <bc-navbar class="flex w-full" heading="Mutiny"></bc-navbar>
      <div class="font-sans text-sm w-full">
        <div class="px-8 pt-4 w-full">
          <div class="mb-2 ${classes['text-neutral-secondary']}">
            1. Add a new
            <a
              href="https://app.mutinywallet.com/settings/connections"
              target="_blank"
              class="font-bold"
              >Wallet Connection
            </a>
            from
            <span class="${classes['text-neutral-tertiary']}"
              >Settings => Wallet Connections</span
            >
            and copy the connection string.
          </div>
          <div class="mb-1 ${classes['text-neutral-secondary']}">
            2. Paste the connection string below:
          </div>

          <input
            value=${this._nwcUrl}
            @change=${this.nwcUrlChanged}
            placeholder="nostr+walletconnect://..."
            type="password"
            class="w-full mb-8 rounded-lg p-2 border-1 ${classes[
              'border-neutral-secondary'
            ]}"
          />
          <bci-button @click=${this.onConnect}>
            <span class="${classes['text-brand-mixed']}">Connect</span>
          </bci-button>
        </div>
      </div>
    </div>`;
  }

  private nwcUrlChanged(event: {target: HTMLInputElement}) {
    this._nwcUrl = event.target.value;
  }
  private async onConnect() {
    if (!this._nwcUrl) {
      // TODO: show an error message directly on this page
      alert('Please enter a URL');
      return;
    }

    // FIXME: do not change route - extract skeleton loader and add loading state in this component
    // and make connect throw an error on failure
    store.getState().setRoute('/start');
    await store.getState().connect({
      nwcUrl: this._nwcUrl,
      connectorName: mutinyNWCConnectorTitle,
      connectorType: 'nwc.mutiny',
    });
    if (!store.getState().connected) {
      store.getState().setRoute('/mutiny');
      // TODO: show an error message directly on this page
      alert('Failed to connect. Please check your NWC URL');
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-mutiny': MutinyPage;
  }
}
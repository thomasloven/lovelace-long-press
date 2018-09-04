class LongPress extends Polymer.Element {

  ready() {
    super.ready();
    document.addEventListener('click', (e) => this._reset());
    document.addEventListener('mousedown', (e) => this.mouseDown(e, false));
    document.addEventListener('touchstart', (e) => this.mouseDown(e, true));
    document.addEventListener('mouseup', (e) => this.mouseUp(e, false));
    document.addEventListener('touchend', (e) => this.mouseUp(e, true));
  }

  setConfig(config) {
    this._config = config;

    let tag = config.child.type;
    if(tag.startsWith("custom:"))
      tag = tag.substr(7);
    else
      tag = `hui-${tag}-element`;


    this.entity = config.child.entity;

    this.enabled = true;
    this.timer = null;

    this.child = document.createElement(tag);
    this.child.setConfig(config.child);
    this.appendChild(this.child);
  }

  set hass(hass) {
    this.child.hass = hass;
    this.enabled = true;
    if(hass.moreInfoEntityId) {
      this.enabled = false;
      this._reset();
    }
  }

  _reset() {
    if(this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if(document.querySelector('home-assistant').$$('ha-more-info-dialog'))
      document.querySelector('home-assistant').$$('ha-more-info-dialog').removeAttribute('modal');
  }

  mouseDown(ev, touch) {
    if (!this.enabled) return;
    if(!touch && ev.button != 0) return;
    let rect = this.getBoundingClientRect();
    let cx = (touch)? ev.touches[0].clientX : ev.clientX;
    let cy = (touch)? ev.touches[0].clientY : ev.clientY;
    if( cx < rect.left || cx > rect.right || cy < rect.top || cy > rect.bottom)
      return;

    this._reset();

    this.timer = setTimeout((e) => this.onHold(), 300);
  }

  mouseUp(e, touch) {
    if (!this.enabled) return;
    this._reset();
  }

  onHold() {
    // Only open more-info dialog for now
    let ev = new Event('hass-more-info', {
      bubbles: true,
      cancelable: false,
      composed: true,
    });
    const entityId = this.entity;
    ev.detail = { entityId };
    this.dispatchEvent(ev);
    document.querySelector('home-assistant').$$('ha-more-info-dialog').setAttribute('modal', true);
  }
}

customElements.define('long-press', LongPress)

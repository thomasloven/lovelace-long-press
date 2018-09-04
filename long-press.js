class LongPress extends Polymer.Element {

  ready() {
    super.ready();
    document.addEventListener('mousedown', (e) => this.mouseDown(e));
    document.addEventListener('touchstart', (e) => this.mouseDown(e));
    document.addEventListener('mouseup', (e) => this.mouseUp(e));
    document.addEventListener('touchend', (e) => this.mouseUp(e));
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
  }

  mouseDown(ev) {
    if (!this.enabled) return;
    let rect = this.getBoundingClientRect();
    let cx = (ev.touches)? ev.touches[0].clientX : ev.clientX;
    let cy = (ev.touches)? ev.touches[0].clientY : ev.clientY;
    if( cx < rect.left || cx > rect.right || cy < rect.top || cy > rect.bottom)
      return;

    this.timer = setTimeout((e) => this.onHold(), 300);
  }

  mouseUp(e) {
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
  }
}

customElements.define('long-press', LongPress)

class LongPress extends Polymer.Element {

  ready() {
    super.ready();
    document.addEventListener('click', (e) => this.click(e), true);
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

    this.child = document.createElement(tag);
    this.child.setConfig(config.child);
    this.appendChild(this.child);

    this.timer = null;
    this.held = false;
  }

  set hass(hass) {
    this.child.hass = hass;
  }

  click(e) {
    let rect = this.getBoundingClientRect();
    let ev = e;
    if(e.touches)
      e = e.touches[0];
    if( e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom)
      return;
    if(this.held) {
      ev.stopPropagation();
    }
    this.held = false;
  }

  mouseDown(e) {
    let rect = this.getBoundingClientRect();
    let ev = e;
    if(e.touches)
      e = e.touches[0];
    if( e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom)
      return;

    ev.stopPropagation();
    this.held = false;
    this.timer = setTimeout((e) => this.onHold(), 300, e);
  }

  mouseUp(e) {
    if(this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  onHold() {
    this.held = true;

    // Only open more-info dialog for now
    const entityId = this._config.child.entity;
    let ev = new Event('hass-more-info', {
      bubbles: true,
      cancelable: false,
      composed: true,
    });
    ev.detail = { entityId };
    this.dispatchEvent(ev);
  }
}

customElements.define('long-press', LongPress)

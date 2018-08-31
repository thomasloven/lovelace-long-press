# long-press

Long press on a picture-elements element to open the more-info dialog.

I haven't tested, but it should work with

- state-badge
- state-icon
- state-label
- icon
- image

And probably most custom elements that have an `entity` property.

```yaml
  - type: picture-elements
    image: ...
    elements:
    - type: custom-long-press
      child:
        type: state-icon
        entity: light.my_lamp
        tap_action: toggle
      style:
        left: 50%
        top: 50%
```

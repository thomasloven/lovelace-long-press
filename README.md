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
    - type: custom:long-press
      child:
        type: state-icon
        entity: light.my_lamp
        tap_action: toggle
      style:
        left: 50%
        top: 50%
```

## Note for touch devices

On touch devices it can happen that the more-info dialog pops up, and then
closes as soon as you lift your finger.

I'm trying to figure that one out, and the best workaround I found is to just
drag your finger over the screen a tiny bit before lifting it...

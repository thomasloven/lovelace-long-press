# long-press

Long press on a picture-elements element to open the more-info dialog.

`long-press` wraps any element in a `picture-elements` card and allows one
action to be taken for a short click or tap, and another for a longer
click/hold (longer than 300 ms).

Possible secondary actions are

- show the More Info dialog for the entity of the wrapped element
- show the More Info dialog for a given entity
- Navigate to URL path
- Call service

## Options

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| child | object | **Required** | The wrapped element
| style | object | **Required** | Position and style of the element
| ---- | ---- | ------- | -----------
| entity | string | none | Select entity for More Info dialog
| navigation\_path | string | none | URL path to navigate to
| service | string | none | Service to call
| service\_data | object |   | The service data to use


Which action is taken depends on whether the options `entity`,
`navigation_path` and `service` are defined.

## Example configuration

```yaml
# A normal click on any state-icon below will toggle light.my_lamp
  - type: picture-elements
    image: ...
    elements:
# This will show the More Info dialog for light.my_lamp on long press
    - type: custom:long-press
      child:
        type: state-icon
        entity: light.my_lamp
        tap_action: toggle
      style:
        left: 0%
        top: 50%
# This will show the More Info dialog for light.another_lamp on long press
    - type: custom:long-press
      entity: light.another_lamp
      child:
        type: state-icon
        entity: light.my_lamp
        tap_action: toggle
      style:
        left: 25%
        top: 50%
# This will navigate to /lovelace/lights on long press
    - type: custom:long-press
      navigation_path: /lovelace/lights
      child:
        type: state-icon
        entity: light.my_lamp
        tap_action: toggle
      style:
        left: 50%
        top: 50%
# This will write an error to the hass log on long press
    - type: custom:long-press
      service: system_log.write
      service_data:
        message: "A long press happened"
      child:
        type: state-icon
        entity: light.my_lamp
        tap_action: toggle
      style:
        left: 75%
        top: 50%
```

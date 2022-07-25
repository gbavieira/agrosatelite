import { dashedInteractionStyle, formatArea } from '@common/geolib'
import { circular as circularPolygon } from 'node_modules/ol/geom/Polygon.js'
import GeometryType from 'ol/geom'
import Geometry from 'ol/geom/Geometry'
import Polygon from 'ol/geom/Polygon'
import Draw from 'ol/interaction/Draw'
import VectorLayer from 'ol/layer/Vector'
import Map from 'ol/Map'
import Overlay from 'ol/Overlay'
import VectorSource from 'ol/source/Vector'
import { MapAddon } from './addon'

export class DrawAddon extends MapAddon {
  source: VectorSource
  layer: VectorLayer
  interaction: ol.interaction.Interaction
  event: any
  overlay: Overlay

  style_default = dashedInteractionStyle({})

  $tooltip = (() => {
    const $el = document.createElement('div')
    $el.className = 'map-tooltip'
    $el.style.display = 'block'
    $el.innerHTML = ''
    return $el
  })()

  constructor(
    private input: {
      identifier: string
      drawType: GeometryType
      callback: (geometry: Geometry) => any
      styleFunction?: ol.StyleFunction
      geometries?: any[]
    }
  ) {
    super(input.identifier)
    this.source = new VectorSource()
    this.layer = new VectorLayer({
      source: this.source,
      style: input.styleFunction,
    })
    this.interaction = new Draw({
      source: this.source,
      type: this.input.drawType,
      style: this.style_default,
    })
    this.overlay = new Overlay({
      element: this.$tooltip,
      offset: [15, 0],
      positioning: 'center-left',
    })
  }
  map: Map | undefined
  afterMount(map: Map) {
    this.map = map
    this.event = (evt: any) => {
      const sketch = evt.feature
      const geom = sketch.getGeometry()

      if (geom.getType() === 'Circle') {
        const radius = geom.getRadius()
        geom.transform('EPSG:3857', 'EPSG:4326')
        const center = geom.getCenter()
        const circle = circularPolygon(center, radius)
        this.input.callback(circle)
      } else {
        geom.transform('EPSG:3857', 'EPSG:4326')
        this.input.callback(geom)
      }
    }
    this.interaction.on('drawend', this.event)

    this.interaction.on('drawstart', (evt: any) => {
      const sketch = evt.feature
      sketch.getGeometry().on('change', (evt) => {
        const geom = evt.target
        if (geom instanceof Polygon) {
          const polygon = geom
          const area = polygon.getArea()
          this.$tooltip.innerHTML = formatArea(area)
          sketch.setStyle(this.style_default)
        }
      })
    })
  }

  getInteractions() {
    return [this.interaction]
  }

  getLayers() {
    return [this.layer]
  }

  getOverlays() {
    return [this.overlay]
  }
}

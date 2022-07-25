import { ExternalPromise } from '@common/external-promise'
import Layer from 'ol/layer'
import Map from 'ol/Map'
import Overlay from 'ol/Overlay'

export class MapAddon {
  constructor(public identifier: string) {}
  async asyncInit() {}
  _hasInit = Promise.resolve()
  _hasMounted = new ExternalPromise()

  getLayers(): (Layer & { _order?: number })[] {
    return []
  }
  getControls(): ol.control.Control[] {
    return []
  }
  getInteractions(): ol.interaction.Interaction[] {
    return []
  }
  getOverlays(): Overlay[] {
    return []
  }
  afterMount(map: Map) {}
  afterUnmount(map: Map) {}

  layerZIndex = 50
  setLayerZIndex(o: number) {
    this.layerZIndex = o
    this.getLayers().forEach((layer) => {
      layer && layer.setZIndex(this.layerZIndex)
    })
    return this
  }

  mount(map: Map) {
    if (!map) return
    this._mapref = map
    this.getLayers().forEach((layer) => {
      layer.setZIndex(this.layerZIndex)
      map.addLayer(layer)
    })
    this.getControls().forEach((control) => {
      map.addControl(control)
    })
    this.getInteractions().forEach((interaction) => {
      map.addInteraction(interaction)
    })
    this.getOverlays().forEach((overlay) => {
      map.addOverlay(overlay)
    })
    this.afterMount(map)
    this._hasMounted.resolve()
  }

  async unmount(map: Map) {
    if (!map) return
    await this._hasInit
    this.getLayers().forEach((layer) => {
      map.removeLayer(layer)
    })
    this.getControls().forEach((control) => {
      map.removeControl(control)
    })
    this.getInteractions().forEach((interaction) => {
      map.removeInteraction(interaction)
    })
    this.getOverlays().forEach((overlay) => {
      map.removeOverlay(overlay)
    })
    this.afterUnmount(map)
    this._hasMounted = new ExternalPromise()
  }

  private _mapref!: Map
  _remounting = false
  waitRemout = Promise.resolve()
  async remount(action = () => Promise.resolve()) {
    if (this._remounting) return
    this._remounting = true
    await this._hasInit
    await this.unmount(this._mapref)
    await action()
    this.mount(this._mapref)
    this._remounting = false
  }

  getExtent?: () => ol.Extent
}

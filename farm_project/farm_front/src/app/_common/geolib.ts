import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Circle from 'ol/style/Circle';
import Stroke from 'ol/style/Stroke';
import * as Proj from 'ol/proj.js';

// Model:
export enum Projection {
Meters = 'Meters',
LatLon = 'LatLon',
Area = 'Area',
}

export interface GeoJsonFeature {
  type: 'Feature'
  id?: string
  properties?: { name: string; [key: string]: any }
  geometry: { type: 'Polygon'; coordinates: [[[number, number][]]] }
}
export interface GeoJsonFeatureCollection {
  type: 'FeatureCollection'
  features: GeoJsonFeature[]
}
export type GeoJsonSchema = GeoJsonFeature | GeoJsonFeatureCollection

// Auxiliar functions:
export function convertProjection(to: Projection, coords: number[]) {
    if (to === Projection.Meters) {
        return Proj.fromLonLat(coords as any)
    } else {
        return Proj.toLonLat(coords as any)
    }
}

export function formatArea(area) {
    const [integer, dec] = (area / 100 / 100).toFixed(2).split('.')
    return separador(integer) + ',' + dec + 'ha'
}

export function separador(str: string) {
    let out = ''
    let count = 0
    for (let x = str.length - 1; x >= 0; x--) {
        count++
        const element = str[x]
        out = element + out
        if (count % 3 === 0 && x) out = '.' + out
    }
    return out
}


// Styles:
export const pointClickStyle = (_i: { hover: boolean; strokeColor: string }) =>
new Style({
  stroke: new Stroke({
    color: _i.hover ? '#105672' : _i.strokeColor,
    width: 4,
  }),
  fill: new Fill({ color: _i.hover ? 'rgba(255, 255, 255, 0.45)' : toRgba(_i.strokeColor, 0.2) }),
})

export function toRgba(str: string, alpha: number) {
  const nrs = [1, 3, 5].map((n) => parseInt(str.substr(n, 2), 16))
  return `rgba(${nrs[0]}, ${nrs[1]}, ${nrs[2]}, ${alpha})`
}

export const dashedInteractionStyle = (_with: { fillColor?: string; strokeColor?: string } = {}) =>
  new Style({
    fill: new Fill({
      color: _with.fillColor || 'rgba(255, 255, 255, 0.2)',
    }),
    stroke: new Stroke({
      color: _with.strokeColor || 'rgba(0, 0, 0)',
      width: 2,
      lineDash: [10, 10],
    }),
    image: new Circle({
      radius: 5,
      stroke: new Stroke({
        color: 'rgba(0, 0, 0, 0.7)',
      }),
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.2)',
      }),
    }),
  })
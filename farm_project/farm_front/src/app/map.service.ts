import { Injectable } from '@angular/core';
import { BasemapComponent } from './basemap/basemap.component';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  map!: BasemapComponent
}

import { Injectable } from '@angular/core'
import { Farm } from './../models/Farm'

@Injectable({
  providedIn: 'root',
})
export class FarmService {
  constructor() {}

  create(farm: Farm) {}

  read(id: number): Farm {
    return {} as any
  }

  list(): Farm[] {
    return []
  }
}

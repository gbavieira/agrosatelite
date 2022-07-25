import { Owner } from './Owner'
export interface Farm {
  name: string
  geomtry: any
  area: number
  centroid: number[]
  creation_date?: Date
  owner: Owner
}

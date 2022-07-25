export interface Owner {
  name: string
  document: string
  document_type: 'CPF' | 'CNPJ'
  creation_date?: Date
}

export class ExternalPromise<T = void> {
  promise: Promise<T>

  isResolved = false

  constructor() {
    this.promise = new Promise<any>((resolve, reject) => {
      this.resolve = x => {
        resolve(x)
        this.isResolved = true
      }
      this.reject = reject as any
    })
  }

  resolve!: (x?: T) => void
  reject!: () => void
}

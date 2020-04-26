export class ResponseApi<T> {
  constructor(public status: boolean = true, public data?: T, public message?: string) {
  }
}

export class RemoteHost {
  constructor(public id: string,
              public name: string,
              public url: string,
              public username: string,
              public token: string,
              public created_at: Date,
              public modified_at: Date) {}
}

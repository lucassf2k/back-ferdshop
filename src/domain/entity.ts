export class Entity<T> {
  readonly _id: string;
  readonly props: T;

  constructor(id: string, props: T) {
    this._id = id;
    this.props = props;
  }
}

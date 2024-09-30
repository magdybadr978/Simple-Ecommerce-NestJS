import {
  Document,
  FilterQuery,
  Model,
  ProjectionType,
  QueryOptions,
} from 'mongoose';

export abstract class AbstractRepository<T> {
  private repo: Model<T & Document>;

  constructor(private nModel: Model<T & Document>) {
    this.repo = nModel;
  }

  get model() {
    return this.repo;
  }

  public create(item: T): Promise<T> {
    const newDocument = new this.nModel(item);
    return newDocument.save();
  }

  public async getAll(
    query: FilterQuery<T>,
    params?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ) {
    return this.nModel.find(query, params, options);
  }

  public getOne(
    query: FilterQuery<T>,
    params?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ) {
    return this.repo.findOne(query, params, options).lean().exec();
  }

  public update(query: FilterQuery<T>, item: any, params: QueryOptions) {
    return this.repo.findOneAndUpdate(query, item, params).lean();
  }

  public async delete(query: FilterQuery<T>) {
    return this.repo.deleteOne(query).lean();
  }
}

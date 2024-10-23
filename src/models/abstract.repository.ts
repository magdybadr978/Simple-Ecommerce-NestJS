import { isArray, isEmpty, isNil } from 'lodash';
import {
  Document,
  FilterQuery,
  Model,
  ProjectionType,
  QueryOptions,
  Types,
} from 'mongoose';
import { GetAll } from 'src/common/type';

export abstract class AbstractRepository<T> {
  private repo: Model<T & Document>;

  constructor(private nModel: Model<T & Document>) {
    this.repo = nModel;
  }

  get model() {
    return this.repo;
  }

  public create(item: T){
    const newDocument = new this.nModel(item);
    return newDocument.save();
  }

  // public async getAll(
  //   query: FilterQuery<T>,
  //   params?: ProjectionType<T>,
  //   options?: QueryOptions<T>,
  // ) {
  //   return this.nModel.find(query, params, options).lean().exec();
  // }

  private _buildQuery(func, params) {
    if (isNil(params)) return func;

    const { fields, lean, populate } = params;

    if (!isNil(fields)) func.select(fields);
    if (!isNil(lean)) func.lean();

    if (populate) {
      for (let i = 0; i < populate.length; i += 1) {
        if (isArray(populate[i])) {
          func.populate(...populate[i]); 
        } else {
          func.populate(populate[i]);
        }
      }
    }

    return func;
  }

  public async getAll(
    query: any,
    params: GetAll = { limit: 25, page: 1, paginate: true },
  ) {
    const {
      limit = 25,
      page = 1,
      paginate = true,
      sort,
      order,
      search,
    } = params || {};
    const skip = (page - 1) * limit;
    let nResult = this._buildQuery(this.repo.find(query || {}), params);

    if (search) {
      nResult = nResult.where({
        $or: [
          { name: { $regex: new RegExp(search, 'i') } },
          { 'translation.name': { $regex: new RegExp(search, 'i') } },
          { title: { $regex: new RegExp(search, 'i') } },
          { 'translation.title': { $regex: new RegExp(search, 'i') } },
        ],
      });
    }

    if (paginate) {
      nResult.skip(skip);
      nResult.limit(limit);
    }

    if (sort) {
      nResult.sort({ [sort]: order });
    }

    let result = await nResult.exec();

    if (paginate) {
      const count = isEmpty(query)
        ? await this.model.collection.countDocuments({})
        : await this.model.countDocuments(query);

      const pages = Math.ceil(count / limit) || 1;
      result = {
        data: result,
        currentPage: skip === 0 ? 1 : Math.ceil(skip / limit) + 1,
        numberOfPages: pages,
        numberOfRecords: count,
      };
    }

    return result;
  }

  public getOne(
    query: FilterQuery<T>,
    params?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ) {
    return this.repo.findOne(query, params, options).lean().exec()
  }

  public getById(id : string | Types.ObjectId ,params? :ProjectionType<T> , options? : QueryOptions<T>){
    return this.repo.findById(id , params , options).lean().exec()
  }

  public update(query: FilterQuery<T>, item: any, params: QueryOptions) {
    return this.repo.findOneAndUpdate(query, item, params).lean();
  }

  public async delete(query: FilterQuery<T>) {
    return this.repo.deleteOne(query).lean();
  }
}

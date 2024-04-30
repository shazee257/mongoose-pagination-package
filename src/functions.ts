import mongoosePaginate from 'mongoose-paginate-v2';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import mongoose from 'mongoose';
import { PaginatedData, MongoosePaginateModel } from './types';

export const getPaginatedData = async <T extends mongoose.Document>(
    options: {
        model: MongoosePaginateModel<T>;
        page?: number;
        limit?: number;
        query?: any;
        populate?: string | object;
        select?: string | object;
        sort?: string | object;
    }
): Promise<PaginatedData<T>> => {
    const {
        model,
        page = 1,
        limit = 10,
        query = {},
        populate = '',
        select = '-password',
        sort = { createdAt: -1 }
    } = options;

    const mongooseOptions: any = {
        select,
        sort,
        populate,
        lean: true,
        page,
        limit,
        customLabels: {
            totalDocs: 'totalItems',
            docs: 'data',
            limit: 'perPage',
            page: 'currentPage',
            meta: 'pagination'
        }
    };

    const { data, pagination } = await model.paginate(query, mongooseOptions);
    delete (pagination as any)?.pagingCounter;

    return { data: data as T[], pagination: pagination as any };
};

export const getAggregatedPaginatedData = async <T extends mongoose.Document>(
    options: {
        model: any;
        page?: number;
        limit?: number;
        query?: any[];
    }
): Promise<PaginatedData<T>> => {
    const { model, page = 1, limit = 10, query = [] } = options;

    const pipelineOptions = {
        page,
        limit,
        customLabels: {
            totalDocs: 'totalItems',
            docs: 'data',
            limit: 'perPage',
            page: 'currentPage',
            meta: 'pagination'
        }
    };

    const myAggregate = model.aggregate(query);
    const { data, pagination } = await model.aggregatePaginate(myAggregate, pipelineOptions);

    delete (pagination as any)?.pagingCounter;

    return { data: data as T[], pagination: pagination as any };
}

export const mongoosePlugin = mongoosePaginate;
export const mongooseAggregatePlugin = aggregatePaginate;

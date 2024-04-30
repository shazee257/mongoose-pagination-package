import mongoose from 'mongoose';

export interface PaginatedData<T> {
    data: T[];
    pagination: PaginationInfo;
}

export interface PaginationInfo {
    totalItems: number;
    data: any[]; // You might want to specify the type of data being paginated
    perPage: number;
    currentPage: number;
    totalPages?: number;
}


export type MongoosePaginateModel<T extends mongoose.Document> = mongoose.PaginateModel<T>;
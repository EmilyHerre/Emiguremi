import { Request } from "express";


type objectFilter = {
    id: number,
}

export const getPagKey = (data: objectFilter[], order: OrderBy, Prevkey: number, lastKey: number) => {
    const lastPage = data.length > 0 && data[data.length - 1].id == lastKey ? true : false;
    const key = data.length > 0 ? data[data.length - 1].id : 0;
    return {
        lastPage,
        prev_key: Prevkey,
        next_key: key,
        lastKey,
        order,
    }
}

export enum OrderBy {
    desc = "desc",
    asc = "asc"
}

export const getFilters = (req: Request) => {

    const { order_by, size, key } = req.query;

    const order: OrderBy = OrderBy.desc == order_by ? OrderBy.desc : OrderBy.asc;

    const take = size && !isNaN(Number(size)) ? Number(size) : 10;

    const cursor = key && !isNaN(Number(key)) ? Number(key) : 0;

    return {
        order,
        take,
        cursor,
    }
}

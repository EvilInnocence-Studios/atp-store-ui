import { IMethods } from "@core/lib/types";
import { getResults } from "@core/lib/util";
import { IOrder, IOrderCreateRequest, IOrderFull, IOrderItem } from "@store-shared/order/types";
import { IProductFile } from "@store-shared/product/types";

export const orderServices = ({get, post}:IMethods) => ({
    order: {
        search: (userId:number):Promise<IOrder[]> => get(`user/${userId}/order`).then(getResults<IOrder[]>),
        get: (userId:number, orderId:number):Promise<IOrder> => get(`user/${userId}/order/${orderId}`).then(getResults),
        getFull: (userId:number, orderId:number):Promise<IOrderFull> => get(`user/${userId}/order/${orderId}/full`).then(getResults<IOrderFull>),
        item: {
            get: (userId:number, orderId:number):Promise<IOrderItem[]> => get(`user/${userId}/order/${orderId}/item`).then(getResults<IOrderItem[]>),
        },
        file: {
            get: (userId:number, orderId:number):Promise<IProductFile[]> => get(`user/${userId}/order/${orderId}/file`).then(getResults<IProductFile[]>),
        },
        create: (userId:number, order:Partial<IOrder>) => post(`user/${userId}/order`, order).then(getResults<IOrder>),
        start: (userId:number, order:IOrderCreateRequest) => post(`user/${userId}/order/start`, order).then(getResults<IOrder>),
        finalize: (userId:number, transactionId:number):Promise<IOrder> => post(`user/${userId}/order/finalize`, {transactionId}).then(getResults<IOrder>),
    },
});

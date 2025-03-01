import { IMethods } from "@core/lib/types";
import { getResults } from "@core/lib/util";
import { IOrder, IOrderCreateRequest, IOrderFull, IOrderItem } from "@store-shared/order/types";
import { IProductFile } from "@store-shared/product/types";

export const orderServices = ({get, post}:IMethods) => ({
    order: {
        search: (userId:string):Promise<IOrder[]> => get(`user/${userId}/order`).then(getResults<IOrder[]>),
        get: (userId:string, orderId:string):Promise<IOrder> => get(`user/${userId}/order/${orderId}`).then(getResults),
        getFull: (userId:string, orderId:string):Promise<IOrderFull> => get(`user/${userId}/order/${orderId}/full`).then(getResults<IOrderFull>),
        item: {
            get: (userId:string, orderId:string):Promise<IOrderItem[]> => get(`user/${userId}/order/${orderId}/item`).then(getResults<IOrderItem[]>),
        },
        file: {
            get: (userId:string, orderId:string):Promise<IProductFile[]> => get(`user/${userId}/order/${orderId}/file`).then(getResults<IProductFile[]>),
        },
        create: (userId:string, order:Partial<IOrder>) => post(`user/${userId}/order`, order).then(getResults<IOrder>),
        start: (userId:string, order:IOrderCreateRequest) => post(`user/${userId}/order/start`, order).then(getResults<IOrder>),
        finalize: (userId:string, transactionId:string):Promise<IOrder> => post(`user/${userId}/order/finalize`, {transactionId}).then(getResults<IOrder>),
        finalizeFreeOrder: (userId:string, productIds:string[]) => post(`user/${userId}/order/finalizeFree`, {productIds}).then(getResults<IOrder>),
    },
});

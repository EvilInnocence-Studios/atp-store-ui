import { IOrder, IOrderFull, IOrderItem, IProductFile } from "@store-shared/product/types";

export declare interface IOrderDetailsProps {
    order?: IOrderFull;
    isLoading: boolean;
}

// What gets passed into the component from the parent as attributes
export declare interface IOrderDetailsInputProps {
    userId: number;
    orderId: number;
}

export type OrderDetailsProps = IOrderDetailsInputProps & IOrderDetailsProps;
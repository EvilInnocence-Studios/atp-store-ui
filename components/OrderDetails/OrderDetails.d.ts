import { IOrderFull } from "@store-shared/order/types";

export declare interface IOrderDetailsProps {
    order?: IOrderFull;
    isLoading: boolean;
}

// What gets passed into the component from the parent as attributes
export declare interface IOrderDetailsInputProps {
    userId: string;
    orderId: string;
    classes?: any;
}

export type OrderDetailsProps = IOrderDetailsInputProps & IOrderDetailsProps;
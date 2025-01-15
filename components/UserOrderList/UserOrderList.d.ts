import { IOrder } from "@store-shared/product/types";
import { SafeUser } from "@uac-shared/user/types";

export declare interface IUserOrderListProps {
    user: SafeUser;
    orders: IOrder[];
    isLoading: boolean;
    selectedOrder?: IOrder;
    selectOrder: (order: IOrder) => () => void;
}

// What gets passed into the component from the parent as attributes
export declare interface IUserOrderListInputProps {
    userId?: number;
}

export type UserOrderListProps = IUserOrderListInputProps & IUserOrderListProps;
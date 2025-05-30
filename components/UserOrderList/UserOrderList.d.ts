import { IOrder } from "@store-shared/product/types";
import { SafeUser } from "@uac-shared/user/types";

export declare interface IUserOrderListProps {
    user: SafeUser;
    orders: IOrder[];
    isLoading: boolean;
    selectedOrder?: IOrder;
    selectOrder: (order: IOrder) => () => void;
    refresh: () => void;
}

// What gets passed into the component from the parent as attributes
export declare interface IUserOrderListInputProps {
    userId?: string;
    id?: string;
    onSelectOrder?: (order: IOrder) => () => void;
}

export type UserOrderListProps = IUserOrderListInputProps & IUserOrderListProps;
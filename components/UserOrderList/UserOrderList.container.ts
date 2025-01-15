import { services } from "@core/lib/api";
import { useLoaderAsync } from "@core/lib/useLoader";
import { IOrder } from "@store-shared/product/types";
import { SafeUser } from "@uac-shared/user/types";
import { useLoggedInUser } from "@uac/lib/login/services";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { UserOrderListComponent } from "./UserOrderList.component";
import { IUserOrderListInputProps, IUserOrderListProps, UserOrderListProps } from "./UserOrderList.d";

const injectUserOrderListProps = createInjector(({userId}:IUserOrderListInputProps):IUserOrderListProps => {
    const [loggedInUser] = useLoggedInUser();
    const [user, setUser] = useState<SafeUser>(loggedInUser.user);
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<IOrder | undefined>();
    const loader = useLoaderAsync();

    useEffect(() => {
        if(user.id) {
            loader(async () => {
                services().user.get(user.id).then(setUser);
            });
            loader(async () => {
                services().order.search(user.id).then(setOrders);
            });
        }
    }, [userId]);

    const selectOrder = (order: IOrder) => () => setSelectedOrder(order);

    return {user, orders, isLoading: loader.isLoading, selectedOrder, selectOrder};
});

const connect = inject<IUserOrderListInputProps, UserOrderListProps>(mergeProps(
    injectUserOrderListProps,
));

export const UserOrderList = connect(UserOrderListComponent);

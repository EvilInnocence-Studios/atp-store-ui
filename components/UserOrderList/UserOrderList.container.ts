import { services } from "@core/lib/api";
import { useLoaderAsync } from "@core/lib/useLoader";
import { IOrder } from "@store-shared/order/types";
import { SafeUser } from "@uac-shared/user/types";
import { useLoggedInUser } from "@uac/lib/login/services";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { UserOrderListComponent } from "./UserOrderList.component";
import { IUserOrderListInputProps, IUserOrderListProps, UserOrderListProps } from "./UserOrderList.d";
import { useNavigate } from "react-router";

const injectUserOrderListProps = createInjector(({userId, id, onSelectOrder}:IUserOrderListInputProps):IUserOrderListProps => {
    const [loggedInUser] = useLoggedInUser();
    const [user, setUser] = useState<SafeUser>(loggedInUser.user);
    const [orders, setOrders] = useState<IOrder[]>([]);
    const loader = useLoaderAsync();
    const navigate = useNavigate();

    useEffect(() => {
        if (userId && userId !== user.id) {
            loader(async () => {
                services().user.get(userId).then(setUser);
            });
        }
     }, [userId]);

     const refresh = () => {
        loader(async () => {
            services().order.search(user.id).then(setOrders);
        });
     }

     useEffect(() => {
        if(user.id && user.id !== loggedInUser.user.id) {
            loader(async () => {
                services().user.get(user.id).then(setUser);
            });
            refresh();
        }
    }, [user.id]);

    const selectedOrder = id ? orders.find(order => order.id === id) : undefined;

    const selectOrder = !!onSelectOrder ? onSelectOrder : (order: IOrder) => () => {
        navigate(`/my-account/orders/${order.id}`);
    }

    return {user, orders, isLoading: loader.isLoading, selectedOrder, selectOrder, refresh};
});

const connect = inject<IUserOrderListInputProps, UserOrderListProps>(mergeProps(
    injectUserOrderListProps,
));

export const UserOrderList = connect(UserOrderListComponent);

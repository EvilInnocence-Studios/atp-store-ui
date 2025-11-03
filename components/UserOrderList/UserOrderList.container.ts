import { services } from "@core/lib/api";
import { overridable } from "@core/lib/overridable";
import { useLoaderAsync } from "@core/lib/useLoader";
import { IOrder } from "@store-shared/order/types";
import { SafeUser } from "@uac-shared/user/types";
import { useLoggedInUser } from "@uac/lib/login/services";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createInjector, inject, mergeProps } from "unstateless";
import { UserOrderListComponent } from "./UserOrderList.component";
import { IUserOrderListInputProps, IUserOrderListProps, UserOrderListProps } from "./UserOrderList.d";

const injectUserOrderListProps = createInjector(({userId, id, onSelectOrder}:IUserOrderListInputProps):IUserOrderListProps => {
    const [loggedInUser] = useLoggedInUser();
    const [user, setUser] = useState<SafeUser>(loggedInUser.user);
    const [orders, setOrders] = useState<IOrder[]>([]);
    const loader = useLoaderAsync();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("load user from user id");
        if (userId && userId !== user.id) {
            loader(async () => {
                services().user.get(userId).then(setUser);
            });
        }
     }, [userId]);

     const refresh = () => {
        console.log('load orders');
        loader(async () => {
            services().order.search(user.id).then(setOrders);
        });
     }

     useEffect(() => {
        if(user.id && user.id !== loggedInUser.user.id) {
            loader(async () => {
                services().user.get(user.id).then(setUser);
            });
        }
        refresh();
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

export const UserOrderList = overridable<IUserOrderListInputProps>(connect(UserOrderListComponent));

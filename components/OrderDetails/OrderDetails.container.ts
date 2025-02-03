import { services } from "@core/lib/api";
import { useLoaderAsync } from "@core/lib/useLoader";
import { IOrderFull } from "@store-shared/order/types";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { OrderDetailsComponent } from "./OrderDetails.component";
import { IOrderDetailsInputProps, IOrderDetailsProps, OrderDetailsProps } from "./OrderDetails.d";

const injectOrderDetailsProps = createInjector(({userId, orderId}:IOrderDetailsInputProps):IOrderDetailsProps => {
    const [order, setOrder] = useState<IOrderFull | undefined>();
    const loader = useLoaderAsync();

    useEffect(() => {
        loader(async () => {
            services().order.getFull(userId, orderId).then(setOrder);
        });
    }, [orderId]);
    
    return {order, isLoading: loader.isLoading};
});

const connect = inject<IOrderDetailsInputProps, OrderDetailsProps>(mergeProps(
    injectOrderDetailsProps,
));

export const OrderDetails = connect(OrderDetailsComponent);

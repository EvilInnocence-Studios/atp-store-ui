import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { IOrder } from "@store-shared/order/types";
import { UserOrderList } from "@store/components/UserOrderList";
import { uacPlugins } from "@uac/lib/plugin/slots"
import { useState } from "react";

export const registerUserManagerTabPlugins = () => {
    uacPlugins.userManager.tabs.register({
        key: "orders",
        title: "Orders",
        icon: faCartShopping,
        priority: 1000,
        component: ({userId}) => {
            const [orderId, setOrderId] = useState<string | undefined>(undefined);
            const onSelectOrder = (order: IOrder) => () => {
                setOrderId(order.id);
            }
            return <UserOrderList userId={userId} id={orderId} onSelectOrder={onSelectOrder}/>
        },
    });
}
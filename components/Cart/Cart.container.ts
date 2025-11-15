import { services } from "@core/lib/api";
import { flash } from "@core/lib/flash";
import { overridable } from "@core/lib/overridable";
import { useLoaderAsync } from "@core/lib/useLoader";
import { IOrder } from "@store-shared/order/types";
import { useCart } from "@store/lib/useCart";
import { useLoggedInUser } from "@uac/lib/login/services";
import { useLoginForm } from "@uac/lib/useLoginForm";
import { useNavigate } from "react-router";
import { prop } from "ts-functional";
import { createInjector, inject, mergeProps } from "unstateless";
import { CartComponent } from "./Cart.component";
import { CartProps, ICartInputProps, ICartProps } from "./Cart.d";

const injectCartProps = createInjector(({}:ICartInputProps):ICartProps => {
    const [{user}] = useLoggedInUser();
    const cart = useCart();
    const navigate = useNavigate();
    const loader = useLoaderAsync();
    const loginModal = useLoginForm();

    const ids = cart.products.map(prop("id"));

    const createOrder = (_data:any, _actions:any) => {
        return services().order.start(
            user.id, {
                ids,
                couponCode: cart.couponCode,
            }).then((order:any) => {
                return order.transactionId;
            });
    }

    const finishOrder = (order:IOrder) => {
        flash.success("Order placed successfully")();
        cart.clear();
        navigate(`/my-account/orders/${order.id}`);
}

    const onApprove = (_data:any, actions:any) => 
        actions.order.capture().then((details:any) => 
            loader(() => services().order.finalize(user.id, details.id)
                .then(finishOrder)
            )
        );

    const onCancel = (data:any) => {
        services().errorReport("Order Cancelled", data);
    }

    const onError = (data:any) => {
        services().errorReport("Order Error", data);
    }

    const completeFreeOrder = () => {
        loader(() => services().order.finalizeFreeOrder(user.id, ids)
            .then(finishOrder)
        );
    }

    return {
        ...cart,
        isLoading: cart.isLoading || loader.isLoading,
        userId: user.id,
        createOrder,
        onApprove,
        onCancel,
        onError,
        completeFreeOrder,
        loginModal,
    };
});

const connect = inject<ICartInputProps, CartProps>(mergeProps(
    injectCartProps,
));
export const connectCart = connect;

export const Cart = overridable<ICartInputProps>(connect(CartComponent));

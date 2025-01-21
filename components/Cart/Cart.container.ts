import { services } from "@core/lib/api";
import { useCart } from "@store/lib/useCart";
import { useLoggedInUser } from "@uac/lib/login/services";
import { prop } from "ts-functional";
import { createInjector, inject, mergeProps } from "unstateless";
import { CartComponent } from "./Cart.component";
import { CartProps, ICartInputProps, ICartProps } from "./Cart.d";
import { useNavigate } from "react-router";
import { flash } from "@core/lib/flash";

const injectCartProps = createInjector(({}:ICartInputProps):ICartProps => {
    const [{user}] = useLoggedInUser();
    const cart = useCart();
    const navigate = useNavigate();

    const createOrder = (_data:any, _actions:any) => {
        return services().order.start(
            user.id, {
                ids: cart.products.map(prop("id")),
                couponCode: cart.couponCode,
            }).then((order:any) => {
                return order.transactionId;
            });
    }

    const onApprove = (_data:any, actions:any) => {
        console.log("Approving order");
        return actions.order.capture().then(function(details:any) {                        
            return services().order.finalize(user.id, details.id).then((_order:any) => {
                flash.success("Order placed successfully")();
                cart.clear();
                navigate('/my-account/orders');
            });
        });
    }

    return {...cart, userId: user.id, createOrder, onApprove};
});

const connect = inject<ICartInputProps, CartProps>(mergeProps(
    injectCartProps,
));

export const Cart = connect(CartComponent);

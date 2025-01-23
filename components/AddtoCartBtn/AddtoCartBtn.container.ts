import { useNavigate } from "react-router";
import { createInjector, inject, mergeProps } from "unstateless";
import { AddtoCartBtnComponent } from "./AddtoCartBtn.component";
import { AddtoCartBtnProps, IAddtoCartBtnInputProps, IAddtoCartBtnProps } from "./AddtoCartBtn.d";
import { useCart } from "@store/lib/useCart";
import { flash } from "@core/lib/flash";
import { switchOn } from "ts-functional";

const injectAddtoCartBtnProps = createInjector(({product}:IAddtoCartBtnInputProps):IAddtoCartBtnProps => {
    const navigate = useNavigate();
    const cart = useCart();

    const brokeredLink = switchOn(product.brokeredAt || "", {
        Daz:         () => `https://www.daz3d.com/${product.brokerageProductId?.split(":")[1]}`,
        RuntimeDNA:  () => `https://www.daz3d.com/${product.brokerageProductId?.split(":")[1]}`,
        Renderosity: () => `https://www.renderosity.com/marketplace/products/${product.brokerageProductId?.split(":")[1]}`,
        HiveWire:    () => "https://hivewire3d.com/",
        default:     () => "",
    }) || "";

    return {
        addToCart: () => {
            cart.add(product);
            flash.success("Product added to cart")();
        },
        download: () => {
            // Manually create an order, submit it, and then navigate to the user downloads page
        },
        subscribe: () => {navigate("/backstage-pass")},
        brokeredLink,
    };
});

const connect = inject<IAddtoCartBtnInputProps, AddtoCartBtnProps>(mergeProps(
    injectAddtoCartBtnProps,
));

export const AddtoCartBtn = connect(AddtoCartBtnComponent);

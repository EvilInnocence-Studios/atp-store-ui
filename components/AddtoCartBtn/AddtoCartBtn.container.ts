import { flash } from "@core/lib/flash";
import { useToggle } from "@core/lib/useToggle";
import { useCart } from "@store/lib/useCart";
import { switchOn } from "ts-functional";
import { createInjector, inject, mergeProps } from "unstateless";
import { AddtoCartBtnComponent } from "./AddtoCartBtn.component";
import { AddtoCartBtnProps, IAddtoCartBtnInputProps, IAddtoCartBtnProps } from "./AddtoCartBtn.d";

const injectAddtoCartBtnProps = createInjector(({product}:IAddtoCartBtnInputProps):IAddtoCartBtnProps => {
    const bspModal = useToggle();
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
        bspModal,
        brokeredLink,
    };
});

const connect = inject<IAddtoCartBtnInputProps, AddtoCartBtnProps>(mergeProps(
    injectAddtoCartBtnProps,
));

export const AddtoCartBtn = connect(AddtoCartBtnComponent);

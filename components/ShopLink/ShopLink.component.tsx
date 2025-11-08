import { overridable } from "@core/lib/overridable";
import { faShop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";
import { ShopLinkProps } from "./ShopLink.d";
import styles from './ShopLink.module.scss';

export const ShopLinkComponent = overridable<ShopLinkProps>(({showShopLink}:ShopLinkProps) => <>
    {showShopLink && <span className={styles.shopLink}>
        <Link to="/products">
            <FontAwesomeIcon icon={faShop} />
            <span>Shop</span>
        </Link>
    </span>}

</>);

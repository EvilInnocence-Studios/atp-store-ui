import { overridable } from "@core/lib/overridable";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";
import { WishlistBtnProps } from "./WishlistBtn.d";

export const WishlistBtnComponent = overridable(({className, css, isLoggedIn, loginModal, add}:WishlistBtnProps) => <>
    {css && <style>{css}</style>}
    {isLoggedIn && <Button className={className} type="link" onClick={add}>
        <FontAwesomeIcon icon={faHeart} /> Add to wishlist
    </Button>}
    {!isLoggedIn && <Button className={className} type="link" onClick={loginModal.open}>
        <FontAwesomeIcon icon={faHeart} /> Login to add to wishlist
    </Button>}
</>);


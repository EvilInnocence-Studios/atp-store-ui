import { Link } from "react-router";
import {CategoryLinksProps} from "./CategoryLinks.d";
import styles from './CategoryLinks.module.scss';
import { overridable } from "@core/lib/overridable";

export const CategoryLinksComponent = overridable(({links, showCategoryLinks}:CategoryLinksProps) => showCategoryLinks ? 
    <div className={styles.categoryLinks}>
        <Link to="/products" className={styles.categoryLink}>All Products</Link>
        {links.map(({name, url}) =>
            <Link key={name} to={url} className={styles.categoryLink}>{name}</Link>
        )}
    </div> : null
);

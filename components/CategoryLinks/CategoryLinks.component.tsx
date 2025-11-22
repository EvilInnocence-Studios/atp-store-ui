import { Link } from "react-router";
import { CategoryLinksProps } from "./CategoryLinks.d";
import styles from './CategoryLinks.module.scss';
import { overridable } from "@core/lib/overridable";

export const CategoryLinksComponent = overridable(({ links, showCategoryLinks, classes = styles }: CategoryLinksProps) => showCategoryLinks ?
    <div className={classes.categoryLinks}>
        <Link to="/products" className={classes.categoryLink}>All Products</Link>
        {links.map(({ name, url }) =>
            <Link key={name} to={url} className={classes.categoryLink}>{name}</Link>
        )}
    </div> : null
);

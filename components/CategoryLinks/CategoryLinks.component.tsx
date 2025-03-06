import { Link } from "react-router";
import {CategoryLinksProps} from "./CategoryLinks.d";
import styles from './CategoryLinks.module.scss';

export const CategoryLinksComponent = ({links}:CategoryLinksProps) =>
    <div className={styles.categoryLinks}>
        <Link to="/products" className={styles.categoryLink}>All Products</Link>
        {links.map(({name, url}) =>
            <Link key={name} to={url} className={styles.categoryLink}>{name}</Link>
        )}
    </div>;

import { faCreativeCommonsNc } from "@fortawesome/free-brands-svg-icons";
import { faCrown, faDollarSign, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IProductFull } from "@store-shared/product/types";
import { BSPFaq } from "../BSPFaq";
import { BSPSignupForm } from "../BSPSignupForm";
import { ProductScroller } from "../ProductScroller";
import { BackstagePassProps } from "./BackstagePass.d";
import styles from './BackstagePass.module.scss';

export const BackstagePassComponent = ({count   }:BackstagePassProps) =>
    <div className={styles.backstagePass}>
        <div className={styles.topInfo}>
            <div>
                <h1>Backstage Pass</h1>
                <h2>Exclusive 3D Content for Poser & DAZ Studio</h2>

                <p>Get instant access to over <b>{count}</b> exclusive Poser and DAZ Studio products, with more every month! Plus, enjoy <b>25%</b> off all regular products in our store.</p>

                <div className={styles.subscribeLink}>
                    <a href="#signup">
                        Subscribe Now
                    </a>
                </div>
            </div>
        </div>

        <div className={styles.benefitsWrapper}>
            <ul className={styles.benefits}>
                <li>
                    <div className={styles.icon}><FontAwesomeIcon icon={faCrown} /></div>
                    <h3>Exclusive Content</h3>
                    <p>Unlimited access to exclusive Backstage Pass content</p>
                </li>
                <li>
                    <div className={styles.icon}><FontAwesomeIcon icon={faPlus} /></div>
                    <h3>New content</h3>
                    <p>New releases every month – at least 4 new items guaranteed</p>
                </li>
                <li>
                    <div className={styles.icon}><FontAwesomeIcon icon={faDollarSign} /></div>
                    <h3>Extra Savings</h3>
                    <p>Exclusive savings – 25% off all regular store items</p>
                </li>
                <li>
                    <div className={styles.icon}><FontAwesomeIcon icon={faCreativeCommonsNc} /></div>
                    <h3>No hidden fees</h3>
                    <p>No extra fees – all Backstage Pass items are FREE to download</p>
                </li>
            </ul>
        </div>

        <a id="signup" />
        <BSPSignupForm />

        <ProductScroller
            title="Explore Backstage Pass Products"
            count={10}
            filter={(p:IProductFull) => p.tags.includes('BSP Featured')}
            sort={(a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()}
        />

        <div className={styles.faq}>
            <h2>FAQ</h2>
            <BSPFaq />
        </div>
    </div>;

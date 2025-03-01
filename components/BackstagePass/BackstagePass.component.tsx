import { Link } from "react-router";
import { BSPSignupForm } from "../BSPSignupForm";
import { BackstagePassProps } from "./BackstagePass.d";
import styles from './BackstagePass.module.scss';

export const BackstagePassComponent = ({count   }:BackstagePassProps) =>
    <div className={styles.backstagePass}>
        <div className={styles.topInfo}>
            <div>
                <h1>Backstage Pass Subscription</h1>
                <h2>Unlock Exclusive 3D Content for Poser & DAZ Studio</h2>
                <h3>🎭 Get VIP Access to Our Exclusive Catalog of over {count} products</h3>

                <p>Join the Backstage Pass Subscription and instantly access over {count} exclusive Poser and DAZ Studio products for one low monthly price—with new content added every month! Plus, enjoy 25% off all regular products in our store.</p>

                <ul>
                    <li>Unlimited access to exclusive Backstage Pass content</li>
                    <li>New releases every month – at least 4 new items guaranteed</li>
                    <li>Exclusive savings – 25% off all regular store items</li>
                    <li>No extra fees – all Backstage Pass items are FREE to download</li>
                </ul>

                <p>📥 Start downloading today!</p>
            </div>
        </div>

        <BSPSignupForm />

        <div className={styles.about}>
            <div>
                <h2>📦 What’s Included?</h2>

                <ul>
                    <li>Instant access to all Backstage Pass Exclusives (850+ items)</li>
                    <li>New content released monthly – at least 4 new items guaranteed</li>
                    <li>Early access to all future exclusive releases</li>
                    <li>25% discount on all standard store products</li>
                </ul>

                <p>💡 Your subscription pays for itself!</p>

                <p><Link to="">🔎 Browse Backstage Pass Catalog</Link></p>

                <p>More questions?  See our <Link to="">FAQ</Link>.</p>
            </div>
        </div>
    </div>;

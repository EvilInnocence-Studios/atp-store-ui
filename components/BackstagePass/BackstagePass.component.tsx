import { Link } from "react-router";
import {BackstagePassProps} from "./BackstagePass.d";
import styles from './BackstagePass.module.scss';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Button } from "antd";

var subscriptionOptions = [{
    planId:			'P-9BB699402P8840110L33Z2PA',
    description:	'Monthly',
    renews:			'month',
    period:			1,
    price:			9.99,
}, {
    planId:			'P-15W80834UF944505FL332IJQ',
    description:	'Quarterly',
    renews:			'3 months',
    period:			3,
    price:			25.99,
}, {
    planId:			'P-1TA12176F5098193BL332I7Y',
    description:	'Semi-Annually',
    renews:			'6 months',
    period:			6,
    price:			39.99,
}];

export const BackstagePassComponent = ({count, selectedOption, setSelectedOption}:BackstagePassProps) =>
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


        <div className={styles.subscriptionOptions}>
            <div>
                <h2>Choose your Subscription Plan</h2>
                <div className={styles.optionList}>
                    {subscriptionOptions.map((option, i) =>
                        <div key={i} className={styles.subscriptionOption}>
                            <div className={styles.optionDetails}>
                                <Button type={selectedOption === i ? "primary" : "default"} onClick={() => setSelectedOption(i)}>
                                    {option.description}: ${option.price}
                                </Button>
                                <p>
                                    Renews every {option.renews}
                                    {i > 0 && <><br/>
                                        Saves {Math.round((1 - (option.price / option.period) / subscriptionOptions[0].price) * 100)}%
                                    </>}
                                </p>
                            </div>
                            {selectedOption === i && <PayPalButtons
                                style={{
                                    label: 'subscribe',
                                }}
                                createSubscription={(_data, actions) => {
                                    return actions.subscription.create({
                                        plan_id: option.planId
                                    });
                                }}
                                onApprove={(data, actions) => {
                                    console.log(data);
                                    console.log(actions);
                                    return Promise.resolve();
                                }}
                                onCancel={(data, actions) => {
                                    console.log(data);
                                    console.log(actions);
                                }}
                                onError={(err) => {
                                    console.error(err);
                                }}
                            />}
                        </div>
                    )}
                </div>
            </div>
        </div>

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

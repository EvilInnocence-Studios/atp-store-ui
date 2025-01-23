import { Link } from "react-router";
import {BackstagePassProps} from "./BackstagePass.d";
import styles from './BackstagePass.module.scss';
import { PayPalButtons } from "@paypal/react-paypal-js";

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

export const BackstagePassComponent = ({count}:BackstagePassProps) =>
    <div className={styles.backstagePass}>
        <h1>Backstage Pass</h1>

        <h2>Exclusive products for Poser and DAZ Studio every month</h2>

        <p>Get a Backstage Pass Subscription and start downloading our catalog of exclusive content only available at EvilInnocence.com. For one low monthly price, you get access to over {count} Poser and DAZ Studio products for no additional cost, with new content available every month. You also get 25% off all of our regular products.</p>

        <p>Visit our <Link to="/products?tags=169">Backstage Pass Exclusives catalog</Link> to see what's available.</p>

        <h2>Choose your subscription</h2>

        <div className={styles.subscriptionOptions}>
            {subscriptionOptions.map((option, i) =>
                <div key={i} className={styles.subscriptionOption}>
                    <h3>{option.description}</h3>
                    <p>Renews every {option.renews}</p>
                    <p>Price: ${option.price} per {option.renews}</p>
                    <PayPalButtons
                        style={{
                            label: 'subscribe',
                        }}
                        createSubscription={(data, actions) => {
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
                    />
                </div>
            )}
        </div>

        <h3>What is the Backstage Pass Subscription?</h3>
        <p>In addition to the regular products for sale on this website and at other brokerages, EvilInnocence is now offering exclusive content not available anywhere else to our Backstage Pass subscribers. By purchasing a Backstage Pass subscription, you'll get access to all of our existing Backstage Pass Exclusive products, as well as new exclusive products every month. You also get 25% off all of our regular products.</p>

        <h3>What's included in the Backstage Pass Subscription?</h3>
        <ul>
            <li>Access to our entire catalog of Backstage Pass Exclusive products (over {count} products).</li>
            <li>New content every month.</li>
            <li>Access to all new Backstage Pass Exclusive items as soon as they're released.</li>
            <li>25% off all regular products in our store.</li>
            <li>How often will new Backstage Pass Exclusive items be released?</li>
            <li>We guarantee at least four new Backstage Pass Exclusive items every month. Additional items will be released at our discretion.</li>
        </ul>

        <h3>How much will each Backstage Pass Exclusive item cost?</h3>
        <p>Nothing! Once you have a Backstage Pass Subscription, every Backstage Pass Exclusive item is completely free. There are no extra fees for downloading each item.</p>

        <h3>How are the Backstage Pass Exclusive products licensed?</h3>
        <p>All of the Backstage Pass Exclusive products use our standard <Link to="/3d-content-license">3d Content License</Link>, which means that they can be used for both personal and commercial projects. You can also continue to use the Backstage Pass Exclusive products even if you cancel your Backstage Pass subscription.</p>

        <h3>Does my Backstage Pass Subscription renew automatically?</h3>
        <p>Yes, your Backstage Pass Subscription will renew automatically at the beginning of each billing cycle. By auto-renewing your Backstage Pass Subscription, you don't have to worry about your subscription lapsing and losing access to any products you haven't downloaded yet. Also, by auto-renewing your subscription, you will be guaranteed the same price you started with, even if we later increase prices or change the plan options.</p>

        <h3>Do I need a PayPal account?</h3>
        <p>No. Although PayPal is our processor for all subscriptions, you can sign up with just a debit or credit card.</p>

        <h3>How easy is it to cancel my Backstage Pass Subscription?</h3>
        <p>It is very simple to cancel your subscription. Just login to your PayPal account and cancel the subscription. You can find more complete instructions at PayPal's help page on <a href="https://www.paypal.com/li/smarthelp/article/how-do-i-cancel-a-recurring-payment,-subscription,-or-automatic-billing-agreement-i-have-with-a-merchant-faq1067" target="_blank">cancelling payments</a>. If you have trouble cancelling your subscription or if you don't have a PayPal account, please <Link to="/contacts">contact us</Link> and we'll take care of it for you.</p>

        <h3>When does my subscription end if I cancel it?</h3>
        <p>If you cancel, your Backstage Pass subscription will be deactivated at the end of your current billing period. Once it is cancelled, you will no longer be able to add new Backstage Pass items to your cart.  However, any Backstage Pass items you've already ordered will remain in your account and can be downloaded indefinitely.</p>
    </div>;

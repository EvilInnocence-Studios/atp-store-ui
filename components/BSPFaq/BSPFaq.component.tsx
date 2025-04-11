import { Collapse } from "antd";
import {BSPFaqProps} from "./BSPFaq.d";
// import styles from './BSPFaq.module.scss';
import { Link } from "react-router";

export const BSPFaqComponent = ({}:BSPFaqProps) =>
    <Collapse accordion>
        <Collapse.Panel header="What is Backstage Pass?" key="1">
            <p>Backstage Pass is a subscription service that gives you unlimited access to exclusive 3D content for Poser and DAZ Studio. With a Backstage Pass subscription, you can download all Backstage Pass items for free, plus enjoy a 25% discount on all regular store items.</p>
        </Collapse.Panel>
        <Collapse.Panel header="How does it work?" key="2">
            <p>When you subscribe to Backstage Pass, you get instant access to all Backstage Pass items. New content is released every month, with at least 4 new items guaranteed. You can download all Backstage Pass items for free, and enjoy a 25% discount on all regular store items.</p>
        </Collapse.Panel>
        <Collapse.Panel header="How do I subscribe?" key="3">
            <p>Click the “Subscribe Now” button above to sign up for Backstage Pass. You’ll be asked to create an account and enter your payment information. Once your payment is processed, you’ll have instant access to all Backstage Pass items.</p>
        </Collapse.Panel>
        <Collapse.Panel header="How do I access the content?" key="4">
            <p>Once you’ve subscribed to Backstage Pass, you can access all Backstage Pass items by logging into your account on our website. From there, you can browse the entire Backstage Pass catalog and download any items you like for free.</p>
        </Collapse.Panel>
        <Collapse.Panel header="Can I cancel my subscription?" key="5">
            <p>Yes, you can cancel your Backstage Pass subscription at any time. To cancel, simply log into your account on our website and go to the “My Account” page. From there, you can manage your subscription and cancel at any time.</p>
        </Collapse.Panel>
        <Collapse.Panel header="How often is new content released?" key="6">
            <p>New content is released every month, with at least 4 new items guaranteed. You can access all new releases as soon as they become available, and download them for free as part of your Backstage Pass subscription.</p>
        </Collapse.Panel>
        <Collapse.Panel header="How much will each Backstage Pass Exclusive item cost?" key="7">
            <p>All Backstage Pass items are free to download as part of your subscription. There are no additional costs or fees for Backstage Pass items – they are all included in your subscription.</p>
        </Collapse.Panel>
        <Collapse.Panel header="How are the Backstage Pass Exclusive products licensed?" key="8">
            <p>All Backstage Pass items are <Link to="/3d-content-license">licensed for personal and commercial use</Link>. You can use them in your own projects, including commercial projects, without any additional licensing fees or restrictions.</p>
        </Collapse.Panel>
        <Collapse.Panel header="Does my Backstage Pass Subscription renew automatically?" key="9">
            <p>Yes, your Backstage Pass subscription will renew automatically each renewal period. You can cancel your subscription at any time by logging into your account on our website and managing your subscription settings.</p>
        </Collapse.Panel>
        <Collapse.Panel header="Do I need a PayPal account?" key="10">
            <p>No, you do not need a PayPal account to subscribe to Backstage Pass. You can pay with a credit or debit card without creating a PayPal account.</p>
        </Collapse.Panel>
        <Collapse.Panel header="When does my subscription end if I cancel it?" key="11">
            <p>If you cancel your Backstage Pass subscription, your subscription will terminate immediately. You will continue to have access to all Backstage Pass items you have previous downloaded even after your subscription expires.</p>
        </Collapse.Panel>
    </Collapse>;

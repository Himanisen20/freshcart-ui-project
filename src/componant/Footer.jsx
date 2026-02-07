// src/components/Footer.jsx
import React from "react";
import "../css/footer.css";

function Footer() {
  return (
    <footer className="fc-footer">
      {/* ========== TOP MULTI COLUMN LINKS ========== */}
      <div className="fc-footer-top">
        <div className="fc-footer-col">
          <h4>Categories</h4>
          <ul>
            <li>Vegetables &amp; Fruits</li>
            <li>Breakfast &amp; instant food</li>
            <li>Bakery &amp; Biscuits</li>
            <li>Atta, rice &amp; dal</li>
            <li>Sauces &amp; spreads</li>
            <li>Organic &amp; gourmet</li>
            <li>Baby care</li>
            <li>Cleaning essentials</li>
            <li>Personal care</li>
          </ul>
        </div>

        <div className="fc-footer-col">
          <h4>&nbsp;</h4>
          <ul>
            <li>Dairy, bread &amp; eggs</li>
            <li>Cold drinks &amp; juices</li>
            <li>Tea, coffee &amp; drinks</li>
            <li>Masala, oil &amp; more</li>
            <li>Chicken, meat &amp; fish</li>
            <li>Paan corner</li>
            <li>Pharma &amp; wellness</li>
            <li>Home &amp; office</li>
            <li>Pet care</li>
          </ul>
        </div>

        <div className="fc-footer-col">
          <h4>Get to know us</h4>
          <ul>
            <li>Company</li>
            <li>About</li>
            <li>Blog</li>
            <li>Help Center</li>
            <li>Our Value</li>
          </ul>
        </div>

        <div className="fc-footer-col">
          <h4>For Consumers</h4>
          <ul>
            <li>Payments</li>
            <li>Shipping</li>
            <li>Product Returns</li>
            <li>FAQ</li>
            <li>Shop Checkout</li>
          </ul>
        </div>

        <div className="fc-footer-col">
          <h4>Become a Shopper</h4>
          <ul>
            <li>Shopper Opportunities</li>
            <li>Become a Shopper</li>
            <li>Earnings</li>
            <li>Ideas &amp; Guides</li>
            <li>New Retailers</li>
          </ul>
        </div>

        <div className="fc-footer-col">
          <h4>Freshcart programs</h4>
          <ul>
            <li>Freshcart programs</li>
            <li>Gift Cards</li>
            <li>Promos &amp; Coupons</li>
            <li>Freshcart Ads</li>
            <li>Careers</li>
          </ul>
        </div>
      </div>

      {/* ========== PAYMENT + APPS ========== */}
      <div className="fc-footer-middle">
        <div className="fc-payments">
          <span className="fc-middle-title">Payment Partners</span>
          <div className="fc-payment-logos">
            <span>amazon pay</span>
            <span>american express</span>
            <span>Mastercard</span>
            <span>PayPal</span>
            <span>VISA</span>
          </div>
        </div>

        <div className="fc-delivery-text">
          Get deliveries with FreshCart
        </div>

        <div className="fc-app-buttons">
          <button className="fc-store-btn">Available on the App Store</button>
          <button className="fc-store-btn">Get it on Google Play</button>
        </div>
      </div>

      {/* ========== COPYRIGHT + SOCIAL ========== */}
      <div className="fc-footer-bottom">
        <p className="fc-copy">
          © 2022 - 2025 FreshCart eCommerce HTML Template. All rights reserved.
          Powered by <span className="fc-highlight">Codescandy.</span>
        </p>

        <div className="fc-social">
          <span>Follow us on</span>
          <button className="fc-social-icon">f</button>
          <button className="fc-social-icon">t</button>
          <button className="fc-social-icon">ig</button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

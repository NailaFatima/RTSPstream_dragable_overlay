import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>StreamView</h3>
            <p>Professional live streaming with custom overlays</p>
            <p>Simple. Streamlined. Smart Livestreaming.</p>
          </div>
          {/*<div className="footer-links">*/}
          {/*  <div className="footer-section">*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Naila Syed. All rights reserved.</p>
            <p className="text-xs md:text-sm text-primary-foreground/80 mt-1 flex items-center justify-center md:justify-start gap-1">
                Made with
                <span
                    className="h-5 w-5"
                    style={{
                        display: 'inline-block',
                        verticalAlign: 'middle'
                    }}
                >
  <svg
      viewBox="0 0 20 20"
      width="20"
      height="20"
      fill="#ef4444" // Tailwind's red-500
      style={{display: 'block'}}
  >
    <path
        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/>
  </svg>
</span> for better WEB

            </p>
            <div className="footer-social">
                <a href="https://x.com/nafatsy" aria-label="Twitter" target="_blank" rel="noopener noreferrer">🐦</a>
                <a href="https://github.com/NailaFatima?tab=repositories" aria-label="GitHub" target="_blank"
                   rel="noopener noreferrer">🐙</a>
                <a href="https://discord.com" aria-label="Discord" target="_blank" rel="noopener noreferrer">💬</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BarChart2,
  Check,
  Clock,
  Globe,
  PlayCircle,
  Search,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";
import dashboardImg from "../assets/dashboard.png";

export function LandingPage() {
  const navigate = useNavigate();

  const goSearch = () => navigate("/search");

  return (
    <div className="landing-page">
      <style>{`
        :root {
          --background: #080a10;
          --foreground: #eef0f7;
          --border: #1c2034;
          --muted-foreground: #5a6380;
          --primary: #6c5ce7;
          --radius-md: 12px;
          --radius-lg: 24px;
          --font-body: Inter, sans-serif;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          margin: 0;
        }

        .landing-page {
          min-height: 100vh;
          background: radial-gradient(circle at top, rgba(108, 92, 231, 0.16), transparent 35%), #080a10;
          color: var(--foreground);
          font-family: var(--font-body);
        }

        .page-inner {
          max-width: 90%;
          margin: 0 auto;
          padding: 24px 32px 72px;
        }

        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          padding: 20px 0;
        }

        .brand {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-weight: 800;
          letter-spacing: -0.02em;
          font-size: 1.2rem;
        }

        .brand-icon {
          width: 44px;
          height: 44px;
          border-radius: 16px;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, #6c5ce7, #8b7ff5);
          color: white;
        }

        .hero {
          display: grid;
          grid-template-columns: minmax(0, 0.6fr) minmax(620px, 1fr);
          gap: 40px;
          align-items: center;
          min-height: calc(100vh - 120px);
          padding: 24px 0;
        }

        .hero-copy {
          max-width: 560px;
        }

        .eyebrow {
          display: inline-flex;
          gap: 10px;
          align-items: center;
          padding: 10px 18px;
          border-radius: 999px;
          background: rgba(108, 92, 231, 0.14);
          color: #b9b6ff;
          font-size: 0.85rem;
          margin-bottom: 24px;
        }

        .hero-title {
          font-size: clamp(3rem, 5vw, 5rem);
          line-height: 0.95;
          font-weight: 900;
          letter-spacing: -0.08em;
          margin-bottom: 24px;
          max-width: 720px;
        }

        .hero-title span {
          background: linear-gradient(135deg, #a89eff, #6c5ce7, #f472b6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }

        .hero-copy p {
          max-width: 560px;
          color: var(--muted-foreground);
          line-height: 1.8;
          font-size: 1rem;
          margin-bottom: 36px;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 44px;
        }

        .button-primary,
        .button-secondary {
          border: none;
          border-radius: 999px;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .button-primary {
          background: linear-gradient(135deg, #6c5ce7, #8b7ff5);
          color: white;
          padding: 16px 28px;
          font-size: 1rem;
        }

        .button-secondary {
          background: rgba(255, 255, 255, 0.06);
          color: var(--foreground);
          padding: 16px 26px;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .button-primary:hover,
        .button-secondary:hover {
          transform: translateY(-1px);
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
          margin-top: 18px;
        }

        .stat-card {
          padding: 18px 20px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.03);
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 0;
        }

        .stat-value {
          font-size: 1.75rem;
          font-weight: 800;
        }

        .stat-label {
          color: var(--muted-foreground);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.78rem;
          font-weight: 700;
        }

        .hero-art {
          position: relative;
          display: flex;
          justify-content: center;
        }

        .hero-art-card {
          border-radius: 32px;
          overflow: hidden;
          border: 1px solid rgba(108, 92, 231, 0.18);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
          background: #090b12;
          width: 100%
        }

        .hero-art-card img {
          width: 100%;
          display: block;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          margin-top: 16px;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 24px;
          padding: 24px;
          min-height: 220px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .feature-card h3 {
          font-size: 1.05rem;
          font-weight: 800;
          margin: 0;
        }

        .feature-card p {
          color: var(--muted-foreground);
          line-height: 1.75;
          font-size: 0.95rem;
          flex: 1;
        }

        .feature-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 999px;
          color: #d7d2ff;
          background: rgba(108, 92, 231, 0.12);
          font-size: 0.82rem;
          font-weight: 700;
          width: fit-content;
        }

        .cta-section {
          background: linear-gradient(180deg, rgba(27, 22, 65, 0.95) 0%, rgba(8, 10, 16, 0.95) 100%);
          border: 1px solid rgba(108, 92, 231, 0.3);
          border-radius: 32px;
          padding: 64px 52px;
          margin-top: 64px;
          text-align: center;
        }

        .cta-section h2 {
          font-size: clamp(2.5rem, 4vw, 4rem);
          margin-bottom: 18px;
          line-height: 1.05;
        }

        .cta-section p {
          color: var(--muted-foreground);
          max-width: 640px;
          margin: 0 auto 36px;
          line-height: 1.8;
          font-size: 1rem;
        }

        .cta-footer {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          margin-top: 28px;
        }

        .cta-footer span {
          color: rgba(238, 240, 247, 0.7);
          font-size: 0.95rem;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          justify-content: center;
          padding: 12px 16px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.03);
        }

        .footer {
          margin-top: 88px;
          padding-top: 40px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          color: var(--muted-foreground);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 28px;
          margin-bottom: 28px;
        }

        .footer-section h4 {
          font-size: 0.82rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 16px;
          color: #9aa3b8;
        }

        .footer-section a {
          display: block;
          margin-bottom: 10px;
          color: inherit;
          opacity: 0.75;
          text-decoration: none;
          font-size: 0.95rem;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .footer-bottom span {
          font-size: 0.95rem;
        }

        .footer-socials {
          display: flex;
          gap: 12px;
        }

        .social-pill {
          width: 42px;
          height: 42px;
          border-radius: 14px;
          display: grid;
          place-items: center;
          background: rgba(255, 255, 255, 0.05);
          color: var(--foreground);
        }

        @media (max-width: 980px) {
          .hero,
          .hero-stats,
          .feature-grid,
          .cta-footer,
          .footer-grid {
            grid-template-columns: 1fr;
          }

          .hero {
            min-height: auto;
            padding-bottom: 40px;
          }
        }

        @media (max-width: 640px) {
          .page-inner {
            padding: 24px 18px 48px;
          }

          .hero-title {
            font-size: 2.8rem;
          }

          .cta-section {
            padding: 42px 24px;
          }
        }
      `}</style>

      <div className="page-inner">
        {/* <header className="navbar flex justify-end">
          <div>
            <button
              className="button-primary  flex justify-end"
              type="button"
              onClick={goSearch}
            >
              Start for Free
              <ArrowRight size={18} />
            </button>
          </div>
        </header> */}

        <main>
          <section className="hero">
            <div className="hero-copy">
              <div className="eyebrow">
                <Zap size={16} />
                Influencer discovery reimagined
              </div>
              <h1 className="hero-title">
                Discover the <span>perfect influencer</span> in seconds.
              </h1>
              <p>
                Search, analyze, and connect with creators across Instagram,
                YouTube, and TikTok — all from one powerful dashboard.
              </p>
              <div className="hero-actions">
                <button
                  className="button-primary flrex justify-center"
                  type="button"
                  onClick={goSearch}
                >
                  <Zap size={16} />
                  Start for Free
                </button>
              </div>
            </div>

            <div className="hero-art">
              <div className="hero-art-card">
                <img src={dashboardImg} alt="Influur platform preview" />
              </div>
            </div>
          </section>
          <div className="hero-stats">
            <div className="stat-card">
              <span className="stat-value">12K+</span>
              <span className="stat-label">Creators indexed</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">2.1B</span>
              <span className="stat-label">Combined reach</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">98%</span>
              <span className="stat-label">Customer satisfaction</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">4.7%</span>
              <span className="stat-label">Average engagement</span>
            </div>
          </div>
          <section className="feature-grid">
            <article className="feature-card">
              <div>
                <Search size={22} />
              </div>
              <h3>AI-Powered Search</h3>
              <p>
                Filter creators by niche, engagement, location, and audience
                quality in milliseconds.
              </p>
              <span className="feature-pill">
                <Zap size={12} />
                Fast discovery
              </span>
            </article>
            <article className="feature-card">
              <div>
                <BarChart2 size={22} />
              </div>
              <h3>Deep analytics</h3>
              <p>
                Compare performance metrics, reach estimates and audience
                authenticity in one view.
              </p>
              <span className="feature-pill">
                <Check size={12} />
                Data-led
              </span>
            </article>
            <article className="feature-card">
              <div>
                <ShieldCheck size={22} />
              </div>
              <h3>Smart campaign lists</h3>
              <p>
                Save top creators, organize teams, and prepare outreach without
                leaving the app.
              </p>
              <span className="feature-pill">
                <Users size={12} />
                Team ready
              </span>
            </article>
          </section>

          {/* <section className="cta-section">
            <h2>Ready to build your next creator campaign?</h2>
            <p>
              Jump into the search experience and see how Influur helps you find
              high-performing influencers faster.
            </p>
            <button className="button-primary" type="button" onClick={goSearch}>
              <Zap size={16} />
              Go to search
            </button>
            <div className="cta-footer">
              <span>
                <Globe size={14} />
                Multi-platform support
              </span>
              <span>
                <Clock size={14} />
                14-day free trial
              </span>
              <span>
                <ShieldCheck size={14} />
                No credit card required
              </span>
            </div>
          </section> */}
        </main>

        <footer className="footer">
          <div className="footer-grid">
            <div className="footer-section">
              <h4>Influur</h4>
              <p>
                The influencer discovery platform for brands that want fast,
                reliable creator matching.
              </p>
            </div>
            <div className="footer-section">
              <h4>Product</h4>
              <a href="#">Features</a>
              <a href="#">Pricing</a>
              <a href="#">Roadmap</a>
            </div>
            <div className="footer-section">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Blog</a>
              <a href="#">Careers</a>
            </div>
            <div className="footer-section">
              <h4>Legal</h4>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2025 Influur. All rights reserved.</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

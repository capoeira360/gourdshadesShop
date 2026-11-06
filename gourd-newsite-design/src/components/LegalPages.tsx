import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, ShieldCheck, FileText, Mail, MessageCircle } from 'lucide-react'
import { MaskedHeading, MaskedParagraph, ScrollFadeReveal } from './ScrollReveal'

const STUDIO_EMAIL = 'gourdshadestz@gmail.com'
const STUDIO_PHONE = '+255 746 754 878'
const STUDIO_PHONE_RAW = '255746754878'

export function PrivacyPolicy() {
  const sections = [
    {
      id: 'collection',
      num: '01',
      title: 'Information We Collect',
      paragraphs: [
        'We collect personal information when you browse our site, place an inquiry for an artisanal lamp, or initiate an order with our Arusha studio.',
        'This information typically includes your name, email address, telephone or WhatsApp contact number, shipping and delivery address, and payment confirmation details. For custom or bespoke commissioned pieces, we may also record your architectural dimensions, interior spaces, or personalized perforation patterns you share with our craft team.',
      ],
    },
    {
      id: 'use',
      num: '02',
      title: 'How We Use Your Information',
      paragraphs: [
        'We use your personal details exclusively to craft your pieces, calculate safe international freight and packaging, coordinate direct studio communication, deliver parcel tracking, and provide dedicated after-sale support.',
        'If you choose to receive updates from our studio, we may also occasionally send you news regarding new lamp collections, craft exhibitions, or workshop stories from Tanzania. You can opt out of updates at any time.',
      ],
    },
    {
      id: 'sharing',
      num: '03',
      title: 'Sharing Your Information',
      paragraphs: [
        'We believe in absolute integrity: we never sell, rent, or trade your personal data with third parties or advertising networks.',
        'We share your information solely with verified, trusted partners strictly required to fulfill your order — such as international logistics carriers (e.g. DHL Express, air courier services) and authorized payment processors necessary to process transactions and deliver your handmade calabash safely to your doorstep.',
      ],
    },
    {
      id: 'security',
      num: '04',
      title: 'Data Security & Storage',
      paragraphs: [
        'We implement reasonable physical and digital security protocols to safeguard your personal details against unauthorized access, loss, or disclosure.',
        'Inquiries sent via direct studio channels (such as encrypted WhatsApp or direct email) are handled personally with strict confidentiality by our artisan management team in Arusha.',
      ],
    },
    {
      id: 'rights',
      num: '05',
      title: 'Your Rights & Control',
      paragraphs: [
        'You have the full right to access, review, modify, or permanently delete your contact records and order history from our studio records at any time.',
        'To request updates or deletions, simply contact us directly via email at gourdshadestz@gmail.com or send a WhatsApp message to our studio phone.',
      ],
    },
    {
      id: 'cookies',
      num: '06',
      title: 'Cookies & Local Storage',
      paragraphs: [
        'Our website uses only generic, functional cookies and local browser storage (such as remembering your selected lighting pieces in your inquiry bag and your motion preferences).',
        'We do not deploy invasive third-party tracking pixels or sell browsing behavior. You may disable cookies through your browser settings, though local bag retention may be affected.',
      ],
    },
    {
      id: 'changes',
      num: '07',
      title: 'Policy Updates',
      paragraphs: [
        'We may update this Privacy Policy periodically to reflect improvements in our studio operations or international trade guidelines. Any revisions will be published directly on this page with an updated timestamp.',
      ],
    },
  ]

  return (
    <main className="legal-page" data-logo-theme="white">
      <section className="page-intro legal-intro">
        <div className="page-intro-row">
          <MaskedHeading
            as="h1"
            lines={[
              <>Your trust,</>,
              <><em>safeguarded.</em></>,
            ]}
            stagger={0.12}
          />
          <MaskedParagraph
            delay={0.25}
            stagger={0.12}
            lines={[
              "We value your privacy and are committed to protecting your personal information.",
              "This policy explains how we collect, use, and respect your details when inquiring about or collecting our handcrafted lamps."
            ]}
          />
        </div>
      </section>

      {/* Quick Switcher Tabs */}
      <div className="legal-tabs-bar">
        <Link to="/privacy" className="legal-tab-btn active">
          <ShieldCheck size={15} /> Privacy Policy
        </Link>
        <Link to="/disclaimer" className="legal-tab-btn">
          <FileText size={15} /> Disclaimer
        </Link>
      </div>

      <div className="legal-layout">
        {/* Sticky Table of Contents & Studio Card */}
        <aside className="legal-sidebar">
          <div className="legal-toc">
            <span className="legal-toc-title">Policy Sections</span>
            <ul className="legal-toc-list">
              {sections.map(s => (
                <li key={s.id} className="legal-toc-item">
                  <a href={`#${s.id}`}>
                    <span className="legal-toc-num">{s.num}</span>
                    <span>{s.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="legal-sidebar-card">
            <h4>Studio Assistance</h4>
            <p>Questions about our privacy handling or need to update your details?</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href={`mailto:${STUDIO_EMAIL}?subject=Privacy%20Inquiry%20%E2%80%94%20Gourd%20Shades`}
                className="button-dark"
                style={{ minHeight: '42px', padding: '0 16px', fontSize: '11px' }}
              >
                <Mail size={14} /> Email Studio
              </a>
              <a
                href={`https://wa.me/${STUDIO_PHONE_RAW}?text=Hello%20Gourd%20Shades,%20I%20have%20a%20question%20regarding%20privacy%20and%20orders.`}
                target="_blank"
                rel="noopener noreferrer"
                className="button-whatsapp"
                style={{ minHeight: '42px', padding: '0 16px', fontSize: '11px', justifyContent: 'center' }}
              >
                <MessageCircle size={14} /> WhatsApp
              </a>
            </div>
          </div>
        </aside>

        {/* Policy Content Articles */}
        <div className="legal-content">
          {sections.map(s => (
            <ScrollFadeReveal key={s.id} delay={0.05}>
              <article id={s.id} className="legal-section-card">
                <div className="legal-section-header">
                  <span className="legal-section-badge">{s.num}</span>
                  <h3>{s.title}</h3>
                </div>
                {s.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </article>
            </ScrollFadeReveal>
          ))}

          <div className="legal-footer-meta">
            <span>Last updated: March 2025 &nbsp;•&nbsp; Arusha, Tanzania</span>
            <Link to="/products" className="button-outline" style={{ minHeight: '40px', padding: '0 16px' }}>
              Back to Collection <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export function Disclaimer() {
  const sections = [
    {
      id: 'general',
      num: '01',
      title: 'General Information & Accuracy',
      paragraphs: [
        'The information provided on this website is intended for general informational and ordering purposes only. While our artisan studio makes every effort to ensure the accuracy, completeness, and reliability of all content presented, we do not guarantee that every detail—including lamp descriptions, photography, dimensions, or prices—is completely error-free or perpetually static.',
        'All content on this site is provided "as is". As an artisan workshop producing individual sculptures from raw botanicals, we reserve the right to refine descriptions or clarify technical specifications as our crafting processes evolve.',
      ],
    },
    {
      id: 'artisanal',
      num: '02',
      title: 'Artisanal Handcraft & Organic Calabash Nature',
      paragraphs: [
        'Every Gourd Shades lamp is individually handcrafted from real, sun-cured calabashes (Lagenaria siceraria) cultivated in Tanzania. Because gourds are naturally grown botanicals, no two lamps are ever completely identical in shape, wall thickness, or grain texture.',
        'Subtle organic surface marks, natural asymmetries, hand-perforated light patterns, and crystal bead placements are intentional hallmarks of artisanal work, not industrial manufacturing flaws. These organic nuances ensure each creation is genuinely one-of-a-kind.',
      ],
      highlight:
        'Organic Notice: Dimensions may vary within 1–3 cm and natural curvature gives each lamp its own unique silhouette and shadow projection profile.',
    },
    {
      id: 'electrical',
      num: '03',
      title: 'Electrical Fixtures & Bulb Safety Guidelines',
      paragraphs: [
        'Our handcrafted lamps are supplied with standard electrical fixtures (E27 or E14 sockets with CE-certified wiring options suitable for 110V–240V AC international domestic supplies).',
        'Because natural calabash gourds are dried organic wood-like shells, we strictly require the use of energy-efficient, low-heat LED bulbs (3W–10W). Traditional incandescent, halogen, or high-heat generating bulbs must never be used inside calabash lamps, as extreme heat may damage the organic shell.',
      ],
      highlight:
        'Strict Safety Requirement: Always use low-heat LED bulbs (maximum 10W recommended). Never leave lamps unattended with non-LED heat-generating bulbs.',
    },
    {
      id: 'availability',
      num: '04',
      title: 'Product Availability & Studio Commissions',
      paragraphs: [
        'Products showcased on our website are subject to availability. As an independent artisan studio, many lamps are crafted as unique individual pieces or in limited seasonal series. We reserve the right to modify, adjust, or discontinue any lamp model at any time without prior notice.',
        'For bespoke and made-to-order commissions, delivery schedules are estimated during direct consultation and depend upon botanical curing times and carving intricacy.',
      ],
    },
    {
      id: 'pricing',
      num: '05',
      title: 'Pricing & Order Clarification',
      paragraphs: [
        'In the event that an item is mistakenly listed with an incorrect price or specification due to typographical error, Gourd Shades reserves the right to decline or cancel pending inquiries for that piece.',
        'If a pricing discrepancy is identified after you submit an inquiry, our studio will reach out promptly to provide you with the correct details and give you the choice to proceed or cancel without penalty.',
      ],
    },
    {
      id: 'liability',
      num: '06',
      title: 'Limitation of Liability',
      paragraphs: [
        'Gourd Shades and its artisans shall not be held liable for any direct, indirect, incidental, or consequential damages resulting from the use or misuse of our website or the lighting products purchased through it.',
        'This includes, without limitation, damages resulting from improper electrical installation, using non-recommended high-heat bulbs, unapproved wiring alterations, or accidents caused by negligence in handling delicate artisanal glassware and carved gourds.',
      ],
    },
    {
      id: 'external-links',
      num: '07',
      title: 'External Links & Third-Party Platforms',
      paragraphs: [
        'Our website contains links to third-party services—including Instagram, Facebook, and WhatsApp. We do not control, endorse, or assume responsibility for the content, privacy practices, or availability of these external platforms.',
      ],
    },
  ]

  return (
    <main className="legal-page" data-logo-theme="white">
      <section className="page-intro legal-intro">
        <div className="page-intro-row">
          <MaskedHeading
            as="h1"
            lines={[
              <>Artisanal truths,</>,
              <><em>clearly told.</em></>,
            ]}
            stagger={0.12}
          />
          <MaskedParagraph
            delay={0.25}
            stagger={0.12}
            lines={[
              "Important information regarding the organic nature of handcrafted calabashes, electrical fixtures, website specifications, and studio sales.",
              "Please review these details to ensure safe and cherished enjoyment of our illumination pieces."
            ]}
          />
        </div>
      </section>

      {/* Quick Switcher Tabs */}
      <div className="legal-tabs-bar">
        <Link to="/privacy" className="legal-tab-btn">
          <ShieldCheck size={15} /> Privacy Policy
        </Link>
        <Link to="/disclaimer" className="legal-tab-btn active">
          <FileText size={15} /> Disclaimer
        </Link>
      </div>

      <div className="legal-layout">
        {/* Sticky Table of Contents & Studio Card */}
        <aside className="legal-sidebar">
          <div className="legal-toc">
            <span className="legal-toc-title">Disclaimer Sections</span>
            <ul className="legal-toc-list">
              {sections.map(s => (
                <li key={s.id} className="legal-toc-item">
                  <a href={`#${s.id}`}>
                    <span className="legal-toc-num">{s.num}</span>
                    <span>{s.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="legal-sidebar-card">
            <h4>Bespoke Technical Guidance</h4>
            <p>Need advice on bulb selection, custom voltages, or international shipping safety?</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link
                to="/contact"
                className="button-dark"
                style={{ minHeight: '42px', padding: '0 16px', fontSize: '11px' }}
              >
                Contact Our Studio <ArrowUpRight size={14} />
              </Link>
              <a
                href={`https://wa.me/${STUDIO_PHONE_RAW}?text=Hello%20Isaac,%20I%20have%20a%20technical%20or%20specifications%20question%20about%20your%20lamps.`}
                target="_blank"
                rel="noopener noreferrer"
                className="button-whatsapp"
                style={{ minHeight: '42px', padding: '0 16px', fontSize: '11px', justifyContent: 'center' }}
              >
                <MessageCircle size={14} /> Chat with Artisan
              </a>
            </div>
          </div>
        </aside>

        {/* Disclaimer Content Articles */}
        <div className="legal-content">
          {sections.map(s => (
            <ScrollFadeReveal key={s.id} delay={0.05}>
              <article id={s.id} className="legal-section-card">
                <div className="legal-section-header">
                  <span className="legal-section-badge">{s.num}</span>
                  <h3>{s.title}</h3>
                </div>
                {s.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
                {s.highlight && (
                  <div className="legal-highlight-box">
                    <p>{s.highlight}</p>
                  </div>
                )}
              </article>
            </ScrollFadeReveal>
          ))}

          <div className="legal-footer-meta">
            <span>Last updated: October 2025 &nbsp;•&nbsp; Arusha, Tanzania</span>
            <Link to="/products" className="button-outline" style={{ minHeight: '40px', padding: '0 16px' }}>
              Back to Collection <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}


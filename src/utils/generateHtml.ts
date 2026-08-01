import { SHORTCUT_CATEGORIES } from '../data/shortcuts';
import { ShortcutCategory } from '../types';

export function generateStandaloneHtml(categories: ShortcutCategory[] = SHORTCUT_CATEGORIES): string {
  const categoriesHtml = categories.map((cat) => {
    const isLogic = cat.id === 'logic';
    const itemsHtml = cat.shortcuts
      .map((item) => {
        const keyBadges = item.keys
          .map((k) => {
            if (k === '/' || k === 'nebo') {
              return `<span class="sep">${k}</span>`;
            }
            return `<kbd>${k}</kbd>`;
          })
          .join('');

        return `
        <div class="shortcut-row">
          <span class="shortcut-label">${item.label}</span>
          <div class="keys">${keyBadges}</div>
        </div>`;
      })
      .join('');

    const proTipHtml = isLogic
      ? `
      <div class="pro-tip-box">
        <div class="pro-tip-icon">LP</div>
        <div>
          <div class="pro-tip-title">PRO TIP</div>
          <div class="pro-tip-text">Klávesa <kbd>?</kbd> otevře Quick Help okno pro nástroj pod kurzorem.</div>
        </div>
      </div>`
      : '';

    return `
      <div class="bento-card" style="border-left: 4px solid ${cat.accentColor};">
        <div>
          <div class="category-title" style="color: ${cat.accentColor};">
            <span>●</span> ${cat.title}
          </div>
          <div class="shortcuts-list">
            ${itemsHtml}
          </div>
        </div>
        ${proTipHtml}
      </div>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>macOS & Logic Pro - Master Cheat Sheet</title>
  <style>
    /* Reset & Page Setup */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    @page {
      size: A4 portrait;
      margin: 0;
    }

    body {
      background-color: #16161A;
      color: #F2F2F7;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px 0;
    }

    /* Strict A4 Container */
    .a4-sheet {
      width: 210mm;
      height: 297mm;
      background: #16161A;
      padding: 10mm 12mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1);
      overflow: hidden;
      border-radius: 8px;
    }

    /* Header Styling */
    .header {
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
      padding-bottom: 5mm;
      margin-bottom: 5mm;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .header-left h1 {
      font-size: 20pt;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: #FFFFFF;
      margin-bottom: 1mm;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .header-left h1 .sub {
      color: #8E8E93;
      font-weight: 300;
    }

    .header-left p {
      font-size: 9.5pt;
      color: #8E8E93;
      font-weight: 500;
    }

    .header-badge {
      display: flex;
      align-items: center;
      gap: 6px;
      background: #25252D;
      padding: 4px 12px;
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
    .dot-red { background: #FF5F56; }
    .dot-yellow { background: #FFBD2E; }
    .dot-green { background: #27C93F; }

    .badge-text {
      font-size: 8pt;
      font-weight: 600;
      color: #8E8E93;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-left: 4px;
    }

    /* Grid Layout: 3 Columns Bento Grid */
    .grid-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 4.5mm;
      flex-grow: 1;
    }

    /* Bento Card Styling */
    .bento-card {
      background: rgba(37, 37, 45, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 3.5mm 4mm;
      backdrop-filter: blur(10px);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    }

    .category-title {
      font-size: 8.5pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 3mm;
      padding-bottom: 2mm;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .shortcuts-list {
      display: flex;
      flex-direction: column;
      gap: 1.8mm;
    }

    /* Shortcut Row */
    .shortcut-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.03);
    }

    .shortcut-label {
      font-size: 8.2pt;
      color: rgba(255, 255, 255, 0.85);
      font-weight: 500;
    }

    .keys {
      display: flex;
      align-items: center;
      gap: 3px;
    }

    .sep {
      font-size: 7.5pt;
      color: #8E8E93;
      padding: 0 1px;
    }

    /* Keycaps */
    kbd {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 18px;
      height: 18px;
      padding: 0 5px;
      font-size: 8pt;
      font-weight: 600;
      line-height: 1;
      color: #E0E0E0;
      background: linear-gradient(180deg, #2D2D35 0%, #1A1A20 100%);
      border: 1px solid #44444A;
      border-radius: 4px;
      box-shadow: 0 1px 1px rgba(0,0,0,0.5);
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
      white-space: nowrap;
    }

    /* Pro Tip Box */
    .pro-tip-box {
      margin-top: 3mm;
      padding-top: 2mm;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(0, 0, 0, 0.3);
      padding: 6px 10px;
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }

    .pro-tip-icon {
      width: 24px;
      height: 24px;
      border-radius: 6px;
      background: #FFD60A;
      color: #000;
      font-weight: 800;
      font-size: 8pt;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .pro-tip-title {
      font-size: 7pt;
      font-weight: 700;
      color: #FFD60A;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .pro-tip-text {
      font-size: 7.5pt;
      color: #8E8E93;
      line-height: 1.2;
    }

    /* Footer Styling */
    .footer {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 3mm;
      margin-top: 3mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 7.5pt;
      color: #636366;
    }

    .footer-left {
      display: flex;
      gap: 12px;
    }

    .footer-left span {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    /* Print Specific Rules */
    @media print {
      html, body {
        background: #16161A !important;
        padding: 0 !important;
        margin: 0 !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      .a4-sheet {
        box-shadow: none !important;
        border: none !important;
        border-radius: 0 !important;
        margin: 0 !important;
        width: 210mm !important;
        height: 297mm !important;
        page-break-after: avoid !important;
        page-break-inside: avoid !important;
      }
    }
  </style>
</head>
<body>

  <div class="a4-sheet">
    <!-- Header -->
    <header class="header">
      <div class="header-left">
        <h1> macOS & Logic Pro <span class="sub">— Master Cheat Sheet</span></h1>
        <p>Rychlý přehled klávesových zkratek pro efektivnější práci</p>
      </div>
      <div class="header-badge">
        <span class="dot dot-red"></span>
        <span class="dot dot-yellow"></span>
        <span class="dot dot-green"></span>
        <span class="badge-text">Bento A4</span>
      </div>
    </header>

    <!-- Main Grid Content -->
    <main class="grid-container">
      ${categoriesHtml}
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-left">
        <span><kbd>⌘</kbd> Command</span>
        <span><kbd>⌥</kbd> Option</span>
        <span><kbd>⇧</kbd> Shift</span>
        <span><kbd>⌃</kbd> Control</span>
      </div>
      <div class="footer-right">
        <span>A4 Portrait Bento Layout • Print Ready</span>
      </div>
    </footer>
  </div>

</body>
</html>`;
}


// Control UI tests cover the PASO working spark's optical alignment.
import { chromium, type Browser } from "playwright";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { readStyleSheet } from "../../../../test/helpers/ui-style-fixtures.js";
import {
  canRunPlaywrightChromium,
  resolvePlaywrightChromiumExecutablePath,
} from "../../test-helpers/control-ui-e2e.ts";

const chromiumExecutablePath = resolvePlaywrightChromiumExecutablePath(chromium.executablePath());
const describeBrowser = canRunPlaywrightChromium(chromiumExecutablePath) ? describe : describe.skip;

const spark = `
  <svg viewBox="0 0 24 24">
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
  </svg>`;

describeBrowser("working spark browser layout", () => {
  let browser: Browser;

  beforeAll(async () => {
    browser = await chromium.launch({ executablePath: chromiumExecutablePath, headless: true });
  });

  afterAll(async () => {
    await browser?.close();
  });

  it("centers the spark when grouped chat styles load after the indicator styles", async () => {
    const page = await browser.newPage({ viewport: { width: 640, height: 240 } });
    try {
      const css = [
        "ui/src/styles/base.css",
        "ui/src/styles/components.css",
        "ui/src/styles/chat/tool-cards.css",
        // Production code splitting can attach grouped chat CSS after the
        // indicator chunk. The centering invariant must not depend on order.
        "ui/src/styles/chat/grouped.css",
      ]
        .map((file) => readStyleSheet(file))
        .join("\n");
      await page.setContent(`<!doctype html><html><head><style>${css}</style></head><body>
        <div class="chat-group assistant chat-group--working">
          <div class="chat-working-indicator">
            <div class="chat-bubble chat-reading-indicator">${spark}</div>
            <span class="chat-working-indicator__status">
              <span class="chat-working-indicator__elapsed">8s</span><span>·</span><span>72 tokens</span>
            </span>
          </div>
        </div>
      </body></html>`);

      const geometry = await page.evaluate(() => {
        const center = (selector: string) => {
          const bounds = document.querySelector(selector)!.getBoundingClientRect();
          return bounds.top + bounds.height / 2;
        };
        const svg = document.querySelector<SVGElement>(".chat-reading-indicator svg")!;
        return {
          display: getComputedStyle(document.querySelector(".chat-reading-indicator")!).display,
          layoutCenter: center(".chat-reading-indicator"),
          paintedCenter: center(".chat-reading-indicator svg"),
          statusCenter: center(".chat-working-indicator__status"),
          translate: getComputedStyle(svg).translate,
        };
      });

      // As a flex item, inline-flex is blockified to flex in computed style.
      expect(geometry.display).toBe("flex");
      expect(geometry.layoutCenter).toBeCloseTo(geometry.statusCenter, 3);
      expect(geometry.paintedCenter).toBeCloseTo(geometry.statusCenter, 3);
      expect(geometry.translate).toBe("none");
    } finally {
      await page.close();
    }
  });
});

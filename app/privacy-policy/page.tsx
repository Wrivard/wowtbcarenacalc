import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${SITE_NAME}: what data we collect through cookies, Google AdSense, and Google Analytics, and how to opt out.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="July 18, 2026">
      <p>
        {SITE_NAME} (&quot;the Site&quot;, {SITE_URL}) is a free, client-side
        calculator. All arena point calculations happen in your browser —
        the ratings you type are never sent to our servers, and we do not
        operate any backend or database.
      </p>

      <h2>What we collect</h2>
      <p>
        The Site uses Google&apos;s <strong>Consent Mode</strong>. Before you
        make a choice, and if you decline, Google Analytics runs in a{" "}
        <strong>cookieless</strong> state: it stores nothing on your device and
        cannot recognise you across visits or across sites. It reports only
        anonymous, aggregate signals such as the page being viewed. Accepting
        allows cookies, which is what lets us tell a returning visitor from a
        new one.
      </p>
      <p>
        No advertising is shown at all until you accept. The two third-party
        services involved:
      </p>
      <ul>
        <li>
          <strong>Google Analytics 4</strong> — anonymous usage statistics
          (pages viewed, scroll depth, approximate location at city level,
          device type, and coarse-grained calculator usage events). We use this
          to understand which features are useful. IP addresses are processed
          by Google; see{" "}
          <a
            href="https://policies.google.com/privacy"
            rel="noopener noreferrer"
            target="_blank"
          >
            Google&apos;s Privacy Policy
          </a>
          .
        </li>
        <li>
          <strong>Google AdSense</strong> — displays the ads that keep this
          tool free. Google and its partners may use advertising cookies to
          personalize ads based on your browsing. You can control ad
          personalization at{" "}
          <a
            href="https://adssettings.google.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Google Ads Settings
          </a>
          .
        </li>
      </ul>
      <p>
        If you <strong>decline</strong>, AdSense does not load, no ads are
        shown, and <strong>no third-party cookies are set</strong> — Analytics
        stays in the cookieless state described above. Your consent choice
        itself is stored in your browser&apos;s localStorage (a strictly
        functional use).
      </p>

      <h2>How to opt out or change your mind</h2>
      <ul>
        <li>
          Click <strong>&quot;Cookie settings&quot;</strong> in the footer at
          any time to reopen the consent banner and change your choice.
        </li>
        <li>
          Opt out of Google Analytics globally with the{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            rel="noopener noreferrer"
            target="_blank"
          >
            GA opt-out browser add-on
          </a>
          .
        </li>
        <li>
          Opt out of personalized advertising at{" "}
          <a
            href="https://adssettings.google.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            adssettings.google.com
          </a>{" "}
          or{" "}
          <a
            href="https://www.aboutads.info/choices"
            rel="noopener noreferrer"
            target="_blank"
          >
            aboutads.info/choices
          </a>
          .
        </li>
        <li>Clear your browser&apos;s cookies and site data to remove everything.</li>
      </ul>

      <h2>Data retention &amp; sharing</h2>
      <p>
        We do not sell, rent, or share any personal information — we never
        hold any. Analytics data is retained by Google under the standard GA4
        retention settings (14 months) and is only visible to the site
        operator in aggregate.
      </p>

      <h2>Children&apos;s privacy</h2>
      <p>
        The Site is not directed at children under 13 and does not knowingly
        collect personal information from anyone.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Reach out via the{" "}
        <Link href="/contact">contact page</Link>.
      </p>
    </LegalPage>
  );
}

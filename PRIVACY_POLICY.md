# Privacy Policy for Side Search Extension

**Last Updated:** November 16, 2025

---

## Introduction

Side Search ("the Extension", "we", "our") is a Chrome browser extension that provides AI-powered web search functionality through the Tavily Search API. This Privacy Policy explains how we collect, use, and protect your information when you use our Extension.

**Developer Contact:** Alen Hu (huhaoyue0220@126.com)

---

## Data Collection and Usage

### Information We Collect

#### 1. API Key Storage
- **What:** Your Tavily API key
- **How:** Stored locally in Chrome's sandboxed `chrome.storage.local`
- **Why:** Required to authenticate search requests to the Tavily API
- **Retention:** Stored indefinitely until you manually clear it via the Settings page

#### 2. Search Queries
- **What:** Text search queries you submit through the Extension
- **How:** Transmitted directly to Tavily's API via HTTPS
- **Why:** To retrieve AI-powered search results
- **Retention:** We do not store your search queries. Queries are only processed in real-time to display results. Refer to [Tavily's Privacy Policy](https://tavily.com/privacy) for their data handling practices.

#### 3. Search Topic Selection
- **What:** Your choice of search topic (General, News, or Finance)
- **How:** Used as a parameter in API requests
- **Why:** To provide contextually relevant search results
- **Retention:** Not stored; used only during the active search session

### Information We Do NOT Collect

We explicitly do NOT collect, store, or transmit:
- ❌ Personally identifiable information (PII)
- ❌ Browsing history
- ❌ Cookies or tracking data
- ❌ IP addresses
- ❌ Device information
- ❌ User analytics or telemetry
- ❌ Search history
- ❌ Any data from websites you visit

---

## How We Use Your Information

### Local Storage Only
- Your Tavily API key is stored **locally on your device** using Chrome's `chrome.storage.local` API
- The Extension does not transmit your API key to any server other than Tavily's official API endpoint
- No data is sent to the extension developer or any third-party analytics services

### Search Functionality
- When you perform a search:
  1. Your query and API key are sent directly to Tavily's API over HTTPS
  2. Search results are displayed in the Extension's side panel
  3. No search data is logged, cached, or stored by the Extension
  4. Results are cleared when you perform a new search

---

## Third-Party Services

### Tavily Search API
This Extension uses the Tavily Search API to provide search functionality. When you perform a search:

- **Data Shared with Tavily:**
  - Your search query
  - Your API key (for authentication)
  - Search topic selection (general/news/finance)
  - Search parameters (max results, include answer, include favicon)

- **Tavily's Data Handling:**
  - Tavily processes your queries according to their own Privacy Policy
  - We recommend reviewing [Tavily's Privacy Policy](https://tavily.com/privacy)
  - Your relationship with Tavily is governed by their terms of service

- **No Other Third Parties:**
  - The Extension does not integrate with any other third-party services
  - No analytics platforms (e.g., Google Analytics) are used
  - No advertising networks
  - No social media integrations

---

## Data Security

### Security Measures
- **HTTPS Only:** All API communications use secure HTTPS encryption
- **Sandboxed Storage:** Chrome's storage API provides built-in sandboxing and isolation
- **Password Field:** API key input fields use `type="password"` to prevent shoulder surfing
- **No Server Storage:** We do not operate any servers that store user data
- **Content Security Policy:** The Extension implements CSP headers as per Manifest V3 standards

### User Control
You have complete control over your data:
- **View API Key:** Access stored API key via the Settings page
- **Clear API Key:** Remove your API key at any time using the "Clear" button
- **Uninstall:** Removing the Extension deletes all local storage data

---

## Chrome Extension Permissions

The Extension requests the following permissions:

| Permission | Purpose | Data Access |
|------------|---------|-------------|
| `sidePanel` | Open and manage the browser side panel | No data access |
| `storage` | Store API key locally | Only stores your Tavily API key |
| `https://*/*` | Make HTTPS requests to Tavily API | Only used for Tavily API calls |

### Why We Need These Permissions
- **sidePanel:** Required to display the search interface in Chrome's side panel
- **storage:** Necessary to save your API key so you don't need to re-enter it every time
- **https://*/*:** Allows the Extension to communicate with Tavily's API endpoints

### What We DON'T Do With Permissions
- We do not access content from websites you visit
- We do not read, modify, or inject code into web pages
- We do not track your browsing activity
- We do not access your tabs or windows beyond opening the side panel

---

## Children's Privacy

The Extension is not directed to children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided information to the Extension, please contact us at huhaoyue0220@126.com.

---

## International Users

The Extension can be used globally. However, please note:
- Data is transmitted to Tavily's servers, which may be located in various jurisdictions
- Your use of the Extension is subject to Tavily's terms and data processing practices
- We do not transfer, store, or process any data ourselves

---

## Changes to This Privacy Policy

We may update this Privacy Policy from time to time. Changes will be reflected by updating the "Last Updated" date at the top of this policy. Significant changes will be communicated through:
- Update notes in the Chrome Web Store listing
- Extension description updates

We encourage you to review this Privacy Policy periodically.

---

## Your Rights

Depending on your jurisdiction, you may have rights including:

### Data Access and Deletion
- **Access:** Your API key is accessible via the Settings page
- **Deletion:** Use the "Clear" button in Settings, or uninstall the Extension
- **Portability:** Your API key can be copied and used elsewhere

### California Privacy Rights (CCPA)
If you are a California resident, you have the right to:
- Know what personal information is collected (API key only)
- Request deletion of your information (via the Clear button)
- Opt-out of sale of personal information (we do not sell any data)

### European Privacy Rights (GDPR)
If you are in the European Economic Area:
- **Legal Basis:** We process your API key based on your consent
- **Data Controller:** You control your API key data via the Settings page
- **Right to Withdraw Consent:** Clear your API key or uninstall the Extension at any time

---

## Data Retention and Deletion

### Automatic Deletion
Your data is automatically deleted when:
- You click the "Clear" button in Settings
- You uninstall the Extension
- You clear Chrome's extension data

### Manual Deletion
To manually delete all Extension data:
1. Open Chrome Settings → Privacy and Security → Site Settings → Extensions
2. Find "Side Search" and clear its data
3. Or simply uninstall the Extension from `chrome://extensions/`

---

## No Analytics or Tracking

We want to be explicitly clear:
- **No Google Analytics**
- **No user behavior tracking**
- **No error reporting services** (e.g., Sentry, Bugsnag)
- **No A/B testing**
- **No advertising trackers**
- **No fingerprinting**

The Extension operates entirely on your device and only communicates with Tavily's API for search functionality.

---

## Open Source Transparency

This Extension's source code is available at: [https://github.com/alen-hh/side-search](https://github.com/alen-hh/side-search)

You can:
- Review the source code to verify our privacy claims
- Audit data handling practices
- Report security issues via GitHub Issues

---

## Contact Us

If you have questions, concerns, or requests regarding this Privacy Policy or your data:

- **Email:** huhaoyue0220@126.com
- **GitHub Issues:** [https://github.com/alen-hh/side-search/issues](https://github.com/alen-hh/side-search/issues)
- **Chrome Web Store:** Use the support tab on the Extension's store listing

---

## Legal Compliance

### Cookie Policy
This Extension does not use cookies.

### Do Not Track
The Extension does not track users, so Do Not Track (DNT) signals are not applicable.

### Data Breach Notification
Since we do not collect or store personal data on our servers, there is no risk of a data breach from our end. Your API key stored locally is protected by Chrome's security architecture.

---

## Consent

By installing and using Side Search, you consent to:
- The local storage of your Tavily API key on your device
- The transmission of your search queries to Tavily's API
- The terms outlined in this Privacy Policy

You may withdraw consent at any time by:
- Clearing your API key via Settings
- Uninstalling the Extension

---

## Third-Party Links

Search results contain links to external websites. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review the privacy policies of any websites you visit through search results.

---

## Limitation of Liability

The Extension is provided "as is" without warranties. We are not liable for:
- Tavily API service availability or data handling
- Results accuracy or completeness
- Any damages arising from Extension use

---

## Governing Law

This Privacy Policy is governed by the laws of the jurisdiction where the developer resides, without regard to conflict of law principles.

---

## Summary (TL;DR)

✅ **We DO:**
- Store your API key locally on your device
- Send your queries to Tavily's API to get search results
- Use HTTPS for secure communication

❌ **We DON'T:**
- Collect personal information
- Track your browsing or searches
- Share data with third parties (except Tavily for search functionality)
- Use analytics or advertising
- Store data on remote servers

🔐 **Your Control:**
- You can clear your API key anytime
- Uninstalling removes all data
- Source code is open for audit

---

**For questions or concerns, contact:** huhaoyue0220@126.com

**Last Updated:** November 16, 2025


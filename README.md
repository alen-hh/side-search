# Side Search - AI-Powered Web Search Extension

<div align="center">

![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-brightgreen?logo=google-chrome)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)
![React](https://img.shields.io/badge/React-18.2-blue?logo=react)

A modern Chrome extension that brings AI-powered web search directly to your browser's side panel using the Tavily Search API.

[Features](#features) • [Installation](#installation) • [Usage](#usage) • [Development](#development) • [API Reference](#api-reference)

</div>

---

## 🌟 Features

### Core Capabilities
- 🔍 **AI-Powered Search** - Get intelligent, contextual search results with AI-generated answer summaries
- 🎯 **Multiple Search Categories** - Choose between General, News, and Finance search topics
- 📊 **Rich Results Display** - View up to 10 results with relevance scores, favicons, and content snippets
- ⚡ **Side Panel Integration** - Quick access via extension icon, doesn't interrupt your browsing flow
- 🎨 **Modern UI** - Clean, Google-style list interface with smooth hover effects
- 💾 **Persistent Settings** - API key stored securely in Chrome's local storage

### User Experience
- ⚙️ **Dedicated Settings Page** - Configure your Tavily API key in a separate options page
- 📝 **Smart Content Truncation** - Results limited to 100 characters for better readability
- 🌐 **Favicon Handling** - Automatic placeholder icons for sites without favicons
- ⌨️ **Form Validation** - Real-time error handling and helpful feedback
- 🔄 **Loading States** - Visual indicators during search operations

---

## 📦 Installation

### Prerequisites

- **Node.js** 18 or higher
- **pnpm** (recommended) or npm
- **Tavily API Key** - Get one free at [tavily.com](https://tavily.com)

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/side-search.git
cd side-search
```

2. **Install dependencies**
```bash
pnpm install
# or
npm install
```

3. **Start development server**
```bash
pnpm dev
# or
npm run dev
```

4. **Load extension in Chrome**
   - Open `chrome://extensions/` in Chrome
   - Enable **Developer mode** (toggle in top-right corner)
   - Click **Load unpacked**
   - Select the `build/chrome-mv3-dev` directory

---

## 🚀 Usage

### First-Time Setup

1. **Open the side panel**
   - Click the extension icon in your browser toolbar
   - The side panel will open on the right side

2. **Configure your API key** (one-time setup)
   - You'll see a warning: "⚠️ No API key configured"
   - Click **"Configure it now"** to open the settings page
   - Enter your Tavily API key
   - Click **"Save API Key"**

3. **Start searching!**
   - Return to the side panel
   - Enter your search query (up to 1000 characters)
   - Select a topic: General, News, or Finance
   - Click **Search**

### Search Topics

| Topic | Description | Best For |
|-------|-------------|----------|
| **General** | Broader, general-purpose searches | Research, information lookup, general questions |
| **News** | Real-time updates and current events | Breaking news, sports updates, trending topics |
| **Finance** | Financial news and market information | Stock prices, market analysis, economic news |

### Search Results

Each search provides:
- **AI Answer** - A concise, AI-generated summary answering your query
- **Top 10 Results** - Most relevant web pages with:
  - Numbered list position
  - Website favicon (or placeholder)
  - Page title (clickable link)
  - URL
  - Content snippet (max 100 characters)
  - Relevance score

### Accessing Settings

Multiple ways to open the Options page:
1. From side panel warning banner (when no API key configured)
2. From error messages (click "Open Settings")
3. Right-click extension icon → Select "Options"
4. Go to `chrome://extensions/` → Find "Side Search" → Click "Extension options"

---

## 🏗️ Project Structure

```
side-search/
├── src/
│   ├── background.ts          # Service worker - handles icon clicks
│   ├── sidepanel.tsx          # Main side panel UI (Query + Results)
│   ├── options.tsx            # Settings page for API key configuration
│   ├── style.css              # Global Tailwind CSS imports
│   ├── types/
│   │   └── tavily.ts          # TypeScript type definitions
│   └── utils/
│       └── tavily.ts          # Tavily API client functions
├── assets/
│   └── icon.png               # Extension icon (128x128)
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.js         # Tailwind CSS with plasmo- prefix
└── postcss.config.js          # PostCSS configuration
```

---

## 🛠️ Development

### Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | [Plasmo 0.90.5](https://docs.plasmo.com/) - Chrome extension framework |
| **UI Library** | React 18.2 with TypeScript 5.3 |
| **Styling** | Tailwind CSS 3.4.1 with `plasmo-` prefix |
| **API** | [Tavily Search API](https://tavily.com) |
| **Manifest** | Chrome Extension Manifest V3 |

### Available Scripts

```bash
# Development mode with HMR
pnpm dev

# Production build
pnpm build

# Package for distribution
pnpm package
```

### Building for Production

```bash
pnpm build
```

This creates an optimized production bundle in `build/chrome-mv3-prod/` ready for publishing to the Chrome Web Store.

### Hot Module Replacement

The development server supports HMR. Changes to source files automatically reload the extension:
- **React components** - Hot reload without losing state
- **TypeScript files** - Recompile and reload
- **CSS** - Update styles instantly

### Chrome Extension Permissions

| Permission | Purpose |
|------------|---------|
| `sidePanel` | Required to open and manage the side panel |
| `storage` | Store API key in Chrome's local storage |
| `https://*/*` | Make requests to Tavily API |

---

## 📚 API Reference

### API Configuration

The extension uses the Tavily Search API with these parameters:

```typescript
{
  query: string,           // User's search query
  topic: SearchTopic,      // "general" | "news" | "finance"
  max_results: 10,         // Fixed at 10 results
  include_answer: true,    // Always include AI answer
  include_favicon: true    // Show website favicons
}
```

### Type Definitions

```typescript
// Search request
interface SearchRequest {
  query: string
  topic?: SearchTopic
  max_results?: number
  include_answer?: boolean | "basic" | "advanced"
  include_favicon?: boolean
}

// Search response
interface SearchResponse {
  query: string
  answer?: string
  results: SearchResult[]
  response_time: number
}

// Individual result
interface SearchResult {
  title: string
  url: string
  content: string
  score: number
  favicon?: string
}
```

---

## 🔐 Security & Privacy

- **Local Storage**: API key stored securely in Chrome's sandboxed local storage
- **No Data Collection**: Extension doesn't collect or transmit user data
- **Secure API Calls**: All requests made over HTTPS
- **Password Masking**: API key input uses password field type
- **User Control**: API key can be cleared at any time

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Credits

- **Built with**: [Plasmo](https://www.plasmo.com) - The browser extension framework
- **Powered by**: [Tavily Search API](https://tavily.com) - AI search infrastructure
- **Icons**: Globe icon from [Heroicons](https://heroicons.com)
- **Author**: Alen Hu (huhaoyue0220@126.com)

---

## 📮 Support

### Frequently Asked Questions

#### Do I need to pay for the Tavily API?
Tavily offers a free tier with monthly API credits. You can upgrade to a paid plan for more credits. Visit [tavily.com](https://tavily.com) for pricing details.

#### Is my API key secure?
Yes. Your API key is stored locally in Chrome's sandboxed storage and is never transmitted to any server except Tavily's API when making search requests.

#### Can I use this extension on other browsers?
Currently, this extension is built for Chromium-based browsers (Chrome, Edge, Brave, etc.). Firefox support would require modifications.

#### How many search results can I get?
The extension is configured to return 10 results per search. This is a fixed setting optimized for the side panel interface.

#### Can I change the search result limit?
Yes, you can modify the `max_results` parameter in `src/sidepanel.tsx` line 51-52, but note that more results may affect performance and UI layout.

#### Does this extension track my searches?
No. The extension does not collect, store, or transmit your search queries except to Tavily's API for processing. No analytics or tracking is implemented.

---

## 🌟 Star History

If you find this project helpful, please consider giving it a star! ⭐

---

<div align="center">

Made with ❤️ using Plasmo and Tavily

[Report Bug](https://github.com/yourusername/side-search/issues) • [Request Feature](https://github.com/yourusername/side-search/issues)

</div>

# Side Search - AI-Powered Web Search Extension

A Chrome extension that provides AI-powered web search through a convenient side panel, powered by [Tavily Search API](https://tavily.com).

## Features

- 🔍 **AI-Powered Search**: Get intelligent search results with AI-generated answers
- 🎯 **Multiple Search Topics**: Search across General, News, and Finance categories
- 📊 **Rich Results**: View top 10 results with relevance scores and favicons
- 🎨 **Modern UI**: Clean, responsive interface with smooth transitions
- ⚡ **Side Panel Access**: Quick access via extension icon click

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm (or npm)
- A Tavily API key ([get one here](https://tavily.com))

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd side-search
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. (Optional) Set up your Tavily API key in environment:
```bash
cp .env.example .env
# Edit .env and add your Tavily API key
```

4. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

5. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `build/chrome-mv3-dev` directory

### Usage

1. Click the extension icon in your browser toolbar to open the side panel
2. Enter your Tavily API key (if not set via environment variable)
3. Enter your search query (up to 1000 characters)
4. Select a search topic:
   - **General**: Broader, general-purpose searches
   - **News**: Real-time updates and current events
   - **Finance**: Financial news and market information
5. Click "Search" to get AI-powered results
6. View the AI-generated answer and browse top 10 search results
7. Click "New Search" to perform another search

## Project Structure

```
side-search/
├── src/
│   ├── background.ts          # Background service worker
│   ├── sidepanel.tsx          # Main side panel UI component
│   ├── content.tsx            # Content script (if needed)
│   ├── style.css              # Global styles
│   ├── types/
│   │   └── tavily.ts          # TypeScript types for Tavily API
│   └── utils/
│       └── tavily.ts          # Tavily API integration
├── assets/
│   └── icon.png               # Extension icon
├── package.json
└── README.md
```

## Making production build

Run the following:

```bash
pnpm build
# or
npm run build
```

This creates a production bundle in the `build/chrome-mv3-prod` directory, ready to be zipped and published to the Chrome Web Store.

## Tech Stack

- **Framework**: [Plasmo](https://docs.plasmo.com/) - Chrome extension framework
- **UI**: React 18 with TypeScript
- **Styling**: Inline styles (avoids Tailwind prefix issues)
- **API**: [Tavily Search API](https://tavily.com) - AI-powered search
- **Manifest**: Chrome Extension Manifest V3

## API Configuration

The extension uses the Tavily Search API with the following configuration:
- `max_results`: 10 search results per query
- `include_answer`: AI-generated answer included
- `include_favicon`: Website favicons included
- `search_depth`: Basic (configurable)

## Development

### Hot Reload
The extension supports hot module replacement (HMR) during development. Changes to source files will automatically reload the extension.

### Project Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Package for distribution
pnpm package
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Credits

- Built with [Plasmo](https://www.plasmo.com)
- Powered by [Tavily Search API](https://tavily.com)

## Support

For issues and feature requests, please [open an issue](https://github.com/yourusername/side-search/issues) on GitHub.

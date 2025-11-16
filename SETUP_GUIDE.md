# Setup Guide - Side Search Extension

## Quick Start

### 1. Install Dependencies
```bash
pnpm install
# or
npm install
```

### 2. Start Development Server
```bash
pnpm dev
# or
npm run dev
```

### 3. Load Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in the top-right corner)
3. Click **Load unpacked**
4. Select the `build/chrome-mv3-dev` directory from your project folder
5. The extension icon should appear in your browser toolbar

### 4. Using the Extension

1. **Click the extension icon** - This will open the side panel
2. **Configure your API key** (first time only):
   - You'll see a warning: "⚠️ No API key configured"
   - Click **"Configure it now"** to open the Options page
   - Enter your Tavily API key (get one free at [tavily.com](https://tavily.com))
   - Click **"Save API Key"**
   - The key is saved locally in Chrome storage
3. **Return to the side panel** (close and reopen if needed)
4. **Enter a search query** (up to 1000 characters)
5. **Select a topic**:
   - **General**: Broader searches (default)
   - **News**: Current events and news
   - **Finance**: Financial and market information
6. **Click Search** to get results
7. **View results**:
   - AI-generated answer summary
   - Top 10 relevant search results with relevance scores
   - Click any result to open in a new tab

## Accessing the Options Page

There are multiple ways to access the Options/Settings page:

1. **From the side panel**: Click "Configure it now" in the warning banner
2. **From Chrome extensions**: 
   - Go to `chrome://extensions/`
   - Find "Side search"
   - Click "Details"
   - Click "Extension options"
3. **Right-click the extension icon**: Select "Options"

## Features

### Options Page (Settings)
- API key configuration
- Secure local storage
- Save/Clear functionality
- Visual feedback on save
- Information about Tavily API
- Direct links to Tavily documentation

### Query Page
- Warning banner when API key not configured
- Quick link to open Options page
- Search query input with character counter (max 1000)
- Topic selection via radio buttons
- Form validation and error handling
- Loading state with spinner

### Result Page
- "New Search" button to go back
- Query summary with result count and response time
- AI-generated answer in highlighted box
- 10 search results with:
  - Website favicon
  - Title (clickable link)
  - URL
  - Content snippet
  - Relevance score percentage

## API Configuration

The extension automatically configures these Tavily API parameters:
- `max_results`: 10
- `include_answer`: true
- `include_favicon`: true
- `search_depth`: basic

## Storage

The extension uses Chrome's `storage.local` API to:
- Save your Tavily API key for convenience
- You only need to enter it once

## Troubleshooting

### Extension doesn't load
- Make sure you're loading the `build/chrome-mv3-dev` directory, not the root
- Ensure the development server (`pnpm dev`) is running

### API errors
- Verify your API key is correct
- Check you have remaining API credits at [tavily.com](https://tavily.com)
- Ensure you have an internet connection

### Side panel doesn't open
- Make sure you've removed or renamed any `popup.tsx` file
- Verify the `background.ts` file exists with the correct click handler
- Try reloading the extension at `chrome://extensions/`

## Development

### File Structure
```
src/
├── background.ts          # Handles icon click to open side panel
├── sidepanel.tsx          # Main UI component (Query + Result pages)
├── options.tsx            # Options/Settings page for API key configuration
├── content.tsx            # Content script (unused for now)
├── style.css              # Global styles
├── types/
│   └── tavily.ts          # TypeScript types for Tavily API
└── utils/
    └── tavily.ts          # Tavily API client function
```

### Hot Reload
The extension supports hot module replacement. Changes to source files will automatically reload the extension during development.

### Building for Production
```bash
pnpm build
# or
npm run build
```

This creates a production bundle in `build/chrome-mv3-prod/` ready for publishing.

## Next Steps

- Add keyboard shortcuts
- Implement search history
- Add export/share functionality
- Support for multiple languages
- Dark mode support
- Advanced search filters

## Support

For issues, please check:
1. [Plasmo Documentation](https://docs.plasmo.com/)
2. [Tavily API Documentation](https://tavily.com/docs)
3. Chrome Extension [Developer Documentation](https://developer.chrome.com/docs/extensions/)


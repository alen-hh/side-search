# Side Search Extension - UI Overview

## Query Page (Search Form)

The query page features a clean, modern interface with the following elements:

### Header
- **Title**: "Web Search" in large, bold text
- **Subtitle**: "Search the web using Tavily AI-powered search"

### Form Fields

#### 1. Tavily API Key
- Password input field
- Placeholder: "tvly-YOUR_API_KEY"
- Help text: "Get your API key from tavily.com" (clickable link)
- Saved to Chrome storage for future use

#### 2. Search Query
- Large textarea (4 rows)
- Max length: 1000 characters
- Character counter (e.g., "0/1000")
- Placeholder: "What would you like to search for?"
- Required field (marked with red asterisk)

#### 3. Topic Selection
- Radio buttons with descriptions
- **General** (default)
  - "Broader, general-purpose searches"
- **News**
  - "Real-time updates and current events"
- **Finance**
  - "Financial news and market information"

#### 4. Submit Button
- Full-width blue button
- Text: "Search"
- Shows spinner and "Searching..." during loading
- Disabled state while loading

### Error Display
- Red-tinted box showing error messages
- Appears above the submit button when needed

---

## Result Page

The result page displays search results in a structured, easy-to-read format:

### Header
- **"New Search" button** (top-left, with back arrow icon)
- **Query display card**
  - Shows the original search query
  - Displays result count and response time
  - Example: "Found 10 results in 1.23s"

### AI Answer Section (if available)
- Highlighted gradient box (blue tint)
- Lightning bolt icon
- "AI Answer" heading
- AI-generated summary of the search query

### Search Results
- **"Top Results" heading**
- Cards for each of the 10 results:
  - Website favicon (16x16 icon)
  - Result title (blue, clickable link)
  - Full URL (small, gray text)
  - Content snippet (2-3 sentences)
  - Relevance score (e.g., "Relevance: 85%")
  - Eye icon next to relevance score

### Empty State
- Shown if no results found
- Sad face icon
- "No results found" message

---

## Design Features

### Colors
- **Primary**: Blue (#2563eb)
- **Background**: Light gray (#f9fafb)
- **Cards**: White with subtle shadows
- **Text**: Dark gray (#111827) for headings, medium gray for body
- **Error**: Red (#991b1b) on light red background

### Typography
- **Font**: Inter, system-ui, sans-serif
- **Headings**: Bold weight
- **Body**: Regular weight
- **Small text**: 0.75rem (12px)
- **Body text**: 0.875rem (14px)
- **Headings**: 1.125rem - 1.5rem (18px - 24px)

### Layout
- **Max width**: 42rem (672px) for query page, 56rem (896px) for results
- **Padding**: 1.5rem (24px) on all containers
- **Spacing**: Consistent 1rem - 1.5rem between elements
- **Border radius**: 0.5rem (8px) for rounded corners

### Interactions
- Smooth hover effects on links
- Button hover state (darker blue)
- Loading spinner animation
- Form validation feedback
- Responsive layout

---

## User Flow

1. User clicks extension icon → Side panel opens with Query page
2. User enters (or API key loads from storage)
3. User types search query
4. User selects topic (optional, defaults to "General")
5. User clicks "Search" button
6. Loading state shows "Searching..." with spinner
7. Results page displays with AI answer and search results
8. User clicks on results to open in new tabs
9. User clicks "New Search" to return to Query page

---

## Technical Implementation

### State Management
- React hooks (useState, useEffect)
- Chrome storage API for persistence
- Two-page navigation (query/result)

### API Integration
- Tavily Search API
- Error handling for API failures
- Loading states

### Styling
- Inline styles (no external CSS frameworks)
- Responsive design
- Accessible color contrast
- Clean, modern aesthetic

---

## Accessibility
- Semantic HTML elements
- Clear labels for form inputs
- Focus states for interactive elements
- Error messages clearly displayed
- High contrast text

---

## Browser Compatibility
- Chrome (Manifest V3)
- Chromium-based browsers (Edge, Brave, etc.)


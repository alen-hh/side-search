# Testing Checklist - Side Search Extension

## Pre-Flight Checks

- [x] Dependencies installed (`pnpm install`)
- [x] Development server running (`pnpm dev`)
- [x] Build directory created (`build/chrome-mv3-dev/`)
- [x] Manifest V3 configured correctly
- [x] Side panel permission added
- [x] Storage permission added
- [x] Background service worker configured
- [x] Icon click opens side panel (not popup)

## Code Structure

- [x] `src/types/tavily.ts` - TypeScript types defined
- [x] `src/utils/tavily.ts` - API client function created
- [x] `src/sidepanel.tsx` - Main UI component with 2 pages
- [x] `src/background.ts` - Click handler for side panel
- [x] `src/style.css` - Global styles

## Feature Testing

### Query Page
- [ ] Page loads without errors
- [ ] API key input field works
- [ ] API key saves to Chrome storage
- [ ] Search query textarea works
- [ ] Character counter shows (0/1000)
- [ ] Character limit enforced (max 1000)
- [ ] Topic radio buttons work
  - [ ] General (default selected)
  - [ ] News
  - [ ] Finance
- [ ] Form validation works
  - [ ] Error shown if query is empty
  - [ ] Error shown if API key is empty
- [ ] Search button works
- [ ] Loading state shows during search
  - [ ] Spinner animation visible
  - [ ] Button text changes to "Searching..."
  - [ ] Button disabled during search

### Result Page
- [ ] Page renders after successful search
- [ ] "New Search" button works
- [ ] Query summary displays correctly
- [ ] Result count shows
- [ ] Response time displays
- [ ] AI Answer section appears (if available)
  - [ ] Lightning bolt icon visible
  - [ ] Answer text readable
- [ ] Search results display (up to 10)
  - [ ] Favicon shows (if available)
  - [ ] Title is clickable link
  - [ ] URL displays correctly
  - [ ] Content snippet shows
  - [ ] Relevance score displays as percentage
- [ ] Clicking result opens in new tab
- [ ] Empty state shows if no results

### Error Handling
- [ ] Invalid API key shows error
- [ ] Network errors handled gracefully
- [ ] API rate limit errors shown
- [ ] Error messages are user-friendly

### Storage
- [ ] API key persists after closing side panel
- [ ] API key loads on next open
- [ ] No errors in Chrome console

## Browser Testing

### Extension Installation
- [ ] Extension loads in Chrome
- [ ] Icon appears in toolbar
- [ ] Clicking icon opens side panel (not popup)
- [ ] Side panel opens on right side of browser

### Permissions
- [ ] Storage permission granted
- [ ] Side panel permission granted
- [ ] Host permissions for API calls granted

### Console
- [ ] No errors in extension console
- [ ] No errors in side panel console
- [ ] No errors in background service worker

## API Integration

### Tavily API
- [ ] API endpoint correct (https://api.tavily.com/search)
- [ ] Request body formatted correctly
  - [ ] `api_key` field present
  - [ ] `query` field present
  - [ ] `topic` field present
  - [ ] `max_results` = 10
  - [ ] `include_answer` = true
  - [ ] `include_favicon` = true
- [ ] Response parsed correctly
- [ ] All fields mapped properly

### API Response Handling
- [ ] `query` field extracted
- [ ] `answer` field extracted (optional)
- [ ] `results` array extracted
  - [ ] `title` displayed
  - [ ] `url` displayed and clickable
  - [ ] `content` displayed
  - [ ] `score` converted to percentage
  - [ ] `favicon` displayed (optional)
- [ ] `response_time` displayed

## UI/UX Testing

### Visual Design
- [ ] Clean, modern interface
- [ ] Consistent spacing and padding
- [ ] Proper color contrast
- [ ] Buttons have hover states
- [ ] Links have hover states
- [ ] Forms are well-aligned
- [ ] Typography is readable

### Responsiveness
- [ ] Layout works at different side panel widths
- [ ] Text doesn't overflow
- [ ] Images don't break layout
- [ ] Scrolling works properly

### User Experience
- [ ] Smooth navigation between pages
- [ ] Clear call-to-action buttons
- [ ] Helpful error messages
- [ ] Loading states are obvious
- [ ] No confusing UI elements

## Performance

- [ ] Initial load is fast
- [ ] Search completes in reasonable time
- [ ] No memory leaks (check Chrome Task Manager)
- [ ] Smooth animations
- [ ] No janky scrolling

## Documentation

- [x] README.md updated
- [x] SETUP_GUIDE.md created
- [x] UI_OVERVIEW.md created
- [x] Code comments present
- [x] API documented

## Production Build

- [ ] Production build created (`pnpm build`)
- [ ] Build directory created (`build/chrome-mv3-prod/`)
- [ ] Extension loads from production build
- [ ] All features work in production build
- [ ] No console errors in production
- [ ] Manifest correct in production

## Known Issues

(List any issues found during testing)

- None currently

## Notes

(Add any additional notes or observations)

---

## Sign-off

- [ ] All critical features tested
- [ ] All blockers resolved
- [ ] Extension ready for use
- [ ] Documentation complete

Tested by: _________________
Date: _________________


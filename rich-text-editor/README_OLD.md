# Professional Rich Text Editor (RCE)

A modern, feature-rich, and completely redesigned React rich text editor built with TipTap, designed for professional content creation with a beautiful UI and extensive functionality.

## ✨ What's New - Complete Professional Redesign

This editor has been completely transformed from a basic implementation to a **professional-grade rich text editor** with:

### 🎨 **Modern Design System**
- **Professional UI/UX** - Clean, modern interface inspired by leading text editors
- **Dark/Light Theme Support** - Seamless theme switching with proper contrast
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Accessibility First** - Full keyboard navigation and screen reader support
- **CSS Variables** - Extensive theming system with customizable color palettes

### 🚀 **Enhanced Features**
- **Bubble Menu** - Context-sensitive formatting toolbar that appears when text is selected
- **Floating Menu** - Insert menu that appears on empty lines for quick content addition
- **Professional Modals** - Beautiful dialogs for links, images, and tables with advanced options
- **Character Counter** - Real-time character counting with visual warnings
- **Fullscreen Mode** - Distraction-free editing experience
- **Keyboard Shortcuts** - Full keyboard shortcut support (Ctrl+B, Ctrl+I, etc.)

### 📝 **Advanced Formatting**
- **Heading Levels (H1-H6)** - Comprehensive heading hierarchy
- **Font Controls** - Font family and size selection
- **Advanced Colors** - Professional color picker with preset palette
- **Superscript/Subscript** - Mathematical and scientific notation support
- **Code Highlighting** - Syntax-highlighted code blocks
- **Smart Typography** - Auto-formatting for quotes, dashes, and more

### 🔧 **Professional Tools**
- **Advanced Image Insertion** - URL, alt text, title, dimensions, and alignment options
- **Smart Link Creation** - Link text, title, and target options
- **Interactive Tables** - Visual table creation with preview and header options
- **Flexible Toolbars** - Top, bottom, both, or no toolbar configurations
- **Loading States** - Professional loading indicators

## 🛠 Installation

```bash
npm install devi-rce
# or
yarn add devi-rce
```

## 📖 Basic Usage

```tsx
import React, { useState } from 'react';
import { RichTextEditor } from 'devi-rce';

function App() {
  const [content, setContent] = useState('<p>Start writing...</p>');

  return (
    <RichTextEditor 
      content={content}
      onChange={setContent}
      placeholder="Start typing to experience the professional editor..."
      theme="light"
      height="400px"
    />
  );
}
```

## 🎯 Professional Configuration

### Full-Featured Editor
```tsx
<RichTextEditor 
  content={content}
  onChange={setContent}
  theme="light" // or "dark"
  height="500px"
  maxLength={5000}
  autofocus={true}
  tooltips={true}
  enabledFeatures={{
    basic: true,              // Bold, italic, underline, etc.
    alignment: true,          // Text alignment options
    lists: true,              // Bullet and numbered lists
    colors: true,             // Color picker and highlighting  
    media: true,              // Links and images
    tables: true,             // Interactive tables
    history: true,            // Undo/redo functionality
    fonts: true,              // Font family and size
    headings: true,           // H1-H6 heading levels
    superscript: true,        // Superscript and subscript
    bubbleMenu: true,         // Selection-based toolbar
    floatingMenu: true,       // Empty line insertion menu
    characterCount: true,     // Character counter
    fullscreen: true,         // Fullscreen mode
    codeHighlight: true       // Code block highlighting
  }}
  toolbar="top" // "top", "bottom", "both", or "none"
  onFocus={() => console.log('Editor focused')}
  onBlur={() => console.log('Editor blurred')}
/>
```

### Minimal Configuration
```tsx
<RichTextEditor 
  content={content}
  onChange={setContent}
  placeholder="Simple editor for basic content..."
  enabledFeatures={{
    basic: true,
    lists: true,
    history: false,
    // All other features disabled
  }}
  toolbar="bottom"
  theme="light"
/>
```

## 📋 Complete API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | `''` | HTML content of the editor |
| `onChange` | `(content: string) => void` | `undefined` | Callback when content changes |
| `placeholder` | `string` | `'Start typing...'` | Placeholder text |
| `className` | `string` | `''` | Custom CSS class |
| `readonly` | `boolean` | `false` | Make editor read-only |
| `theme` | `'light' \| 'dark' \| 'auto'` | `'light'` | Editor theme |
| `height` | `string` | `'auto'` | Editor height (CSS value) |
| `maxLength` | `number` | `undefined` | Maximum character count |
| `autofocus` | `boolean` | `false` | Auto-focus editor on mount |
| `tooltips` | `boolean` | `true` | Show button tooltips |
| `toolbar` | `'top' \| 'bottom' \| 'both' \| 'none'` | `'top'` | Toolbar position |
| `onFocus` | `() => void` | `undefined` | Focus callback |
| `onBlur` | `() => void` | `undefined` | Blur callback |

### Feature Configuration

```tsx
interface EnabledFeatures {
  basic?: boolean;          // Bold, italic, underline, strikethrough, code
  alignment?: boolean;      // Left, center, right, justify alignment
  lists?: boolean;          // Bullet lists, numbered lists, blockquotes
  colors?: boolean;         // Text color and highlighting
  media?: boolean;          // Links and images
  tables?: boolean;         // Table insertion and editing
  history?: boolean;        // Undo/redo functionality
  fonts?: boolean;          // Font family and size controls
  headings?: boolean;       // H1-H6 heading levels
  superscript?: boolean;    // Superscript and subscript
  bubbleMenu?: boolean;     // Selection-based bubble menu
  floatingMenu?: boolean;   // Empty line floating menu
  characterCount?: boolean; // Character counter display
  fullscreen?: boolean;     // Fullscreen editing mode
  codeHighlight?: boolean;  // Syntax-highlighted code blocks
}
```

## 🖱️ User Interactions

### Keyboard Shortcuts
- **Ctrl+B** - Bold text
- **Ctrl+I** - Italic text
- **Ctrl+U** - Underline text
- **Ctrl+Z** - Undo
- **Ctrl+Y** - Redo
- **Escape** - Exit fullscreen mode

### Smart Menus
- **Bubble Menu** - Select text to see formatting options
- **Floating Menu** - Click on empty lines to insert content

### Professional Modals
- **Link Dialog** - URL, text, title, and target options
- **Image Dialog** - URL, alt text, dimensions, and alignment
- **Table Dialog** - Rows, columns, headers, with live preview

## 🎨 Theming & Customization

The editor uses CSS custom properties for extensive theming:

```css
:root {
  --rce-primary: #3b82f6;           /* Primary brand color */
  --rce-bg-primary: #ffffff;        /* Main background */
  --rce-bg-secondary: #f8fafc;      /* Secondary background */
  --rce-text-primary: #111827;      /* Primary text */
  --rce-border: #e5e7eb;            /* Border color */
  /* ... and many more */
}
```

## 📚 Examples

Check out the example files:
- `examples/BasicExample.tsx` - Full-featured editor showcase
- `examples/CustomFeaturesExample.tsx` - Different configuration examples

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## 📄 License

MIT © [Akash Kumar Singh](https://github.com/webakash1806)

---

**Transform your content creation experience with this professional Rich Text Editor!** 🚀

# Devi RCE (Rich Content Editor)

🚀 A powerful, customizable Rich Content Editor component for React applications, built with TipTap and designed for modern web development.

## ✨ Features

- 📝 **Full-featured WYSIWYG Editor** - Complete text editing experience
- ✏️ **Text Formatting** - Bold, italic, underline, strikethrough, code
- 📐 **Text Alignment** - Left, center, right, justify
- 📋 **Lists** - Bullet points and numbered lists
- 🎨 **Colors & Highlighting** - Text colors and background highlighting
- 🔗 **Links & Media** - Insert links and images
- 📊 **Tables** - Create and edit tables
- ↩️ **Undo/Redo** - Full history management
- 🎛️ **Customizable Features** - Enable/disable features as needed
- 📱 **Responsive Design** - Works on desktop and mobile
- 🎯 **TypeScript Support** - Full type safety included

## 📦 Installation

```bash
npm install devi-rce
```

**Note:** This package requires React 16.8+ and includes peer dependencies for `react` and `react-dom`.

## Rich Text Editor Features

- ✏️ **Text Formatting** - Bold, italic, underline, strikethrough, code
- 📐 **Text Alignment** - Left, center, right, justify
- 📝 **Lists** - Bullet points and numbered lists
- 🎨 **Colors & Highlighting** - Text colors and background highlighting
- 🔗 **Links & Media** - Insert links and images
- 📊 **Tables** - Create and edit tables
- ↩️ **Undo/Redo** - Full history management
- 🔤 **Typography** - Multiple font families (optional)

## 🚀 Quick Start

### Basic Usage

```tsx
import React, { useState } from 'react';
import { RichTextEditor } from 'devi-rce';

function App() {
  const [content, setContent] = useState('<p>Start writing...</p>');

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1>My Editor</h1>
      <RichTextEditor 
        content={content}
        onChange={setContent}
        placeholder="Start typing your content here..."
      />
    </div>
  );
}
```

### With Custom Features

```tsx
import React, { useState } from 'react';
import { RichTextEditor } from 'devi-rce';

function CustomEditor() {
  const [content, setContent] = useState('');

  return (
    <RichTextEditor 
      content={content}
      onChange={setContent}
      enabledFeatures={{
        basic: true,      // Bold, italic, underline, etc.
        alignment: true,  // Text alignment options
        lists: true,      // Bullet and numbered lists
        colors: false,    // Disable colors and highlighting
        media: true,      // Links and images
        tables: false,    // Disable tables
        history: true,    // Undo/redo
        fonts: false      // Font family selection
      }}
      className="border-2 border-blue-200 rounded-xl"
    />
  );
}
```

### Read-only Mode

```tsx
<RichTextEditor 
  content={existingContent}
  readonly={true}
  className="bg-gray-50"
/>
```

## 📋 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | `''` | HTML content of the editor |
| `onChange` | `(content: string) => void` | `undefined` | Callback fired when content changes |
| `placeholder` | `string` | `'Start typing...'` | Placeholder text shown when empty |
| `className` | `string` | `''` | Additional CSS classes for styling |
| `readonly` | `boolean` | `false` | Makes the editor read-only |
| `enabledFeatures` | `FeatureConfig` | All enabled | Configure which features to show |

### Feature Configuration

```tsx
interface FeatureConfig {
  basic?: boolean;     // Bold, italic, underline, strikethrough, code
  alignment?: boolean; // Text alignment (left, center, right, justify)
  lists?: boolean;     // Bullet lists, numbered lists, blockquotes
  colors?: boolean;    // Text colors and highlighting
  media?: boolean;     // Links and images
  tables?: boolean;    // Table creation and editing
  history?: boolean;   // Undo and redo functionality
  fonts?: boolean;     // Font family selection
}
```

## Dependencies

The Rich Text Editor automatically installs these dependencies:

- `@tiptap/react` - Core TipTap React bindings
- `@tiptap/starter-kit` - Essential TipTap extensions
- `@tiptap/extension-*` - Various editor extensions
- `lucide-react` - Icons for toolbar
- `@tailwindcss/typography` - Typography plugin for Tailwind

## Customization

The generated Rich Text Editor component is fully customizable. You can:

- Modify the toolbar layout
- Add or remove features
- Customize styling and colors
- Extend with additional TipTap extensions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Akash Kumar Singh](https://github.com/webakash1806)

# Devi RCE - Complete Usage Guide

🎉 **Congratulations!** Your `devi-rce` package is now ready for use!

## ✅ Package Ready

- **Package Name:** `devi-rce`
- **Command:** `npm install devi-rce`
- **Location:** `D:\CLI-extra`
- **Built Files:** `D:\CLI-extra\dist`
- **Status:** ✅ Ready for publishing

## 🚀 Quick Start

### 1. Install the Package

```bash
npm install devi-rce
```

### 2. Import and Use

```tsx
import React, { useState } from 'react';
import { RichTextEditor } from 'devi-rce';

function MyApp() {
  const [content, setContent] = useState('<p>Hello, world!</p>');

  return (
    <div className="p-6">
      <h1>My Rich Text Editor</h1>
      <RichTextEditor 
        content={content}
        onChange={setContent}
        placeholder="Start typing..."
      />
    </div>
  );
}

export default MyApp;
```

## 📦 What's Included

### Components
- **RichTextEditor** - Main editor component with full functionality
- **RichTextEditorProps** - TypeScript interface for props
- **Editor** - Re-exported TipTap editor type

### Features
- ✏️ **Text Formatting** - Bold, italic, underline, strikethrough, code
- 📐 **Text Alignment** - Left, center, right, justify
- 📋 **Lists** - Bullet and numbered lists, blockquotes
- 🎨 **Colors** - Text colors and highlighting
- 🔗 **Media** - Links and images
- 📊 **Tables** - Full table support
- ↩️ **History** - Undo/redo functionality
- 🔤 **Fonts** - Font family selection (optional)

### Customization
```tsx
<RichTextEditor 
  content={content}
  onChange={setContent}
  enabledFeatures={{
    basic: true,      // Basic formatting
    alignment: true,  // Text alignment
    lists: true,      // Lists and quotes
    colors: true,     // Colors and highlighting
    media: true,      // Links and images
    tables: true,     // Table support
    history: true,    // Undo/redo
    fonts: false      // Font families (off by default)
  }}
  className="custom-editor-style"
  readonly={false}
/>
```

## 📁 Package Structure

```
D:\CLI-extra/
├── dist/                     # Built files (published)
│   ├── index.js
│   ├── index.d.ts
│   └── src/
│       └── components/
│           ├── RichTextEditor.js
│           └── RichTextEditor.d.ts
├── src/
│   └── components/
│       └── RichTextEditor.tsx   # Main component
├── examples/                    # Usage examples
│   ├── BasicExample.tsx
│   └── CustomFeaturesExample.tsx
├── package.json                 # Package configuration
├── tsconfig.json               # TypeScript config
├── README.md                   # Documentation
└── index.ts                    # Main export file
```

## 🔧 Dependencies

### Required Peer Dependencies
- `react` >= 16.8.0
- `react-dom` >= 16.8.0

### Included Dependencies
- `@tiptap/react` - Core TipTap functionality
- `@tiptap/starter-kit` - Basic extensions
- `@tiptap/extension-*` - Various editor extensions
- `lucide-react` - Icons for the toolbar

## 🌟 Usage Examples

### Basic Example
```tsx
import { RichTextEditor } from 'devi-rce';

const [content, setContent] = useState('<p>Start writing...</p>');

<RichTextEditor 
  content={content}
  onChange={setContent}
/>
```

### Custom Features Example
```tsx
<RichTextEditor 
  content={content}
  onChange={setContent}
  enabledFeatures={{
    basic: true,
    colors: false,    // Disable colors
    tables: false,    // Disable tables
    fonts: true       // Enable font selection
  }}
/>
```

### Read-only Mode
```tsx
<RichTextEditor 
  content={savedContent}
  readonly={true}
  className="read-only-editor"
/>
```

## 🚀 Publishing Steps

When ready to publish to npm:

1. **Build the package:**
   ```bash
   npm run build
   ```

2. **Test locally:**
   ```bash
   npm pack
   # Test the generated .tgz file in another project
   ```

3. **Publish to npm:**
   ```bash
   npm publish
   ```

## 💡 Tips

1. **Styling:** The component uses Tailwind classes by default. Make sure your project has Tailwind CSS or add custom styles.

2. **Custom Styling:** Use the `className` prop to add your own styles:
   ```tsx
   <RichTextEditor className="my-custom-editor" />
   ```

3. **Content Management:** The editor returns HTML content. Store this in your database and pass it back to the `content` prop.

4. **Feature Toggle:** Use `enabledFeatures` to customize which toolbar buttons appear based on your needs.

## 🎯 Next Steps

Your package is now complete and ready for:
- ✅ Local testing
- ✅ npm publishing  
- ✅ Production use

The `devi-rce` package provides a powerful, customizable rich text editor that developers can easily install and use in their React applications with `npm install devi-rce`!

---

🎉 **Package Complete!** You now have a professional-grade React component library ready for distribution.

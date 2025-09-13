# 🚀 Devi Rich Text Editors

**Professional-grade rich text editors for React applications**

[![npm version](https://badge.fury.io/js/devi-rce.svg)](https://badge.fury.io/js/devi-rce)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](https://www.typescriptlang.org/)

A comprehensive collection of rich text editors built with React and TipTap, offering everything from simple text editing to advanced Notion-like functionality.

## ✨ Features

### 🎯 **DeviBasicEditor** - Simple & Clean
- Essential text formatting (bold, italic, underline, strikethrough)
- Headings (H1, H2, H3)
- Lists and blockquotes
- Undo/redo functionality
- Perfect for blogs, notes, and simple content

### 🚀 **DeviNotionEditor** - Advanced & Professional
- **Everything from Basic Editor, plus:**
- Advanced formatting (superscript, subscript, highlighting)
- Text colors and alignment
- Tables with resizing capabilities
- Image and link insertion
- Code blocks with syntax highlighting
- Bubble and floating menus
- Fullscreen editing mode
- Character counting and limits
- Professional UI components

### 🎨 **Universal Features**
- Light and dark themes
- Fully responsive design
- Accessibility optimized
- TypeScript support
- Customizable styling
- Keyboard shortcuts
- Print-friendly

## 📦 Installation

```bash
npm install devi-rce
# or
yarn add devi-rce
# or
pnpm add devi-rce
```

## 🎯 Quick Start

### DeviBasicEditor - For Simple Content

```tsx
import React, { useState } from 'react';
import { DeviBasicEditor } from 'devi-rce';

function MyApp() {
  const [content, setContent] = useState('<p>Start writing...</p>');

  return (
    <DeviBasicEditor
      content={content}
      onChange={setContent}
      theme="light"
      height="300px"
      placeholder="Write your content here..."
    />
  );
}
```

### DeviNotionEditor - For Advanced Content

```tsx
import React, { useState } from 'react';
import { DeviNotionEditor } from 'devi-rce';

function MyApp() {
  const [content, setContent] = useState('');

  return (
    <DeviNotionEditor
      content={content}
      onChange={setContent}
      theme="light"
      height="500px"
      placeholder="Type '/' for commands..."
      enableBubbleMenu={true}
      enableFloatingMenu={true}
      showCharacterCount={true}
    />
  );
}
```

## 📚 API Documentation

### DeviBasicEditor Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | `''` | HTML content of the editor |
| `onChange` | `(content: string) => void` | - | Callback when content changes |
| `placeholder` | `string` | `'Start writing...'` | Placeholder text |
| `theme` | `'light' \| 'dark'` | `'light'` | Editor theme |
| `height` | `string` | `'300px'` | Editor height |
| `className` | `string` | `''` | Custom CSS class |
| `readOnly` | `boolean` | `false` | Read-only mode |
| `maxLength` | `number` | - | Maximum character limit |

### DeviNotionEditor Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | `''` | HTML content of the editor |
| `onChange` | `(content: string) => void` | - | Callback when content changes |
| `placeholder` | `string` | `'Type "/" for commands...'` | Placeholder text |
| `theme` | `'light' \| 'dark'` | `'light'` | Editor theme |
| `height` | `string` | `'400px'` | Editor height |
| `className` | `string` | `''` | Custom CSS class |
| `readOnly` | `boolean` | `false` | Read-only mode |
| `maxLength` | `number` | - | Maximum character limit |
| `showCharacterCount` | `boolean` | `true` | Show character/word count |
| `enableSlashCommands` | `boolean` | `true` | Enable slash commands |
| `enableBubbleMenu` | `boolean` | `true` | Enable bubble menu |
| `enableFloatingMenu` | `boolean` | `true` | Enable floating menu |
| `enableDragDrop` | `boolean` | `true` | Enable drag & drop |

## 🎨 Theming & Customization

### Built-in Themes

```tsx
// Light theme (default)
<DeviNotionEditor theme="light" />

// Dark theme
<DeviNotionEditor theme="dark" />
```

### Custom Styling

Override CSS variables for custom theming:

```css
:root {
  --devi-primary: #your-brand-color;
  --devi-bg-primary: #your-background;
  --devi-text-primary: #your-text-color;
  --devi-border-primary: #your-border-color;
}

/* Dark theme overrides */
.dark {
  --devi-primary: #your-dark-brand-color;
  --devi-bg-primary: #your-dark-background;
  /* ... */
}
```

### Custom CSS Classes

```tsx
<DeviNotionEditor 
  className="my-custom-editor"
  // ... other props
/>
```

## 🔧 Advanced Usage

### Controlled vs Uncontrolled

```tsx
// Controlled (recommended)
const [content, setContent] = useState('');
<DeviNotionEditor content={content} onChange={setContent} />

// Uncontrolled
<DeviNotionEditor defaultContent="<p>Initial content</p>" />
```

### Character Limits

```tsx
<DeviNotionEditor
  maxLength={5000}
  showCharacterCount={true}
  // Will show "1250 / 5000" in status bar
/>
```

### Read-only Mode

```tsx
<DeviNotionEditor
  readOnly={true}
  // Perfect for displaying formatted content
/>
```

### Menu Configuration

```tsx
<DeviNotionEditor
  enableBubbleMenu={true}      // Show formatting menu on text selection
  enableFloatingMenu={true}    // Show "+" menu on empty lines
  enableSlashCommands={true}   // Enable "/" commands
  enableDragDrop={true}        // Enable drag & drop
/>
```

## 🛠️ Use Cases

### 📝 DeviBasicEditor is perfect for:
- Blog post writing
- Comment systems
- Simple note-taking
- Basic content forms
- Documentation with minimal formatting

### 🚀 DeviNotionEditor is ideal for:
- Content management systems
- Documentation platforms
- Collaborative writing tools
- Rich note-taking applications
- Professional content creation
- Knowledge bases
- Wiki systems

## 🔄 Migration Guide

### From Legacy RichTextEditor

```tsx
// Old way (still works)
import { RichTextEditor } from 'devi-rce';

// New way - choose the right editor
import { DeviBasicEditor, DeviNotionEditor } from 'devi-rce';

// Use DeviBasicEditor for simple use cases
<DeviBasicEditor {...props} />

// Use DeviNotionEditor for advanced features
<DeviNotionEditor {...props} />
```

## 📱 Responsive Design

Both editors are fully responsive and work great on:
- Desktop computers
- Tablets
- Mobile phones
- Touch devices

The toolbar automatically adapts to smaller screens with:
- Collapsible toolbar sections
- Touch-friendly buttons
- Optimized spacing
- Mobile-specific interactions

## ♿ Accessibility

- Full keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Focus management
- ARIA labels and roles
- Reduced motion support

## 🎹 Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Bold | `Ctrl/Cmd + B` |
| Italic | `Ctrl/Cmd + I` |
| Underline | `Ctrl/Cmd + U` |
| Strikethrough | `Ctrl/Cmd + Shift + S` |
| Undo | `Ctrl/Cmd + Z` |
| Redo | `Ctrl/Cmd + Y` |
| Heading 1 | `Ctrl/Cmd + Alt + 1` |
| Heading 2 | `Ctrl/Cmd + Alt + 2` |
| Bullet List | `Ctrl/Cmd + Shift + 8` |
| Numbered List | `Ctrl/Cmd + Shift + 7` |

## 📊 Performance

- **Lightweight**: Optimized bundle size
- **Fast**: Efficient rendering with React
- **Memory efficient**: Proper cleanup and disposal
- **Lazy loading**: Extensions loaded on demand
- **Tree shaking**: Only import what you use

## 🔍 Examples

Check out our comprehensive examples:

- [`DeviBasicEditorExample.tsx`](./examples/DeviBasicEditorExample.tsx) - Simple editor showcase
- [`DeviNotionEditorExample.tsx`](./examples/DeviNotionEditorExample.tsx) - Advanced editor features
- [`BasicExample.tsx`](./examples/BasicExample.tsx) - Legacy example
- [`CustomFeaturesExample.tsx`](./examples/CustomFeaturesExample.tsx) - Feature customization

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on:

- Code of conduct
- Development setup
- Pull request process
- Issue reporting

## 🐛 Issues & Support

- **Bug Reports**: [GitHub Issues](https://github.com/your-repo/issues)
- **Feature Requests**: [GitHub Discussions](https://github.com/your-repo/discussions)
- **Documentation**: This README and inline comments

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [TipTap](https://tiptap.dev/) - The headless editor framework
- Styled with [Tailwind CSS](https://tailwindcss.com/) principles
- Icons by [Lucide React](https://lucide.dev/)
- Inspired by [Notion](https://notion.so) and [Linear](https://linear.app)

## 📈 Changelog

### v2.0.0 (Latest)
- ✨ **NEW**: `DeviBasicEditor` for simple use cases
- ✨ **NEW**: `DeviNotionEditor` for advanced features  
- 🎨 Complete UI/UX redesign
- 🔧 Full TypeScript rewrite
- 📱 Enhanced mobile responsiveness
- ♿ Improved accessibility
- 🚀 Performance optimizations
- 📊 Character counting and limits
- 🎨 Advanced theming system

### v1.0.1
- 🐛 Bug fixes and stability improvements
- 📝 Documentation updates

### v1.0.0
- 🎉 Initial release with basic rich text editing

---

<div align="center">
  <strong>Made with ❤️ for the React community</strong>
  <br>
  <sub>Star ⭐ this repo if you find it useful!</sub>
</div>

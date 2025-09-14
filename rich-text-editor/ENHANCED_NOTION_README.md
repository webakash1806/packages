# 🌟 Enhanced Notion-like Editor

A beautiful, feature-rich text editor inspired by Notion, built with React and TipTap. This enhanced version includes drag-and-drop functionality, resizable images, slash commands with AI integration, and a modern user interface.

![Enhanced Notion Editor](https://via.placeholder.com/800x400/667eea/ffffff?text=Enhanced+Notion+Editor)

## ✨ Key Features

### 🚀 **Enhanced User Experience**
- **Beautiful Modern UI**: Clean, Notion-inspired interface with smooth animations
- **Dark Mode Support**: Seamless light/dark theme switching
- **Gradient Header**: Eye-catching header with particle effects
- **Responsive Design**: Works perfectly on all device sizes

### ⚡ **Slash Commands Menu**
- **AI Integration Ready**: Continue Writing and Ask AI commands
- **Smart Categories**: AI, Style, Lists, and Media organized categories
- **Searchable**: Filter commands with real-time search
- **Keyboard Navigation**: Arrow keys and Enter for quick access
- **Modern Design**: Beautiful dropdown with icons and descriptions

### 🖱️ **Drag & Drop Functionality**
- **Visual Drag Handles**: Hover to reveal grip handles for reordering
- **Add Block Button**: + button appears on hover for quick content addition
- **Smooth Interactions**: Fluid animations and transitions
- **Intuitive UX**: Similar to Notion's block management system

### 🖼️ **Advanced Image Management**
- **Dual Upload Options**: Both URL input and file upload support
- **Resizable Images**: Click to select, drag corner handles to resize
- **Visual Feedback**: Selection indicators and resize handles
- **Aspect Ratio Preservation**: Maintains image proportions during resize
- **Preview Modal**: Enhanced modal with tabs and live preview

### 🎨 **Rich Text Formatting**
- **Complete Typography**: Headings, paragraphs, lists, blockquotes
- **Text Styling**: Bold, italic, underline, strikethrough, inline code
- **Color Support**: Text colors and highlight options
- **Alignment Options**: Left, center, right, justify
- **Code Blocks**: Syntax-highlighted code with Lowlight

### 🎯 **Interactive Menus**
- **Bubble Menu**: Selection-based formatting (black theme like Notion)
- **Floating Menu**: Context-aware block insertion
- **Enhanced Styling**: Modern design with smooth animations
- **Quick Actions**: Most-used formatting options at your fingertips

## 🛠️ Installation

### Prerequisites
```bash
npm install react react-dom
```

### Core Dependencies
```bash
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-underline
npm install @tiptap/extension-superscript @tiptap/extension-subscript
npm install @tiptap/extension-highlight @tiptap/extension-text-align
npm install @tiptap/extension-font-family @tiptap/extension-text-style
npm install @tiptap/extension-color @tiptap/extension-link
npm install @tiptap/extension-image @tiptap/extension-table
npm install @tiptap/extension-table-row @tiptap/extension-table-cell
npm install @tiptap/extension-table-header @tiptap/extension-code-block-lowlight
npm install @tiptap/extension-typography @tiptap/extension-placeholder
npm install @tiptap/extension-character-count @tiptap/extension-focus
npm install @tiptap/extension-dropcursor @tiptap/extension-gapcursor
npm install lucide-react lowlight
```

### Styling (Optional)
```bash
npm install tailwindcss
```

## 📖 Usage

### Basic Implementation

```tsx
import React, { useState } from 'react';
import EnhancedNotionEditor from './src/EnhancedNotionEditor';

function App() {
  const [content, setContent] = useState('<p>Start writing...</p>');
  
  return (
    <div className="app">
      <EnhancedNotionEditor
        content={content}
        onChange={setContent}
        theme="light"
        placeholder="Type '/' for commands, or start writing..."
        height="600px"
      />
    </div>
  );
}

export default App;
```

### Advanced Configuration

```tsx
import React, { useState } from 'react';
import EnhancedNotionEditor from './src/EnhancedNotionEditor';

function AdvancedExample() {
  const [content, setContent] = useState(`
    <h1>Welcome to Enhanced Notion Editor ✨</h1>
    <blockquote>
      <p>💫 <strong>Invite your colleagues to make this fun!</strong></p>
      <p>Start collaborating and explore all the enhanced features.</p>
    </blockquote>
    <p>Try typing <code>/</code> to see the magic happen! 🎭</p>
  `);
  
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="p-4">
        <button 
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
        
        <EnhancedNotionEditor
          content={content}
          onChange={setContent}
          theme={theme}
          placeholder="Start your amazing content here..."
          height="700px"
          className="max-w-4xl mx-auto"
          readOnly={false}
        />
      </div>
    </div>
  );
}
```

## 🎯 Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | `''` | Initial HTML content |
| `onChange` | `(content: string) => void` | `undefined` | Callback when content changes |
| `placeholder` | `string` | `'Type "/" for commands...'` | Placeholder text |
| `theme` | `'light' \| 'dark'` | `'light'` | Editor theme |
| `height` | `string` | `'600px'` | Editor height |
| `className` | `string` | `''` | Additional CSS classes |
| `readOnly` | `boolean` | `false` | Read-only mode |

## 🎨 Styling

The editor comes with built-in styles but can be customized:

```css
/* Custom theme colors */
.enhanced-notion-editor {
  --primary-color: #3b82f6;
  --secondary-color: #64748b;
  --background-color: #ffffff;
  --text-color: #1f2937;
}

.enhanced-notion-editor.dark {
  --background-color: #1f2937;
  --text-color: #f9fafb;
}
```

## 🎭 Interactive Features

### Slash Commands (`/`)
1. Type `/` anywhere in the editor
2. Use arrow keys to navigate options
3. Press Enter to select or click
4. Categories include:
   - **AI**: Continue Writing, Ask AI
   - **Style**: Text, Headings 1-3
   - **Lists**: Bullets, Numbers, To-dos
   - **Media**: Blockquotes, Code blocks

### Drag & Drop
1. Hover over any content block
2. Look for the grip handle (⋮⋮) on the left
3. Click the + button to add new blocks
4. Drag the grip handle to reorder

### Image Management
1. Use slash command or click image button
2. Choose between URL or file upload
3. Add optional alt text
4. Click inserted image to select
5. Drag corner handles to resize

### Text Selection
1. Select any text to see bubble menu
2. Quick access to bold, italic, strikethrough, underline
3. Dark theme design matches Notion

## 🔧 Customization

### Adding Custom Slash Commands

```tsx
// In SlashCommandMenu component
const customCommands: SlashCommand[] = [
  {
    id: 'custom-block',
    title: 'Custom Block',
    description: 'Insert your custom content',
    icon: <YourIcon size={16} />,
    category: 'Media',
    action: () => {
      editor.chain().focus().insertContent('<div>Custom content</div>').run();
      onClose();
    }
  }
];
```

### Extending the Editor

```tsx
import { Extension } from '@tiptap/core';

const CustomExtension = Extension.create({
  name: 'customExtension',
  // Your custom extension logic
});

// Add to editor extensions array
const editor = useEditor({
  extensions: [
    // ... existing extensions
    CustomExtension,
  ],
});
```

## 🚀 Examples

Check out the examples directory:
- `EnhancedNotionEditorExample.tsx` - Complete demo with all features
- `demo.html` - Standalone HTML demo page

## 📝 Development

### File Structure
```
src/
├── EnhancedNotionEditor.tsx    # Main editor component
├── DeviNotionEditor.tsx        # Original editor (enhanced)
└── DeviEditors.css            # Styling

examples/
├── EnhancedNotionEditorExample.tsx  # Full demo
├── BasicExample.tsx                 # Simple usage
└── CustomFeaturesExample.tsx        # Advanced features

demo.html                      # Standalone demo page
```

### Building
```bash
npm run build
```

### Running Examples
```bash
npm start
# Navigate to examples in your browser
```

## 🎪 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 📋 Roadmap

- [ ] **AI Integration**: Connect to OpenAI/Claude APIs
- [ ] **Collaborative Editing**: Real-time collaboration
- [ ] **Block Templates**: Pre-made content blocks
- [ ] **Export Options**: PDF, Markdown, Word
- [ ] **Plugin System**: Custom extensions architecture
- [ ] **Voice Input**: Speech-to-text functionality
- [ ] **Advanced Tables**: Improved table editing
- [ ] **Media Embeds**: YouTube, Twitter, etc.

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests.

## 📄 License

MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- [TipTap](https://tiptap.dev/) - Powerful headless editor
- [Notion](https://notion.so/) - Inspiration for design and UX
- [Lucide React](https://lucide.dev/) - Beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS

## 📞 Support

- 🐛 **Bug Reports**: [Create an issue](https://github.com/your-repo/issues)
- 💡 **Feature Requests**: [Start a discussion](https://github.com/your-repo/discussions)
- 📧 **Direct Contact**: your-email@example.com

---

<div align="center">

**Made with ❤️ and modern web technologies**

[Demo](./demo.html) • [Documentation](./ENHANCED_NOTION_README.md) • [Examples](./examples/)

</div>

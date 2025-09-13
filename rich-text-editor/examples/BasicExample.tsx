import React, { useState } from 'react';
import { RichTextEditor } from 'devi-rce';
import '../RichTextEditor.css';

/**
 * Basic example showing how to use the RichTextEditor component
 */
const BasicExample: React.FC = () => {
  const [content, setContent] = useState(`
    <h1>Welcome to Professional Rich Text Editor</h1>
    <p>This is a completely redesigned and professional rich text editor with modern features:</p>
    <ul>
      <li><strong>Beautiful UI</strong> - Modern, clean design with proper typography</li>
      <li><strong>Advanced Formatting</strong> - Headings, fonts, colors, and more</li>
      <li><strong>Smart Menus</strong> - Bubble menu and floating menu for better UX</li>
      <li><strong>Professional Modals</strong> - Proper dialogs for links, images, and tables</li>
      <li><strong>Full Feature Set</strong> - Everything you need for professional content creation</li>
    </ul>
    <blockquote>
      <p>Try selecting text to see the bubble menu, or click on an empty line to see the floating menu!</p>
    </blockquote>
    <p>This editor supports <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strikethrough</s>, and <code>inline code</code>.</p>
  `);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-4xl font-bold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              Professional Rich Text Editor
            </h1>
            <p className={`text-lg ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              A modern, feature-rich editor with professional design and advanced functionality.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                theme === 'dark'
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: '🎨', title: 'Modern UI', desc: 'Beautiful, professional design' },
            { icon: '⚡', title: 'Fast & Smooth', desc: 'Optimized performance' },
            { icon: '📱', title: 'Responsive', desc: 'Works on all devices' },
            { icon: '♿', title: 'Accessible', desc: 'Full accessibility support' },
          ].map((feature, index) => (
            <div key={index} className={`p-4 rounded-lg border ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className="text-2xl mb-2">{feature.icon}</div>
              <h3 className={`font-semibold mb-1 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>{feature.title}</h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Editor Section */}
        <div className={`rounded-xl shadow-xl overflow-hidden border ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className={`px-6 py-4 border-b flex items-center justify-between ${
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-700 text-white' 
              : 'bg-gray-50 border-gray-200 text-gray-800'
          }`}>
            <h2 className="text-xl font-semibold">Rich Text Editor</h2>
            <div className="flex items-center gap-2 text-sm">
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                Try selecting text or clicking on empty lines!
              </span>
            </div>
          </div>
          
          <div className="p-6">
            <RichTextEditor 
              content={content}
              onChange={setContent}
              placeholder="Start typing to experience the power of this professional editor..."
              theme={theme}
              height="500px"
              maxLength={5000}
              autofocus={true}
              enabledFeatures={{
                basic: true,
                alignment: true,
                lists: true,
                colors: true,
                media: true,
                tables: true,
                history: true,
                fonts: true,
                headings: true,
                superscript: true,
                bubbleMenu: true,
                floatingMenu: true,
                characterCount: true,
                fullscreen: true,
                codeHighlight: true
              }}
            />
          </div>
        </div>

        {/* HTML Output Section */}
        <div className={`rounded-lg border overflow-hidden ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
        }`}>
          <div className={`px-4 py-3 border-b flex items-center justify-between ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <h3 className={`font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-700'
            }`}>Generated HTML Output</h3>
            <button
              onClick={() => navigator.clipboard.writeText(content)}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                theme === 'dark'
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              📋 Copy HTML
            </button>
          </div>
          <div className="p-4">
            <pre className={`text-sm overflow-x-auto rounded-lg p-4 border ${
              theme === 'dark' 
                ? 'bg-gray-900 text-gray-300 border-gray-600' 
                : 'bg-white text-gray-800 border-gray-200'
            }`}>
              {content}
            </pre>
          </div>
        </div>

        {/* Features Overview */}
        <div className={`rounded-lg p-6 ${
          theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>🚀 Features Enabled</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              '✅ Basic Formatting (Bold, Italic, Underline, etc.)',
              '✅ Headings (H1-H6) & Paragraph Styles',
              '✅ Font Family & Size Controls',
              '✅ Text Alignment (Left, Center, Right, Justify)',
              '✅ Lists (Bullet, Numbered, Blockquotes)',
              '✅ Colors & Highlighting',
              '✅ Links & Images with Advanced Options',
              '✅ Tables with Preview',
              '✅ Code Blocks & Inline Code',
              '✅ Superscript & Subscript',
              '✅ Undo/Redo History',
              '✅ Fullscreen Mode',
              '✅ Character Count (5000 limit)',
              '✅ Bubble Menu (Selection-based)',
              '✅ Floating Menu (Empty line)',
              '✅ Professional Modals',
              '✅ Keyboard Shortcuts',
              '✅ Dark/Light Theme Support',
              '✅ Responsive Design',
              '✅ Accessibility Features'
            ].map((feature, index) => (
              <div key={index} className={`text-sm flex items-start gap-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <span className="flex-shrink-0">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className={`rounded-lg p-6 border-l-4 border-blue-500 ${
          theme === 'dark' ? 'bg-blue-900/20 border-blue-400' : 'bg-blue-50 border-blue-500'
        }`}>
          <h3 className={`font-semibold mb-3 ${
            theme === 'dark' ? 'text-blue-300' : 'text-blue-800'
          }`}>💡 Pro Tips</h3>
          <ul className={`space-y-2 text-sm ${
            theme === 'dark' ? 'text-blue-200' : 'text-blue-700'
          }`}>
            <li>• <strong>Select text</strong> to see the bubble menu with quick formatting options</li>
            <li>• <strong>Click on empty lines</strong> to see the floating menu for inserting content</li>
            <li>• <strong>Press Escape</strong> to exit fullscreen mode</li>
            <li>• <strong>Use keyboard shortcuts</strong>: Ctrl+B (bold), Ctrl+I (italic), Ctrl+U (underline)</li>
            <li>• <strong>Drag and resize</strong> tables after insertion for better layout</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BasicExample;

import React, { useState } from 'react';
import EnhancedNotionEditor from '../src/EnhancedNotionEditor';

const EnhancedNotionEditorExample: React.FC = () => {
  const [content, setContent] = useState(`
    <h1>Welcome to Notion-like template ✨</h1>
    <blockquote>
      <p>💫 <strong>Invite your colleagues to make this fun!</strong></p>
      <p>Just copy the URL from your browser and share it — everyone with the link can join in and collaborate in real time.</p>
    </blockquote>
    
    <p>Start writing your thoughts here ... ✏️</p>
    <p>Try some <strong>Markdown</strong>:</p>
    
    <p><em>/Filter...</em></p>
    
    <h2>✨ Key Features Demonstrated</h2>
    
    <h3>🎨 Rich Text Formatting</h3>
    <p>This editor supports <strong>bold text</strong>, <em>italic text</em>, <u>underlined text</u>, <s>strikethrough</s>, and <code>inline code</code>.</p>
    
    <h3>📝 Multiple Heading Levels</h3>
    <h1>Heading 1 - Main Title</h1>
    <h2>Heading 2 - Section Header</h2>
    <h3>Heading 3 - Subsection</h3>
    
    <h3>📋 Lists and Organization</h3>
    <ul>
      <li>Bullet point one</li>
      <li>Bullet point two with <strong>formatting</strong></li>
      <li>Nested items work too:
        <ul>
          <li>Sub-item A</li>
          <li>Sub-item B</li>
        </ul>
      </li>
    </ul>
    
    <ol>
      <li>First numbered item</li>
      <li>Second numbered item</li>
      <li>Third item with <em>emphasis</em></li>
    </ol>
    
    <h3>💬 Blockquotes</h3>
    <blockquote>
      <p>"The best way to predict the future is to invent it." - Alan Kay</p>
    </blockquote>
    
    <h3>💻 Code Blocks</h3>
    <pre><code class="language-javascript">// Example JavaScript code
function greet(name) {
  return \`Hello, \${name}! Welcome to our enhanced editor.\`;
}

console.log(greet('Developer'));</code></pre>
    
    <h3>🔗 Links and Media</h3>
    <p>You can add <a href="https://example.com">external links</a> and embed images easily.</p>
    
    <h3>⚡ Interactive Features</h3>
    <p><strong>Try these interactions:</strong></p>
    <ul>
      <li>Type <code>/</code> to open the command menu</li>
      <li>Select text to see the bubble menu</li>
      <li>Click on empty lines to see the + button</li>
      <li>Hover over blocks to see drag handles</li>
      <li>Click images to resize them with handles</li>
    </ul>
    
    <h3>🎯 Slash Commands Available</h3>
    <p>The enhanced slash command menu includes:</p>
    <ul>
      <li><strong>AI Features:</strong> Continue Writing, Ask AI</li>
      <li><strong>Text Styles:</strong> Headings, Text formatting</li>
      <li><strong>Lists:</strong> Bullets, Numbers, To-dos</li>
      <li><strong>Media:</strong> Blockquotes, Code blocks</li>
    </ul>
    
    <p>🚀 <em>Start typing and exploring all the features!</em></p>
  `);
  
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header Controls */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Enhanced Notion Editor Demo
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              A comprehensive rich text editor with modern features
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'} Mode
            </button>
            
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Characters: {content.replace(/<[^>]*>/g, '').length}
            </div>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="py-8">
        <EnhancedNotionEditor
          content={content}
          onChange={handleContentChange}
          theme={theme}
          placeholder="Start typing or press '/' for commands..."
          height="600px"
          className="max-w-6xl mx-auto"
        />
      </div>

      {/* Feature Showcase */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            🚀 Enhanced Features
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <div className="text-2xl mb-3">⚡</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Slash Commands
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Type "/" to access AI features, formatting options, and content blocks instantly.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <div className="text-2xl mb-3">🖱️</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Drag & Drop
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Hover over content blocks to reveal drag handles and + buttons for easy reorganization.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <div className="text-2xl mb-3">🖼️</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Resizable Images
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Upload images or use URLs, then click to select and resize with visual handles.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <div className="text-2xl mb-3">🤖</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                AI Integration
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                AI-powered writing assistance and content suggestions (placeholder implementation).
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <div className="text-2xl mb-3">🎨</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Rich Formatting
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Complete text formatting with colors, highlights, alignment, and typography options.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <div className="text-2xl mb-3">🌓</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Dark Mode
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Seamless light and dark theme support with smooth transitions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-t border-blue-200 dark:border-blue-800 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">
            🎯 Try These Interactions:
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-mono text-sm bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded">
                  /
                </span>
                <span className="text-blue-800 dark:text-blue-200">
                  Open the command palette for quick formatting and AI features
                </span>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-mono text-sm bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded">
                  Select
                </span>
                <span className="text-blue-800 dark:text-blue-200">
                  Highlight text to see the floating formatting bubble menu
                </span>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-mono text-sm bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded">
                  Hover
                </span>
                <span className="text-blue-800 dark:text-blue-200">
                  Hover over empty lines to reveal the + add block button
                </span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-mono text-sm bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded">
                  Drag
                </span>
                <span className="text-blue-800 dark:text-blue-200">
                  Use the grip handles to reorder content blocks
                </span>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-mono text-sm bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded">
                  Click
                </span>
                <span className="text-blue-800 dark:text-blue-200">
                  Click on images to select and resize with corner handles
                </span>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-mono text-sm bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded">
                  Type
                </span>
                <span className="text-blue-800 dark:text-blue-200">
                  Start typing to see contextual floating menus appear
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 dark:bg-black text-white py-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-300">
            Enhanced Notion-like Editor • Built with React, TipTap, and modern web technologies
          </p>
          <p className="text-gray-500 mt-2">
            Features drag-and-drop, resizable images, slash commands, and AI integration ready
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnhancedNotionEditorExample;

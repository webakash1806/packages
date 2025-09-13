import React, { useState } from 'react';
import { DeviBasicEditor } from 'devi-rce';
import '../src/DeviEditors.css';

/**
 * Example demonstrating the DeviBasicEditor component
 * Perfect for simple content creation with essential formatting
 */
const DeviBasicEditorExample: React.FC = () => {
  const [content, setContent] = useState('<h2>Welcome to DeviBasicEditor! ✨</h2><p>This is a <strong>simplified rich text editor</strong> designed for <em>essential content creation</em>. It includes all the basic features you need:</p><ul><li>Bold, italic, underline, and strikethrough formatting</li><li>Headings (H1, H2, H3)</li><li>Bullet and numbered lists</li><li>Blockquotes for emphasis</li><li>Undo/redo functionality</li></ul><blockquote><p>"Simplicity is the ultimate sophistication" - Leonardo da Vinci</p></blockquote><p>Perfect for <u>blog posts</u>, <s>complex documents</s> simple documents, notes, and everyday writing tasks!</p>');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [readOnly, setReadOnly] = useState(false);
  const [maxLength, setMaxLength] = useState<number | undefined>(undefined);
  const [showLengthLimit, setShowLengthLimit] = useState(false);

  const handleToggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleToggleLengthLimit = () => {
    if (showLengthLimit) {
      setMaxLength(undefined);
      setShowLengthLimit(false);
    } else {
      setMaxLength(500);
      setShowLengthLimit(true);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className={`text-4xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
            🎯 DeviBasicEditor
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            A clean, simple rich text editor with essential formatting features. 
            Perfect for everyday writing tasks without the complexity.
          </p>
          
          {/* Controls */}
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={handleToggleTheme}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                theme === 'dark'
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </button>
            
            <button
              onClick={() => setReadOnly(!readOnly)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                theme === 'dark'
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              } ${readOnly ? 'ring-2 ring-blue-500' : ''}`}
            >
              {readOnly ? '👁️ Read Only' : '✏️ Editable'}
            </button>
            
            <button
              onClick={handleToggleLengthLimit}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                theme === 'dark'
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              } ${showLengthLimit ? 'ring-2 ring-yellow-500' : ''}`}
            >
              {showLengthLimit ? '🔢 500 Char Limit' : '∞ No Limit'}
            </button>
          </div>
        </div>

        {/* Main Editor */}
        <div className={`rounded-xl shadow-lg overflow-hidden ${
          theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <div className={`px-6 py-4 border-b ${
            theme === 'dark' ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'
          }`}>
            <h2 className={`text-xl font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              Basic Rich Text Editor
            </h2>
            <p className={`text-sm mt-1 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Essential formatting tools with a clean, intuitive interface
            </p>
          </div>
          
          <div className="p-6">
            <DeviBasicEditor
              content={content}
              onChange={setContent}
              placeholder="Start writing your content here... Use the toolbar above for formatting options!"
              theme={theme}
              height="400px"
              readOnly={readOnly}
              maxLength={maxLength}
            />
          </div>
        </div>

        {/* Features Overview */}
        <div className={`rounded-xl p-6 ${
          theme === 'dark' 
            ? 'bg-gray-800 border border-gray-700' 
            : 'bg-white border border-gray-200'
        } shadow-lg`}>
          <h3 className={`text-xl font-semibold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
            ✨ Key Features
          </h3>
          
          <div className={`grid md:grid-cols-2 gap-4 text-sm ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            <div className="space-y-2">
              <h4 className={`font-semibold ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}>
                📝 Text Formatting
              </h4>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Bold</strong>, <em>italic</em>, <u>underline</u>, and <s>strikethrough</s></li>
                <li>• Three heading levels (H1, H2, H3)</li>
                <li>• <code>Inline code</code> formatting</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className={`font-semibold ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}>
                📋 Structure & Lists
              </h4>
              <ul className="space-y-1 ml-4">
                <li>• Bullet and numbered lists</li>
                <li>• Blockquotes for emphasis</li>
                <li>• Clean paragraph formatting</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className={`font-semibold ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}>
                ⚡ User Experience
              </h4>
              <ul className="space-y-1 ml-4">
                <li>• Undo/redo functionality</li>
                <li>• Keyboard shortcuts</li>
                <li>• Character count display</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className={`font-semibold ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}>
                🎨 Customization
              </h4>
              <ul className="space-y-1 ml-4">
                <li>• Light and dark themes</li>
                <li>• Read-only mode</li>
                <li>• Character limits</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Usage Example */}
        <div className={`rounded-xl p-6 ${
          theme === 'dark' 
            ? 'bg-blue-900/20 border border-blue-800' 
            : 'bg-blue-50 border border-blue-200'
        }`}>
          <h3 className={`font-semibold mb-3 ${
            theme === 'dark' ? 'text-blue-300' : 'text-blue-800'
          }`}>
            💻 Usage Example
          </h3>
          <pre className={`text-sm overflow-x-auto ${
            theme === 'dark' ? 'text-blue-200' : 'text-blue-700'
          }`}>
            <code>{`import { DeviBasicEditor } from 'devi-rce';

function MyApp() {
  const [content, setContent] = useState('');
  
  return (
    <DeviBasicEditor
      content={content}
      onChange={setContent}
      placeholder="Start writing..."
      theme="light"
      height="300px"
      maxLength={1000}
    />
  );
}`}</code>
          </pre>
        </div>

        {/* Footer */}
        <div className={`text-center py-8 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <p>Perfect for blogs, notes, documentation, and everyday writing tasks!</p>
        </div>
      </div>
    </div>
  );
};

export default DeviBasicEditorExample;

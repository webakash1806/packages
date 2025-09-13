import React, { useState } from 'react';
import { DeviNotionEditor } from 'devi-rce';
import '../src/DeviEditors.css';

/**
 * Example demonstrating the DeviNotionEditor component
 * A comprehensive Notion-like editor with advanced features
 */
const DeviNotionEditorExample: React.FC = () => {
  const [content, setContent] = useState(`<h1>🚀 Welcome to DeviNotionEditor</h1>
<p>This is a <strong>comprehensive Notion-like editor</strong> with <em>advanced features</em> and <u>professional capabilities</u>. Experience the power of a full-featured rich text editor!</p>

<h2>✨ Advanced Formatting</h2>
<p>The editor supports <mark style="background-color: #fef08a;">highlighting</mark>, <sup>superscript</sup>, <sub>subscript</sub>, and much more:</p>
<ul>
  <li><strong>Bold text</strong> for emphasis</li>
  <li><em>Italic text</em> for style</li>
  <li><u>Underlined text</u> for importance</li>
  <li><s>Strikethrough text</s> for deletions</li>
  <li><code>Inline code</code> for technical content</li>
</ul>

<h3>🎨 Colors & Alignment</h3>
<p style="text-align: center; color: #3b82f6;">This text is centered and colored blue!</p>
<p style="text-align: right; color: #ef4444;">This text is right-aligned and red!</p>

<blockquote>
  <p>"The best way to predict the future is to create it." - Peter Drucker</p>
</blockquote>

<h3>💻 Code Blocks</h3>
<pre><code class="language-javascript">// Example code block
function createAwesomeContent() {
  const editor = new DeviNotionEditor();
  return editor.render({
    features: 'all',
    theme: 'professional'
  });
}</code></pre>

<h3>📊 Tables</h3>
<table>
  <tr>
    <th>Feature</th>
    <th>Basic Editor</th>
    <th>Notion Editor</th>
  </tr>
  <tr>
    <td>Text Formatting</td>
    <td>✅ Basic</td>
    <td>✅ Advanced</td>
  </tr>
  <tr>
    <td>Media Support</td>
    <td>❌</td>
    <td>✅ Images & Links</td>
  </tr>
  <tr>
    <td>Tables</td>
    <td>❌</td>
    <td>✅ Resizable</td>
  </tr>
</table>

<p>🎯 Perfect for professional documentation, content creation, and complex editing tasks!</p>`);

  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [readOnly, setReadOnly] = useState(false);
  const [enableBubbleMenu, setEnableBubbleMenu] = useState(true);
  const [enableFloatingMenu, setEnableFloatingMenu] = useState(true);
  const [showCharacterCount, setShowCharacterCount] = useState(true);
  const [maxLength, setMaxLength] = useState<number | undefined>(undefined);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className={`text-4xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
            🚀 DeviNotionEditor
          </h1>
          <p className={`text-lg max-w-3xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            A comprehensive Notion-like rich text editor with advanced features including 
            tables, media support, advanced formatting, and professional UI components.
          </p>
          
          {/* Controls */}
          <div className="flex justify-center gap-3 flex-wrap">
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
            
            <button
              onClick={() => setReadOnly(!readOnly)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                theme === 'dark'
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              } ${readOnly ? 'ring-2 ring-blue-500' : ''}`}
            >
              {readOnly ? '👁️ View' : '✏️ Edit'}
            </button>
            
            <button
              onClick={() => setEnableBubbleMenu(!enableBubbleMenu)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                theme === 'dark'
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              } ${enableBubbleMenu ? 'ring-2 ring-green-500' : ''}`}
            >
              💬 Bubble Menu
            </button>
            
            <button
              onClick={() => setEnableFloatingMenu(!enableFloatingMenu)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                theme === 'dark'
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              } ${enableFloatingMenu ? 'ring-2 ring-purple-500' : ''}`}
            >
              🎈 Float Menu
            </button>
            
            <button
              onClick={() => setShowCharacterCount(!showCharacterCount)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                theme === 'dark'
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              } ${showCharacterCount ? 'ring-2 ring-yellow-500' : ''}`}
            >
              📊 Stats
            </button>
            
            <button
              onClick={() => setMaxLength(maxLength ? undefined : 2000)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                theme === 'dark'
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              } ${maxLength ? 'ring-2 ring-red-500' : ''}`}
            >
              {maxLength ? '🔢 Limited' : '∞ Unlimited'}
            </button>
          </div>
        </div>

        {/* Main Editor */}
        <div className={`rounded-xl shadow-lg overflow-hidden ${
          theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <DeviNotionEditor
            content={content}
            onChange={setContent}
            placeholder="Type '/' for commands, or start writing your professional content..."
            theme={theme}
            height="600px"
            readOnly={readOnly}
            maxLength={maxLength}
            showCharacterCount={showCharacterCount}
            enableBubbleMenu={enableBubbleMenu}
            enableFloatingMenu={enableFloatingMenu}
            enableSlashCommands={true}
            enableDragDrop={true}
          />
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Text Formatting */}
          <div className={`rounded-xl p-6 ${
            theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          } shadow-lg`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <span className="text-xl">📝</span>
              </div>
              <h3 className={`font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                Advanced Formatting
              </h3>
            </div>
            <ul className={`space-y-2 text-sm ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <li>• Bold, italic, underline, strikethrough</li>
              <li>• Superscript & subscript</li>
              <li>• Text colors & highlighting</li>
              <li>• Six heading levels</li>
              <li>• Typography enhancements</li>
            </ul>
          </div>

          {/* Layout & Structure */}
          <div className={`rounded-xl p-6 ${
            theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          } shadow-lg`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <span className="text-xl">📋</span>
              </div>
              <h3 className={`font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                Layout & Structure
              </h3>
            </div>
            <ul className={`space-y-2 text-sm ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <li>• Text alignment (left, center, right, justify)</li>
              <li>• Bullet & numbered lists</li>
              <li>• Blockquotes with styling</li>
              <li>• Code blocks with syntax highlighting</li>
              <li>• Horizontal rules</li>
            </ul>
          </div>

          {/* Media & Tables */}
          <div className={`rounded-xl p-6 ${
            theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          } shadow-lg`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <span className="text-xl">🎨</span>
              </div>
              <h3 className={`font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                Media & Tables
              </h3>
            </div>
            <ul className={`space-y-2 text-sm ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <li>• Image insertion with alt text</li>
              <li>• Link management with previews</li>
              <li>• Resizable tables with headers</li>
              <li>• Table cell selection & editing</li>
              <li>• Media drag & drop support</li>
            </ul>
          </div>

          {/* User Experience */}
          <div className={`rounded-xl p-6 ${
            theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          } shadow-lg`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                <span className="text-xl">⚡</span>
              </div>
              <h3 className={`font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                User Experience
              </h3>
            </div>
            <ul className={`space-y-2 text-sm ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <li>• Bubble menu for quick formatting</li>
              <li>• Floating menu for new blocks</li>
              <li>• Keyboard shortcuts</li>
              <li>• Undo/redo with history</li>
              <li>• Focus indicators</li>
            </ul>
          </div>

          {/* Professional Features */}
          <div className={`rounded-xl p-6 ${
            theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          } shadow-lg`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                <span className="text-xl">🏆</span>
              </div>
              <h3 className={`font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                Professional Features
              </h3>
            </div>
            <ul className={`space-y-2 text-sm ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <li>• Character & word counting</li>
              <li>• Fullscreen editing mode</li>
              <li>• Content length limits</li>
              <li>• Read-only mode</li>
              <li>• Export & import capabilities</li>
            </ul>
          </div>

          {/* Customization */}
          <div className={`rounded-xl p-6 ${
            theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          } shadow-lg`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                <span className="text-xl">🎨</span>
              </div>
              <h3 className={`font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                Customization
              </h3>
            </div>
            <ul className={`space-y-2 text-sm ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <li>• Light & dark themes</li>
              <li>• Configurable toolbars</li>
              <li>• Custom color palettes</li>
              <li>• Responsive design</li>
              <li>• Accessibility support</li>
            </ul>
          </div>
        </div>

        {/* Usage Example */}
        <div className={`rounded-xl p-6 ${
          theme === 'dark' 
            ? 'bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-800' 
            : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200'
        }`}>
          <h3 className={`font-semibold mb-4 ${
            theme === 'dark' ? 'text-blue-300' : 'text-blue-800'
          }`}>
            💻 Usage Example
          </h3>
          <pre className={`text-sm overflow-x-auto p-4 rounded-lg ${
            theme === 'dark' ? 'bg-gray-800 text-blue-200' : 'bg-white text-blue-700'
          }`}>
            <code>{`import { DeviNotionEditor } from 'devi-rce';

function MyApp() {
  const [content, setContent] = useState('');
  
  return (
    <DeviNotionEditor
      content={content}
      onChange={setContent}
      placeholder="Type '/' for commands..."
      theme="light"
      height="500px"
      showCharacterCount={true}
      enableBubbleMenu={true}
      enableFloatingMenu={true}
      enableSlashCommands={true}
      maxLength={5000}
    />
  );
}`}</code>
          </pre>
        </div>

        {/* Footer */}
        <div className={`text-center py-8 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <p className="text-lg mb-2">🚀 Professional-grade editing for modern applications</p>
          <p className="text-sm">Perfect for documentation platforms, content management systems, and collaborative writing tools.</p>
        </div>
      </div>
    </div>
  );
};

export default DeviNotionEditorExample;

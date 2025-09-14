import React, { useState } from 'react';
import NotionLikeEditor from '../src/NotionLikeEditor';

const NotionLikeEditorExample: React.FC = () => {
  const [content, setContent] = useState(`
    <h1>Welcome to the Notion-like Editor! ✨</h1>
    
    <p>This is a powerful rich text editor with all the features you need:</p>

    <h2>🎨 Text Formatting</h2>
    <p>You can make text <strong>bold</strong>, <em>italic</em>, <u>underlined</u>, <s>strikethrough</s>, or <code>inline code</code>.</p>

    <h3>📝 Different Heading Levels</h3>
    <p>Use headings to organize your content structure.</p>

    <h2>📋 Lists and Organization</h2>
    
    <p><strong>Bullet Lists:</strong></p>
    <ul>
      <li>First item</li>
      <li>Second item with <strong>formatting</strong></li>
      <li>Third item</li>
    </ul>

    <p><strong>Numbered Lists:</strong></p>
    <ol>
      <li>Step one</li>
      <li>Step two</li>
      <li>Step three</li>
    </ol>

    <p><strong>To-do Lists:</strong></p>
    <ul data-type="taskList">
      <li data-type="taskItem" data-checked="false">
        <label contenteditable="false">
          <input type="checkbox"/>
          <span></span>
        </label>
        <div><p>Task to complete</p></div>
      </li>
      <li data-type="taskItem" data-checked="true">
        <label contenteditable="false">
          <input type="checkbox" checked/>
          <span></span>
        </label>
        <div><p>Completed task</p></div>
      </li>
    </ul>

    <h2>💬 Block Quotes</h2>
    <blockquote>
      <p>"The best way to predict the future is to create it." - Peter Drucker</p>
    </blockquote>

    <h2>💻 Code Blocks</h2>
    <pre><code>function greetUser(name) {
  return \`Hello, \${name}! Welcome to the editor.\`;
}

console.log(greetUser('Developer'));</code></pre>

    <h2>⚡ Interactive Features</h2>
    <p>Try these features:</p>
    <ul>
      <li>Type <code>/</code> to open the slash commands menu</li>
      <li>Select text to see the bubble menu</li>
      <li>Click on empty lines to see the + button</li>
      <li>Use the toolbar for quick formatting</li>
      <li>Export your content as JSON or Markdown</li>
    </ul>
    
    <p>Start typing below to explore all features! 🚀</p>
  `);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    console.log('Content updated:', newContent);
  };

  const [showContent, setShowContent] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Notion-like Editor Demo
          </h1>
          <p className="text-gray-600">
            A comprehensive rich text editor with all the features you need
          </p>
        </div>

        {/* Features Overview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">✨ Features Included:</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-sm">Headings (H1, H2, H3)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-sm">Bold, italic, underline, strikethrough</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-sm">Bullet & numbered lists</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-sm">Task lists (checkboxes)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-sm">Code blocks with syntax highlighting</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-sm">Block quotes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-sm">Tables</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-sm">Images & embeds</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-sm">Slash (/) commands</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-sm">Custom toolbar</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-sm">Drag & drop blocks</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-sm">JSON & Markdown export</span>
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <NotionLikeEditor
            content={content}
            onChange={handleContentChange}
            placeholder="Type '/' for commands or start writing..."
            showToolbar={true}
            height="600px"
            className="w-full"
          />
        </div>

        {/* Controls */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => setShowContent(!showContent)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            {showContent ? 'Hide' : 'Show'} HTML Content
          </button>
          
          <div className="text-sm text-gray-500">
            Character count: {content.replace(/<[^>]*>/g, '').length}
          </div>
        </div>

        {/* Content Display */}
        {showContent && (
          <div className="mt-6 bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">
              <code>{content}</code>
            </pre>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            🎯 How to Use
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Slash Commands:</h4>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>• Type <code className="bg-blue-200 px-1 rounded">/</code> to open command menu</li>
                <li>• Choose from Style, Insert, or Upload categories</li>
                <li>• Use arrow keys and Enter to navigate</li>
              </ul>

              <h4 className="font-medium text-blue-800 mb-2 mt-4">Block Management:</h4>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>• Hover over empty lines to see + button</li>
                <li>• Click + to add new blocks above current line</li>
                <li>• Use drag handles to reorder content</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Text Selection:</h4>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>• Select text to see bubble formatting menu</li>
                <li>• Quick access to bold, italic, strikethrough</li>
                <li>• Use toolbar for more formatting options</li>
              </ul>

              <h4 className="font-medium text-blue-800 mb-2 mt-4">Export Options:</h4>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>• Click download icons in toolbar</li>
                <li>• Export as JSON for data structure</li>
                <li>• Export as Markdown for portability</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Available Commands */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📋 Available Slash Commands
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-3">Style</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-gray-400">📄</span>
                  <span>Text</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-400">#</span>
                  <span>Heading 1</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-400">#</span>
                  <span>Heading 2</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-400">#</span>
                  <span>Heading 3</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span>Bullet List</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-400">1.</span>
                  <span>Numbered List</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-400">☐</span>
                  <span>To-do List</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-400">💬</span>
                  <span>Blockquote</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-400">&lt;/&gt;</span>
                  <span>Code Block</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 mb-3">Insert</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-gray-400">@</span>
                  <span>Mention</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-400">😊</span>
                  <span>Emoji</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-400">—</span>
                  <span>Separator</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 mb-3">Upload</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-gray-400">🖼️</span>
                  <span>Image</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotionLikeEditorExample;

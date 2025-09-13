import React, { useState } from 'react';
import { RichTextEditor } from 'devi-rce';
import '../RichTextEditor.css';

/**
 * Example showing how to customize enabled features
 */
const CustomFeaturesExample: React.FC = () => {
  const [basicContent, setBasicContent] = useState('<h2>Basic Editor</h2><p>This editor demonstrates <strong>basic formatting</strong> capabilities including <em>italic</em>, <u>underline</u>, and <s>strikethrough</s> text. Perfect for simple content creation.</p>');
  const [advancedContent, setAdvancedContent] = useState('<h2>Advanced Editor</h2><p>This editor showcases <strong style="color: #3b82f6;">advanced features</strong> including colors, media, and tables. <mark style="background-color: #fef08a;">Highlighted text</mark> and <a href="#">links</a> are also supported!</p>');
  const [minimalContent, setMinimalContent] = useState('<h2>Minimal Editor</h2><p>This editor focuses on <strong>essential features</strong> only:</p><ul><li>Basic text formatting</li><li>List creation</li><li>Simple content structure</li></ul>');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-4xl font-bold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              Custom Feature Configurations
            </h1>
            <p className={`text-lg ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Explore different editor configurations by enabling or disabling specific features.
            </p>
          </div>
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

        {/* Basic Editor */}
        <div className={`rounded-xl shadow-lg overflow-hidden border ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className={`px-6 py-4 border-b ${
            theme === 'dark' ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className={`text-xl font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>🎯 Basic Text Editor</h2>
                <p className={`text-sm mt-1 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Essential formatting tools for simple content creation
                </p>
              </div>
              <div className={`text-xs px-3 py-1 rounded-full ${
                theme === 'dark' ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700'
              }`}>
                Basic + History
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <RichTextEditor 
              content={basicContent}
              onChange={setBasicContent}
              placeholder="Focus on essential formatting - bold, italic, underline, strikethrough, and code..."
              theme={theme}
              height="250px"
              enabledFeatures={{
                basic: true,
                alignment: false,
                lists: false,
                colors: false,
                media: false,
                tables: false,
                history: true,
                fonts: false,
                headings: false,
                superscript: false,
                bubbleMenu: true,
                floatingMenu: false,
                characterCount: false,
                fullscreen: false,
                codeHighlight: false
              }}
            />
          </div>
        </div>

        {/* Advanced Editor */}
        <div className={`rounded-xl shadow-lg overflow-hidden border ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className={`px-6 py-4 border-b ${
            theme === 'dark' ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className={`text-xl font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>🚀 Advanced Content Editor</h2>
                <p className={`text-sm mt-1 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Rich media support with colors, links, images, and tables
                </p>
              </div>
              <div className={`text-xs px-3 py-1 rounded-full ${
                theme === 'dark' ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-700'
              }`}>
                Media + Colors + Tables
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <RichTextEditor 
              content={advancedContent}
              onChange={setAdvancedContent}
              placeholder="Create rich content with colors, media, and interactive tables..."
              theme={theme}
              height="300px"
              maxLength={2000}
              enabledFeatures={{
                basic: true,
                alignment: true,
                lists: false,
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
                codeHighlight: false
              }}
            />
          </div>
        </div>

        {/* Minimal Editor */}
        <div className={`rounded-xl shadow-lg overflow-hidden border ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className={`px-6 py-4 border-b ${
            theme === 'dark' ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className={`text-xl font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>🎨 Minimal Text Editor</h2>
                <p className={`text-sm mt-1 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Streamlined interface with just basic formatting and lists
                </p>
              </div>
              <div className={`text-xs px-3 py-1 rounded-full ${
                theme === 'dark' ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'
              }`}>
                Basic + Lists Only
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <RichTextEditor 
              content={minimalContent}
              onChange={setMinimalContent}
              placeholder="Clean, simple editor for basic text and list creation..."
              theme={theme}
              height="250px"
              toolbar="bottom"
              enabledFeatures={{
                basic: true,
                alignment: false,
                lists: true,
                colors: false,
                media: false,
                tables: false,
                history: false,
                fonts: false,
                headings: true,
                superscript: false,
                bubbleMenu: false,
                floatingMenu: true,
                characterCount: false,
                fullscreen: false,
                codeHighlight: false
              }}
            />
          </div>
        </div>

        {/* Feature Comparison */}
        <div className={`rounded-xl shadow-lg overflow-hidden ${
          theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <div className={`px-6 py-4 border-b ${
            theme === 'dark' ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'
          }`}>
            <h3 className={`text-xl font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>📊 Feature Comparison Matrix</h3>
            <p className={`text-sm mt-1 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              See exactly which features are enabled in each editor configuration
            </p>
          </div>
          
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className={`min-w-full rounded-lg overflow-hidden ${
                theme === 'dark' ? 'bg-gray-900' : 'bg-white'
              }`}>
                <thead>
                  <tr className={`border-b ${
                    theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
                  }`}>
                    <th className={`text-left p-4 font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-800'
                    }`}>Feature</th>
                    <th className={`text-center p-4 font-semibold ${
                      theme === 'dark' ? 'text-green-400' : 'text-green-700'
                    }`}>Basic</th>
                    <th className={`text-center p-4 font-semibold ${
                      theme === 'dark' ? 'text-purple-400' : 'text-purple-700'
                    }`}>Advanced</th>
                    <th className={`text-center p-4 font-semibold ${
                      theme === 'dark' ? 'text-blue-400' : 'text-blue-700'
                    }`}>Minimal</th>
                  </tr>
                </thead>
                <tbody className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                  {[
                    ['Basic Formatting (B/I/U/S)', '✅', '✅', '✅'],
                    ['Headings (H1-H6)', '❌', '✅', '✅'],
                    ['Text Alignment', '❌', '✅', '❌'],
                    ['Font Controls', '❌', '✅', '❌'],
                    ['Lists & Quotes', '❌', '❌', '✅'],
                    ['Colors & Highlighting', '❌', '✅', '❌'],
                    ['Links & Images', '❌', '✅', '❌'],
                    ['Tables', '❌', '✅', '❌'],
                    ['Code Blocks', '❌', '❌', '❌'],
                    ['Superscript/Subscript', '❌', '✅', '❌'],
                    ['Undo/Redo History', '✅', '✅', '❌'],
                    ['Bubble Menu', '✅', '✅', '❌'],
                    ['Floating Menu', '❌', '✅', '✅'],
                    ['Character Count', '❌', '✅', '❌'],
                    ['Fullscreen Mode', '❌', '✅', '❌'],
                    ['Toolbar Position', 'Top', 'Top', 'Bottom'],
                  ].map(([feature, basic, advanced, minimal], index) => (
                    <tr key={index} className={`border-b ${
                      theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
                    } hover:${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
                    } transition-colors`}>
                      <td className="p-4 font-medium">{feature}</td>
                      <td className="text-center p-4 text-lg">{basic}</td>
                      <td className="text-center p-4 text-lg">{advanced}</td>
                      <td className="text-center p-4 text-lg">{minimal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Configuration Guide */}
        <div className={`rounded-xl p-6 border-l-4 border-indigo-500 ${
          theme === 'dark' 
            ? 'bg-indigo-900/20 border-indigo-400' 
            : 'bg-indigo-50 border-indigo-500'
        }`}>
          <h3 className={`font-semibold mb-3 ${
            theme === 'dark' ? 'text-indigo-300' : 'text-indigo-800'
          }`}>🛠️ Configuration Tips</h3>
          <div className={`grid md:grid-cols-2 gap-4 text-sm ${
            theme === 'dark' ? 'text-indigo-200' : 'text-indigo-700'
          }`}>
            <div>
              <h4 className="font-medium mb-2">🎨 For Content Creation:</h4>
              <ul className="space-y-1">
                <li>• Enable all formatting options</li>
                <li>• Include media and table support</li>
                <li>• Add character counting</li>
                <li>• Enable fullscreen mode</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">📝 For Simple Notes:</h4>
              <ul className="space-y-1">
                <li>• Keep basic formatting only</li>
                <li>• Add list support if needed</li>
                <li>• Disable advanced features</li>
                <li>• Consider bottom toolbar</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomFeaturesExample;

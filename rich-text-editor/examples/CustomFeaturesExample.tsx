import React, { useState } from 'react';
import { RichTextEditor } from 'devi-rce';

/**
 * Example showing how to customize enabled features
 */
const CustomFeaturesExample: React.FC = () => {
  const [basicContent, setBasicContent] = useState('<p>This editor only has basic formatting enabled.</p>');
  const [advancedContent, setAdvancedContent] = useState('<p>This editor has colors, media, and tables enabled.</p>');
  const [minimalContent, setMinimalContent] = useState('<p>This editor only has text formatting and lists.</p>');

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Custom Features Example
        </h1>
        <p className="text-gray-600">
          Different configurations of the RichTextEditor showing how to enable/disable specific features.
        </p>
      </div>

      {/* Basic Editor */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Basic Text Editor
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Features: Basic formatting + History only
        </p>
        <RichTextEditor 
          content={basicContent}
          onChange={setBasicContent}
          placeholder="Basic formatting only..."
          enabledFeatures={{
            basic: true,
            alignment: false,
            lists: false,
            colors: false,
            media: false,
            tables: false,
            history: true,
            fonts: false
          }}
        />
      </div>

      {/* Advanced Editor */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Advanced Content Editor
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Features: Colors, Media, Tables + History
        </p>
        <RichTextEditor 
          content={advancedContent}
          onChange={setAdvancedContent}
          placeholder="Rich content with colors, media, and tables..."
          enabledFeatures={{
            basic: true,
            alignment: false,
            lists: false,
            colors: true,
            media: true,
            tables: true,
            history: true,
            fonts: false
          }}
        />
      </div>

      {/* Minimal Editor */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Minimal Text Editor
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Features: Basic formatting + Lists only
        </p>
        <RichTextEditor 
          content={minimalContent}
          onChange={setMinimalContent}
          placeholder="Simple text with lists..."
          enabledFeatures={{
            basic: true,
            alignment: false,
            lists: true,
            colors: false,
            media: false,
            tables: false,
            history: false,
            fonts: false
          }}
          className="border-2 border-blue-200"
        />
      </div>

      {/* Feature Comparison */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Feature Comparison</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Feature</th>
                <th className="text-center p-3">Basic</th>
                <th className="text-center p-3">Advanced</th>
                <th className="text-center p-3">Minimal</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3">Basic Formatting</td>
                <td className="text-center p-3">✅</td>
                <td className="text-center p-3">✅</td>
                <td className="text-center p-3">✅</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Text Alignment</td>
                <td className="text-center p-3">❌</td>
                <td className="text-center p-3">❌</td>
                <td className="text-center p-3">❌</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Lists</td>
                <td className="text-center p-3">❌</td>
                <td className="text-center p-3">❌</td>
                <td className="text-center p-3">✅</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Colors & Highlighting</td>
                <td className="text-center p-3">❌</td>
                <td className="text-center p-3">✅</td>
                <td className="text-center p-3">❌</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Links & Images</td>
                <td className="text-center p-3">❌</td>
                <td className="text-center p-3">✅</td>
                <td className="text-center p-3">❌</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Tables</td>
                <td className="text-center p-3">❌</td>
                <td className="text-center p-3">✅</td>
                <td className="text-center p-3">❌</td>
              </tr>
              <tr>
                <td className="p-3">Undo/Redo</td>
                <td className="text-center p-3">✅</td>
                <td className="text-center p-3">✅</td>
                <td className="text-center p-3">❌</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomFeaturesExample;

import React, { useState } from 'react';
import { RichTextEditor } from 'devi-rce';

/**
 * Basic example showing how to use the RichTextEditor component
 */
const BasicExample: React.FC = () => {
  const [content, setContent] = useState('<p>Welcome to Devi RCE! Start typing to see the magic happen.</p>');

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Basic Rich Text Editor Example
        </h1>
        <p className="text-gray-600">
          A simple implementation of the RichTextEditor with all default features enabled.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <RichTextEditor 
          content={content}
          onChange={setContent}
          placeholder="Start typing your content here..."
          className="min-h-[300px]"
        />
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-700 mb-2">Generated HTML:</h3>
        <pre className="text-sm bg-white p-3 rounded border overflow-x-auto text-gray-800">
          {content}
        </pre>
      </div>

      <div className="text-sm text-gray-500">
        <p>Features enabled: All (basic formatting, alignment, lists, colors, media, tables, history)</p>
      </div>
    </div>
  );
};

export default BasicExample;

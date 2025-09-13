import React, { useCallback, useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import FontFamily from '@tiptap/extension-font-family';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
  Type,
  Palette,
  Highlighter
} from 'lucide-react';

export interface RichTextEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  className?: string;
  readonly?: boolean;
  enabledFeatures?: {
    basic?: boolean;
    alignment?: boolean;
    lists?: boolean;
    colors?: boolean;
    media?: boolean;
    tables?: boolean;
    history?: boolean;
    fonts?: boolean;
  };
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content = '',
  onChange,
  placeholder = 'Start typing...',
  className = '',
  readonly = false,
  enabledFeatures = {
    basic: true,
    alignment: true,
    lists: true,
    colors: true,
    media: true,
    tables: true,
    history: true,
    fonts: false
  }
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [showLinkDialog, setShowLinkDialog] = useState(false);

  // Build extensions array based on enabled features
  const extensions: any[] = [
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false,
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false,
      },
    }),
  ];

  if (enabledFeatures.basic) {
    extensions.push(Underline);
  }

  if (enabledFeatures.alignment) {
    extensions.push(
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      })
    );
  }

  if (enabledFeatures.media) {
    extensions.push(
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 hover:text-blue-700 underline cursor-pointer',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      })
    );
  }

  if (enabledFeatures.tables) {
    extensions.push(
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell
    );
  }

  if (enabledFeatures.colors) {
    extensions.push(
      TextStyle,
      Color.configure({ types: [TextStyle.name, 'listItem'] }),
      Highlight.configure({ multicolor: true })
    );
  }

  if (enabledFeatures.fonts) {
    extensions.push(
      FontFamily.configure({
        types: ['textStyle'],
      })
    );
  }

  const editor = useEditor({
    extensions,
    content,
    editable: !readonly,
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  const setLink = useCallback(() => {
    if (!editor) return;

    if (linkUrl) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
    } else {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    }

    setShowLinkDialog(false);
    setLinkUrl('');
  }, [editor, linkUrl]);

  const addImage = useCallback(() => {
    if (!editor) return;

    const url = window.prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const addTable = useCallback(() => {
    if (!editor) return;

    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  }, [editor]);

  const colors = [
    '#000000', '#444444', '#666666', '#999999', '#cccccc', '#ffffff',
    '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#0099ff',
    '#9900ff', '#ff00ff', '#8B4513', '#2F4F4F', '#FFB6C1', '#98FB98'
  ];

  if (!editor) {
    return <div className="p-4 text-gray-500">Loading editor...</div>;
  }

  return (
    <div className={`border border-gray-300 rounded-lg overflow-hidden bg-white ${className}`}>
      {/* Toolbar */}
      {!readonly && (
        <div className="border-b border-gray-300 p-2 flex flex-wrap gap-1 bg-gray-50">
          {/* Text Formatting */}
          {enabledFeatures.basic && (
            <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 rounded hover:bg-gray-200 ${
                  editor.isActive('bold') ? 'bg-gray-300' : ''
                }`}
                title="Bold"
              >
                <Bold size={16} />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 rounded hover:bg-gray-200 ${
                  editor.isActive('italic') ? 'bg-gray-300' : ''
                }`}
                title="Italic"
              >
                <Italic size={16} />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`p-2 rounded hover:bg-gray-200 ${
                  editor.isActive('underline') ? 'bg-gray-300' : ''
                }`}
                title="Underline"
              >
                <UnderlineIcon size={16} />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`p-2 rounded hover:bg-gray-200 ${
                  editor.isActive('strike') ? 'bg-gray-300' : ''
                }`}
                title="Strikethrough"
              >
                <Strikethrough size={16} />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleCode().run()}
                className={`p-2 rounded hover:bg-gray-200 ${
                  editor.isActive('code') ? 'bg-gray-300' : ''
                }`}
                title="Code"
              >
                <Code size={16} />
              </button>
            </div>
          )}

          {/* Text Alignment */}
          {enabledFeatures.alignment && (
            <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
              <button
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                className={`p-2 rounded hover:bg-gray-200 ${
                  editor.isActive({ textAlign: 'left' }) ? 'bg-gray-300' : ''
                }`}
                title="Align Left"
              >
                <AlignLeft size={16} />
              </button>
              <button
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                className={`p-2 rounded hover:bg-gray-200 ${
                  editor.isActive({ textAlign: 'center' }) ? 'bg-gray-300' : ''
                }`}
                title="Align Center"
              >
                <AlignCenter size={16} />
              </button>
              <button
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                className={`p-2 rounded hover:bg-gray-200 ${
                  editor.isActive({ textAlign: 'right' }) ? 'bg-gray-300' : ''
                }`}
                title="Align Right"
              >
                <AlignRight size={16} />
              </button>
              <button
                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                className={`p-2 rounded hover:bg-gray-200 ${
                  editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-300' : ''
                }`}
                title="Justify"
              >
                <AlignJustify size={16} />
              </button>
            </div>
          )}

          {/* Lists */}
          {enabledFeatures.lists && (
            <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
              <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded hover:bg-gray-200 ${
                  editor.isActive('bulletList') ? 'bg-gray-300' : ''
                }`}
                title="Bullet List"
              >
                <List size={16} />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded hover:bg-gray-200 ${
                  editor.isActive('orderedList') ? 'bg-gray-300' : ''
                }`}
                title="Numbered List"
              >
                <ListOrdered size={16} />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-2 rounded hover:bg-gray-200 ${
                  editor.isActive('blockquote') ? 'bg-gray-300' : ''
                }`}
                title="Quote"
              >
                <Quote size={16} />
              </button>
            </div>
          )}

          {/* Colors and Highlighting */}
          {enabledFeatures.colors && (
            <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
              <div className="relative">
                <button
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  className="p-2 rounded hover:bg-gray-200"
                  title="Text Color"
                >
                  <Palette size={16} />
                </button>
                {showColorPicker && (
                  <div className="absolute top-10 left-0 z-10 bg-white border border-gray-300 rounded p-2 shadow-lg">
                    <div className="grid grid-cols-6 gap-1">
                      {colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => {
                            editor.chain().focus().setColor(color).run();
                            setShowColorPicker(false);
                          }}
                          className="w-6 h-6 border border-gray-300 rounded"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowHighlightPicker(!showHighlightPicker)}
                  className="p-2 rounded hover:bg-gray-200"
                  title="Highlight"
                >
                  <Highlighter size={16} />
                </button>
                {showHighlightPicker && (
                  <div className="absolute top-10 left-0 z-10 bg-white border border-gray-300 rounded p-2 shadow-lg">
                    <div className="grid grid-cols-6 gap-1">
                      {colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => {
                            editor.chain().focus().setHighlight({ color }).run();
                            setShowHighlightPicker(false);
                          }}
                          className="w-6 h-6 border border-gray-300 rounded"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Media and Links */}
          {enabledFeatures.media && (
            <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
              <button
                onClick={() => setShowLinkDialog(true)}
                className={`p-2 rounded hover:bg-gray-200 ${
                  editor.isActive('link') ? 'bg-gray-300' : ''
                }`}
                title="Add Link"
              >
                <LinkIcon size={16} />
              </button>
              <button
                onClick={addImage}
                className="p-2 rounded hover:bg-gray-200"
                title="Add Image"
              >
                <ImageIcon size={16} />
              </button>
              {enabledFeatures.tables && (
                <button
                  onClick={addTable}
                  className="p-2 rounded hover:bg-gray-200"
                  title="Add Table"
                >
                  <TableIcon size={16} />
                </button>
              )}
            </div>
          )}

          {/* Undo/Redo */}
          {enabledFeatures.history && (
            <div className="flex gap-1">
              <button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
                className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
                title="Undo"
              >
                <Undo size={16} />
              </button>
              <button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
                className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
                title="Redo"
              >
                <Redo size={16} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Editor Content */}
      <div className="min-h-[200px] p-4">
        <EditorContent 
          editor={editor} 
          className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto focus:outline-none"
          style={{ minHeight: '150px' }}
        />
      </div>

      {/* Link Dialog */}
      {showLinkDialog && enabledFeatures.media && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Add Link</h3>
            <input
              type="url"
              placeholder="Enter URL"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowLinkDialog(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={setLink}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;

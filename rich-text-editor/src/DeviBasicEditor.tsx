import React, { useState, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon,
  List, 
  ListOrdered,
  Quote,
  Undo2,
  Redo2,
  Type
} from 'lucide-react';

export interface DeviBasicEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  theme?: 'light' | 'dark';
  height?: string;
  className?: string;
  readOnly?: boolean;
  maxLength?: number;
}

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  title: string;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ 
  onClick, 
  isActive, 
  disabled, 
  children, 
  title 
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`
      p-2 rounded-md transition-all duration-200 flex items-center justify-center
      ${isActive 
        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' 
        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
      }
      ${disabled 
        ? 'opacity-50 cursor-not-allowed' 
        : 'hover:scale-105'
      }
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
    `}
  >
    {children}
  </button>
);

const DeviBasicEditor: React.FC<DeviBasicEditorProps> = ({
  content = '',
  onChange,
  placeholder = 'Start writing...',
  theme = 'light',
  height = '300px',
  className = '',
  readOnly = false,
  maxLength
}) => {
  const [characterCount, setCharacterCount] = useState(0);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3]
        }
      }),
      Underline,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const text = editor.getText();
      
      setCharacterCount(text.length);
      
      if (maxLength && text.length > maxLength) {
        return;
      }
      
      onChange?.(html);
    },
  });

  const handleUndo = useCallback(() => {
    editor?.chain().focus().undo().run();
  }, [editor]);

  const handleRedo = useCallback(() => {
    editor?.chain().focus().redo().run();
  }, [editor]);

  if (!editor) return null;

  const isMaxLengthReached = maxLength ? characterCount >= maxLength : false;

  return (
    <div className={`devi-basic-editor ${theme} ${className}`}>
      {/* Toolbar */}
      <div className="toolbar">
        <div className="toolbar-group">
          {/* Text Formatting */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            title="Bold (Ctrl+B)"
          >
            <Bold size={16} />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            title="Italic (Ctrl+I)"
          >
            <Italic size={16} />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive('underline')}
            title="Underline (Ctrl+U)"
          >
            <UnderlineIcon size={16} />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive('strike')}
            title="Strikethrough"
          >
            <span className="text-sm font-bold">S</span>
          </ToolbarButton>
        </div>

        <div className="toolbar-divider" />

        <div className="toolbar-group">
          {/* Headings */}
          <select
            value={
              editor.isActive('heading', { level: 1 }) ? 'h1' :
              editor.isActive('heading', { level: 2 }) ? 'h2' :
              editor.isActive('heading', { level: 3 }) ? 'h3' :
              'paragraph'
            }
            onChange={(e) => {
              const value = e.target.value;
              if (value === 'paragraph') {
                editor.chain().focus().setParagraph().run();
              } else {
                const level = parseInt(value.replace('h', '')) as 1 | 2 | 3;
                editor.chain().focus().toggleHeading({ level }).run();
              }
            }}
            className="heading-select"
            title="Text Style"
          >
            <option value="paragraph">Paragraph</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
          </select>
        </div>

        <div className="toolbar-divider" />

        <div className="toolbar-group">
          {/* Lists */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            title="Bullet List"
          >
            <List size={16} />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
            title="Numbered List"
          >
            <ListOrdered size={16} />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
            title="Quote"
          >
            <Quote size={16} />
          </ToolbarButton>
        </div>

        <div className="toolbar-divider" />

        <div className="toolbar-group">
          {/* History */}
          <ToolbarButton
            onClick={handleUndo}
            disabled={!editor.can().undo()}
            title="Undo (Ctrl+Z)"
          >
            <Undo2 size={16} />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={handleRedo}
            disabled={!editor.can().redo()}
            title="Redo (Ctrl+Y)"
          >
            <Redo2 size={16} />
          </ToolbarButton>
        </div>
      </div>

      {/* Editor */}
      <div 
        className="editor-container"
        style={{ height }}
      >
        <EditorContent editor={editor} />
      </div>

      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-info">
          <span className="character-count">
            {characterCount}
            {maxLength && ` / ${maxLength}`}
            {maxLength && isMaxLengthReached && (
              <span className="text-red-500 ml-1">• Limit reached</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DeviBasicEditor;

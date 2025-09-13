import React, { useState, useCallback, useRef } from 'react';
import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import FontFamily from '@tiptap/extension-font-family';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Typography from '@tiptap/extension-typography';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import Focus from '@tiptap/extension-focus';
import Dropcursor from '@tiptap/extension-dropcursor';
import Gapcursor from '@tiptap/extension-gapcursor';
import Mention from '@tiptap/extension-mention';
import { createLowlight, common } from 'lowlight';
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon,
  Strikethrough,
  Superscript as SuperscriptIcon,
  Subscript as SubscriptIcon,
  Highlighter,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
  Quote,
  Code,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Type,
  Palette,
  Undo2,
  Redo2,
  Maximize,
  Minimize,
  Plus,
  MoreHorizontal,
  ChevronDown,
  Hash,
  X,
  Check,
  ExternalLink,
  Trash2,
  Settings,
  Eye,
  EyeOff,
  Move,
  RotateCcw
} from 'lucide-react';

const lowlight = createLowlight(common);

export interface DeviNotionEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  theme?: 'light' | 'dark';
  height?: string;
  className?: string;
  readOnly?: boolean;
  maxLength?: number;
  showCharacterCount?: boolean;
  enableSlashCommands?: boolean;
  enableBubbleMenu?: boolean;
  enableFloatingMenu?: boolean;
  enableDragDrop?: boolean;
}

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  title: string;
  className?: string;
}

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ 
  onClick, 
  isActive, 
  disabled, 
  children, 
  title,
  className = ''
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`
      p-2 rounded-lg transition-all duration-200 flex items-center justify-center min-w-[36px] min-h-[36px]
      ${isActive 
        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 shadow-sm' 
        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
      }
      ${disabled 
        ? 'opacity-50 cursor-not-allowed' 
        : 'hover:scale-105 hover:shadow-sm'
      }
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
      ${className}
    `}
  >
    {children}
  </button>
);

const Dropdown: React.FC<DropdownProps> = ({ trigger, children, isOpen, onToggle }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={onToggle}>
        {trigger}
      </div>
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={onToggle}
          />
          <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20 min-w-[200px] max-h-[300px] overflow-auto">
            {children}
          </div>
        </>
      )}
    </div>
  );
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const DeviNotionEditor: React.FC<DeviNotionEditorProps> = ({
  content = '',
  onChange,
  placeholder = 'Type "/" for commands, or start writing...',
  theme = 'light',
  height = '400px',
  className = '',
  readOnly = false,
  maxLength,
  showCharacterCount = true,
  enableSlashCommands = true,
  enableBubbleMenu = true,
  enableFloatingMenu = true,
  enableDragDrop = true
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6]
        },
        codeBlock: false, // We'll use CodeBlockLowlight instead
      }),
      Underline,
      Superscript,
      Subscript,
      Highlight.configure({
        multicolor: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
      FontFamily.configure({
        types: ['textStyle'],
      }),
      TextStyle,
      Color.configure({
        types: ['textStyle'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 hover:text-blue-800 underline cursor-pointer',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg shadow-md',
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'rounded-lg bg-gray-100 dark:bg-gray-800 p-4 font-mono text-sm',
        },
      }),
      Typography,
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return `Heading ${node.attrs.level}`;
          }
          return placeholder;
        },
      }),
      CharacterCount.configure({
        limit: maxLength,
      }),
      Focus.configure({
        className: 'has-focus',
        mode: 'all',
      }),
      Dropcursor.configure({
        color: '#3b82f6',
      }),
      Gapcursor,
      Mention.configure({
        HTMLAttributes: {
          class: 'mention bg-blue-100 text-blue-800 px-2 py-1 rounded-md',
        },
      }),
    ],
    content,
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
  });

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
  };

  const insertLink = () => {
    if (linkUrl) {
      editor?.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl('');
      setIsLinkModalOpen(false);
    }
  };

  const insertImage = () => {
    if (imageUrl) {
      editor?.chain().focus().setImage({ src: imageUrl, alt: imageAlt }).run();
      setImageUrl('');
      setImageAlt('');
      setIsImageModalOpen(false);
    }
  };

  const insertTable = () => {
    editor?.chain().focus().insertTable({ rows: tableRows, cols: tableCols, withHeaderRow: true }).run();
    setIsTableModalOpen(false);
  };

  const fontFamilies = [
    'Inter', 'Arial', 'Helvetica', 'Times New Roman', 'Courier New', 'Georgia', 
    'Verdana', 'Roboto', 'Open Sans', 'Lato', 'Montserrat'
  ];

  const fontSizes = ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '48px'];
  
  const colors = [
    '#000000', '#374151', '#6B7280', '#9CA3AF', '#D1D5DB',
    '#EF4444', '#F97316', '#EAB308', '#22C55E', '#3B82F6',
    '#6366F1', '#8B5CF6', '#EC4899', '#F43F5E', '#06B6D4'
  ];

  const highlightColors = [
    '#FEF3C7', '#DBEAFE', '#D1FAE5', '#FCE7F3', '#E0E7FF',
    '#FED7D7', '#FED7AA', '#C7F9CC', '#B2F5EA', '#C3DAFE'
  ];

  if (!editor) return null;

  const characterCount = editor.storage.characterCount.characters();
  const wordCount = editor.storage.characterCount.words();
  const isMaxLengthReached = maxLength ? characterCount >= maxLength : false;

  return (
    <div 
      className={`devi-notion-editor ${theme} ${isFullscreen ? 'fullscreen' : ''} ${className}`}
      onClick={closeAllDropdowns}
    >
      {/* Main Toolbar */}
      <div className="main-toolbar">
        <div className="toolbar-section">
          {/* History */}
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Undo (Ctrl+Z)"
          >
            <Undo2 size={16} />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Redo (Ctrl+Y)"
          >
            <Redo2 size={16} />
          </ToolbarButton>
        </div>

        <div className="toolbar-divider" />

        {/* Text Style Dropdown */}
        <div className="toolbar-section">
          <Dropdown
            isOpen={activeDropdown === 'textstyle'}
            onToggle={() => toggleDropdown('textstyle')}
            trigger={
              <ToolbarButton
                onClick={() => {}}
                title="Text Style"
                className="px-3 gap-2"
              >
                <Type size={16} />
                <span className="text-sm">
                  {editor.isActive('heading', { level: 1 }) ? 'H1' :
                   editor.isActive('heading', { level: 2 }) ? 'H2' :
                   editor.isActive('heading', { level: 3 }) ? 'H3' :
                   editor.isActive('heading', { level: 4 }) ? 'H4' :
                   editor.isActive('heading', { level: 5 }) ? 'H5' :
                   editor.isActive('heading', { level: 6 }) ? 'H6' :
                   'Text'}
                </span>
                <ChevronDown size={14} />
              </ToolbarButton>
            }
          >
            {[
              { label: 'Text', action: () => editor.chain().focus().setParagraph().run() },
              { label: 'Heading 1', action: () => editor.chain().focus().toggleHeading({ level: 1 }).run() },
              { label: 'Heading 2', action: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
              { label: 'Heading 3', action: () => editor.chain().focus().toggleHeading({ level: 3 }).run() },
              { label: 'Heading 4', action: () => editor.chain().focus().toggleHeading({ level: 4 }).run() },
              { label: 'Heading 5', action: () => editor.chain().focus().toggleHeading({ level: 5 }).run() },
              { label: 'Heading 6', action: () => editor.chain().focus().toggleHeading({ level: 6 }).run() },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => { item.action(); closeAllDropdowns(); }}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
              >
                {item.label}
              </button>
            ))}
          </Dropdown>
        </div>

        <div className="toolbar-divider" />

        {/* Basic Formatting */}
        <div className="toolbar-section">
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
            <Strikethrough size={16} />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            isActive={editor.isActive('code')}
            title="Inline Code"
          >
            <Code size={16} />
          </ToolbarButton>
        </div>

        <div className="toolbar-divider" />

        {/* Advanced Formatting */}
        <div className="toolbar-section">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleSuperscript().run()}
            isActive={editor.isActive('superscript')}
            title="Superscript"
          >
            <SuperscriptIcon size={16} />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleSubscript().run()}
            isActive={editor.isActive('subscript')}
            title="Subscript"
          >
            <SubscriptIcon size={16} />
          </ToolbarButton>

          {/* Highlight Dropdown */}
          <Dropdown
            isOpen={activeDropdown === 'highlight'}
            onToggle={() => toggleDropdown('highlight')}
            trigger={
              <ToolbarButton
                onClick={() => {}}
                isActive={editor.isActive('highlight')}
                title="Highlight"
              >
                <Highlighter size={16} />
              </ToolbarButton>
            }
          >
            <div className="p-3">
              <div className="grid grid-cols-5 gap-2">
                {highlightColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      editor.chain().focus().toggleHighlight({ color }).run();
                      closeAllDropdowns();
                    }}
                    className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <button
                onClick={() => {
                  editor.chain().focus().unsetHighlight().run();
                  closeAllDropdowns();
                }}
                className="mt-2 w-full text-left px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                Remove highlight
              </button>
            </div>
          </Dropdown>

          {/* Text Color Dropdown */}
          <Dropdown
            isOpen={activeDropdown === 'color'}
            onToggle={() => toggleDropdown('color')}
            trigger={
              <ToolbarButton
                onClick={() => {}}
                title="Text Color"
              >
                <Palette size={16} />
              </ToolbarButton>
            }
          >
            <div className="p-3">
              <div className="grid grid-cols-5 gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      editor.chain().focus().setColor(color).run();
                      closeAllDropdowns();
                    }}
                    className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <button
                onClick={() => {
                  editor.chain().focus().unsetColor().run();
                  closeAllDropdowns();
                }}
                className="mt-2 w-full text-left px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                Default color
              </button>
            </div>
          </Dropdown>
        </div>

        <div className="toolbar-divider" />

        {/* Alignment */}
        <div className="toolbar-section">
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            isActive={editor.isActive({ textAlign: 'left' })}
            title="Align Left"
          >
            <AlignLeft size={16} />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            isActive={editor.isActive({ textAlign: 'center' })}
            title="Align Center"
          >
            <AlignCenter size={16} />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            isActive={editor.isActive({ textAlign: 'right' })}
            title="Align Right"
          >
            <AlignRight size={16} />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            isActive={editor.isActive({ textAlign: 'justify' })}
            title="Justify"
          >
            <AlignJustify size={16} />
          </ToolbarButton>
        </div>

        <div className="toolbar-divider" />

        {/* Lists and Blocks */}
        <div className="toolbar-section">
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

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            isActive={editor.isActive('codeBlock')}
            title="Code Block"
          >
            <Code size={16} />
          </ToolbarButton>
        </div>

        <div className="toolbar-divider" />

        {/* Media and Links */}
        <div className="toolbar-section">
          <ToolbarButton
            onClick={() => setIsLinkModalOpen(true)}
            isActive={editor.isActive('link')}
            title="Insert Link"
          >
            <LinkIcon size={16} />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => setIsImageModalOpen(true)}
            title="Insert Image"
          >
            <ImageIcon size={16} />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => setIsTableModalOpen(true)}
            isActive={editor.isActive('table')}
            title="Insert Table"
          >
            <TableIcon size={16} />
          </ToolbarButton>
        </div>

        <div className="toolbar-divider" />

        {/* View Options */}
        <div className="toolbar-section ml-auto">
          <ToolbarButton
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
          </ToolbarButton>
        </div>
      </div>

      {/* Editor Content */}
      <div 
        className="editor-container"
        style={{ 
          height: isFullscreen ? 'calc(100vh - 140px)' : height 
        }}
      >
        <EditorContent editor={editor} />

        {/* Bubble Menu */}
        {enableBubbleMenu && (
          <BubbleMenu
            editor={editor}
            className="bubble-menu"
          >
            <div className="flex items-center gap-1 p-1">
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                isActive={editor.isActive('bold')}
                title="Bold"
                className="p-1.5"
              >
                <Bold size={14} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                isActive={editor.isActive('italic')}
                title="Italic"
                className="p-1.5"
              >
                <Italic size={14} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleStrike().run()}
                isActive={editor.isActive('strike')}
                title="Strike"
                className="p-1.5"
              >
                <Strikethrough size={14} />
              </ToolbarButton>
            </div>
          </BubbleMenu>
        )}

        {/* Floating Menu */}
        {enableFloatingMenu && (
          <FloatingMenu
            editor={editor}
            className="floating-menu"
          >
            <div className="flex items-center gap-1 p-1">
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                title="Heading 1"
                className="p-1.5"
              >
                <Hash size={14} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                title="Bullet List"
                className="p-1.5"
              >
                <List size={14} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                title="Quote"
                className="p-1.5"
              >
                <Quote size={14} />
              </ToolbarButton>
            </div>
          </FloatingMenu>
        )}
      </div>

      {/* Status Bar */}
      {showCharacterCount && (
        <div className="status-bar">
          <div className="status-info">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {wordCount} words • {characterCount} characters
              {maxLength && ` / ${maxLength}`}
              {maxLength && isMaxLengthReached && (
                <span className="text-red-500 ml-2">• Limit reached</span>
              )}
            </span>
          </div>
        </div>
      )}

      {/* Modals */}
      <Modal
        isOpen={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(false)}
        title="Insert Link"
      >
        <div className="space-y-4">
          <input
            type="url"
            placeholder="Enter URL"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsLinkModalOpen(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={insertLink}
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
            >
              Insert Link
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        title="Insert Image"
      >
        <div className="space-y-4">
          <input
            type="url"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            autoFocus
          />
          <input
            type="text"
            placeholder="Alt text (optional)"
            value={imageAlt}
            onChange={(e) => setImageAlt(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={insertImage}
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
            >
              Insert Image
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isTableModalOpen}
        onClose={() => setIsTableModalOpen(false)}
        title="Insert Table"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Rows</label>
            <input
              type="number"
              min="1"
              max="20"
              value={tableRows}
              onChange={(e) => setTableRows(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Columns</label>
            <input
              type="number"
              min="1"
              max="10"
              value={tableCols}
              onChange={(e) => setTableCols(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsTableModalOpen(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={insertTable}
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
            >
              Insert Table
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeviNotionEditor;

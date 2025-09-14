import React, { useState, useCallback, useRef, useEffect } from 'react';
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
  Code,
  Quote,
  List,
  ListOrdered,
  CheckSquare,
  Image as ImageIcon,
  Link as LinkIcon,
  Table as TableIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Plus,
  GripVertical,
  Type,
  Hash,
  Smile,
  Minus,
  Download,
  Upload,
  Search,
  X,
  ChevronDown,
  Palette,
  Highlighter,
  MoreHorizontal
} from 'lucide-react';

const lowlight = createLowlight(common);

// Task List Extension
import { Node, mergeAttributes } from '@tiptap/core';
import { wrappingInputRule } from '@tiptap/core';

const TaskList = Node.create({
  name: 'taskList',
  
  addOptions() {
    return {
      itemTypeName: 'taskItem',
      HTMLAttributes: {},
    };
  },

  group: 'block list',
  content: 'taskItem+',
  parseHTML() {
    return [
      {
        tag: `ul[data-type="${this.name}"]`,
        priority: 51,
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'ul',
      mergeAttributes(HTMLAttributes, { 'data-type': this.name }),
      0,
    ];
  },

  addCommands() {
    return {
      toggleTaskList: () => ({ commands }: any) => {
        return commands.toggleList(this.name, this.options.itemTypeName);
      },
    } as any;
  },
});

const TaskItem = Node.create({
  name: 'taskItem',

  addOptions() {
    return {
      nested: false,
      HTMLAttributes: {},
    };
  },

  content() {
    return this.options.nested ? 'paragraph block*' : 'paragraph+';
  },

  defining: true,

  addAttributes() {
    return {
      checked: {
        default: false,
        keepOnSplit: false,
        parseHTML: element => element.getAttribute('data-checked') === 'true',
        renderHTML: attributes => ({
          'data-checked': attributes.checked,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: `li[data-type="${this.name}"]`,
        priority: 51,
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'li',
      mergeAttributes(HTMLAttributes, { 'data-type': this.name }),
      [
        'label',
        { contenteditable: 'false' },
        [
          'input',
          {
            type: 'checkbox',
            checked: node.attrs.checked ? 'checked' : null,
          },
        ],
        ['span'],
      ],
      ['div', 0],
    ];
  },

  addCommands() {
    return {
      toggleTaskItem: () => ({ commands }: any) => {
        return commands.updateAttributes(this.name, {
          checked: !this.editor.getAttributes(this.name).checked,
        });
      },
    } as any;
  },

  addKeyboardShortcuts() {
    const shortcuts = {
      Enter: () => this.editor.commands.splitListItem(this.name),
      'Shift-Tab': () => this.editor.commands.liftListItem(this.name),
    };

    if (!this.options.nested) {
      return shortcuts;
    }

    return {
      ...shortcuts,
      Tab: () => this.editor.commands.sinkListItem(this.name),
    };
  },
});

export interface NotionLikeEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  className?: string;
  showToolbar?: boolean;
  height?: string;
}

interface BlockCommand {
  id: string;
  title: string;
  description?: string;
  icon: React.ReactNode;
  category: 'Style' | 'Insert' | 'Upload';
  action: () => void;
}

interface AddBlockMenuProps {
  editor: any;
  isOpen: boolean;
  onClose: () => void;
  position: { x: number; y: number };
}

interface DragHandleProps {
  onAddBlock: () => void;
}

const DragHandle: React.FC<DragHandleProps> = ({ onAddBlock }) => {
  return (
    <div className="absolute left-0 top-0 flex items-center -ml-12 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      <button
        onClick={onAddBlock}
        className="flex items-center justify-center w-6 h-6 bg-white hover:bg-gray-50 border border-gray-200 rounded shadow-sm transition-all duration-200 hover:shadow-md mr-1"
        title="Add block"
      >
        <Plus size={12} className="text-gray-500" />
      </button>
      
      <div
        className="flex items-center justify-center w-6 h-6 hover:bg-gray-100 rounded cursor-grab active:cursor-grabbing transition-colors duration-200"
        draggable
        title="Drag to move"
      >
        <GripVertical size={12} className="text-gray-400" />
      </div>
    </div>
  );
};

const AddBlockMenu: React.FC<AddBlockMenuProps> = ({ editor, isOpen, onClose, position }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: BlockCommand[] = [
    // Style Category
    {
      id: 'text',
      title: 'Text',
      description: 'Start writing with plain text',
      icon: <Type size={16} />,
      category: 'Style',
      action: () => {
        editor.chain().focus().setParagraph().run();
        onClose();
      }
    },
    {
      id: 'heading-1',
      title: 'Heading 1',
      description: 'Big section heading',
      icon: <Hash size={16} />,
      category: 'Style',
      action: () => {
        editor.chain().focus().toggleHeading({ level: 1 }).run();
        onClose();
      }
    },
    {
      id: 'heading-2',
      title: 'Heading 2',
      description: 'Medium section heading',
      icon: <Hash size={16} />,
      category: 'Style',
      action: () => {
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        onClose();
      }
    },
    {
      id: 'heading-3',
      title: 'Heading 3',
      description: 'Small section heading',
      icon: <Hash size={16} />,
      category: 'Style',
      action: () => {
        editor.chain().focus().toggleHeading({ level: 3 }).run();
        onClose();
      }
    },
    {
      id: 'bullet-list',
      title: 'Bullet List',
      description: 'Create a simple bullet list',
      icon: <List size={16} />,
      category: 'Style',
      action: () => {
        editor.chain().focus().toggleBulletList().run();
        onClose();
      }
    },
    {
      id: 'numbered-list',
      title: 'Numbered List',
      description: 'Create a list with numbering',
      icon: <ListOrdered size={16} />,
      category: 'Style',
      action: () => {
        editor.chain().focus().toggleOrderedList().run();
        onClose();
      }
    },
    {
      id: 'todo-list',
      title: 'To-do List',
      description: 'Track tasks with a to-do list',
      icon: <CheckSquare size={16} />,
      category: 'Style',
      action: () => {
        editor.chain().focus().toggleList('taskList', 'taskItem').run();
        onClose();
      }
    },
    {
      id: 'blockquote',
      title: 'Blockquote',
      description: 'Capture a quote',
      icon: <Quote size={16} />,
      category: 'Style',
      action: () => {
        editor.chain().focus().toggleBlockquote().run();
        onClose();
      }
    },
    {
      id: 'code-block',
      title: 'Code Block',
      description: 'Capture a code snippet',
      icon: <Code size={16} />,
      category: 'Style',
      action: () => {
        editor.chain().focus().toggleCodeBlock().run();
        onClose();
      }
    },
    
    // Insert Category
    {
      id: 'mention',
      title: 'Mention',
      description: 'Mention a person',
      icon: <span className="text-sm">@</span>,
      category: 'Insert',
      action: () => {
        editor.chain().focus().insertContent('@').run();
        onClose();
      }
    },
    {
      id: 'emoji',
      title: 'Emoji',
      description: 'Express yourself with emojis',
      icon: <Smile size={16} />,
      category: 'Insert',
      action: () => {
        editor.chain().focus().insertContent('😊').run();
        onClose();
      }
    },
    {
      id: 'separator',
      title: 'Separator',
      description: 'Divide content with a line',
      icon: <Minus size={16} />,
      category: 'Insert',
      action: () => {
        editor.chain().focus().setHorizontalRule().run();
        onClose();
      }
    },
    
    // Upload Category
    {
      id: 'image',
      title: 'Image',
      description: 'Upload or embed with link',
      icon: <ImageIcon size={16} />,
      category: 'Upload',
      action: () => {
        const url = prompt('Enter image URL:');
        if (url) {
          editor.chain().focus().setImage({ src: url }).run();
        }
        onClose();
      }
    }
  ];

  const filteredCommands = commands.filter(cmd =>
    cmd.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cmd.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, BlockCommand[]>);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        filteredCommands[selectedIndex]?.action();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div 
        className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 w-80 max-h-96 overflow-hidden"
        style={{
          left: Math.min(position.x, window.innerWidth - 320),
          top: Math.min(position.y, window.innerHeight - 400)
        }}
      >
        {/* Search Header */}
        <div className="p-3 border-b border-gray-100">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Filter..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setSelectedIndex(0);
              }}
              className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Commands */}
        <div className="max-h-80 overflow-y-auto">
          {Object.entries(groupedCommands).map(([category, categoryCommands]) => (
            <div key={category}>
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50 sticky top-0">
                {category}
              </div>
              {categoryCommands.map((command, index) => {
                const globalIndex = filteredCommands.indexOf(command);
                return (
                  <button
                    key={command.id}
                    onClick={command.action}
                    className={`w-full flex items-center gap-3 px-3 py-3 text-left hover:bg-gray-50 transition-colors ${
                      globalIndex === selectedIndex ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex-shrink-0 text-gray-500">
                      {command.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 text-sm">
                        {command.title}
                      </div>
                      {command.description && (
                        <div className="text-gray-500 text-xs mt-1">
                          {command.description}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const NotionLikeEditor: React.FC<NotionLikeEditorProps> = ({
  content = '',
  onChange,
  placeholder = 'Type "/" for commands...',
  className = '',
  showToolbar = true,
  height = '500px'
}) => {
  const [blockMenuOpen, setBlockMenuOpen] = useState(false);
  const [blockMenuPosition, setBlockMenuPosition] = useState({ x: 0, y: 0 });
  const [currentBlockType, setCurrentBlockType] = useState('paragraph');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3]
        },
        codeBlock: false, // We'll use CodeBlockLowlight instead
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
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
          class: 'max-w-full h-auto rounded-lg',
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
          class: 'rounded-lg bg-gray-100 p-4 font-mono text-sm',
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
      CharacterCount,
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
          class: 'mention bg-blue-100 text-blue-800 px-2 py-1 rounded',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
    onSelectionUpdate: ({ editor }) => {
      // Detect slash command
      const { $head } = editor.state.selection;
      const textBefore = $head.parent.textBetween(
        Math.max(0, $head.parentOffset - 1),
        $head.parentOffset
      );
      
      if (textBefore === '/' && !blockMenuOpen) {
        const pos = editor.view.coordsAtPos($head.pos);
        setBlockMenuPosition({ x: pos.left, y: pos.bottom });
        setBlockMenuOpen(true);
      }

      // Update current block type
      if (editor.isActive('heading', { level: 1 })) {
        setCurrentBlockType('heading1');
      } else if (editor.isActive('heading', { level: 2 })) {
        setCurrentBlockType('heading2');
      } else if (editor.isActive('heading', { level: 3 })) {
        setCurrentBlockType('heading3');
      } else if (editor.isActive('bulletList')) {
        setCurrentBlockType('bulletList');
      } else if (editor.isActive('orderedList')) {
        setCurrentBlockType('orderedList');
      } else if (editor.isActive('taskList')) {
        setCurrentBlockType('taskList');
      } else if (editor.isActive('blockquote')) {
        setCurrentBlockType('blockquote');
      } else if (editor.isActive('codeBlock')) {
        setCurrentBlockType('codeBlock');
      } else {
        setCurrentBlockType('paragraph');
      }
    }
  });

  const handleAddBlock = useCallback(() => {
    if (editor) {
      const pos = editor.view.coordsAtPos(editor.state.selection.head);
      setBlockMenuPosition({ x: pos.left, y: pos.bottom });
      setBlockMenuOpen(true);
    }
  }, [editor]);

  const exportAsJSON = useCallback(() => {
    if (editor) {
      const json = editor.getJSON();
      const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'content.json';
      a.click();
      URL.revokeObjectURL(url);
    }
  }, [editor]);

  const exportAsMarkdown = useCallback(() => {
    if (editor) {
      // Simple HTML to Markdown conversion
      const html = editor.getHTML();
      let markdown = html
        .replace(/<h1>/g, '# ')
        .replace(/<\/h1>/g, '\n\n')
        .replace(/<h2>/g, '## ')
        .replace(/<\/h2>/g, '\n\n')
        .replace(/<h3>/g, '### ')
        .replace(/<\/h3>/g, '\n\n')
        .replace(/<p>/g, '')
        .replace(/<\/p>/g, '\n\n')
        .replace(/<strong>/g, '**')
        .replace(/<\/strong>/g, '**')
        .replace(/<em>/g, '*')
        .replace(/<\/em>/g, '*')
        .replace(/<u>/g, '')
        .replace(/<\/u>/g, '')
        .replace(/<s>/g, '~~')
        .replace(/<\/s>/g, '~~')
        .replace(/<code>/g, '`')
        .replace(/<\/code>/g, '`')
        .replace(/<blockquote>/g, '> ')
        .replace(/<\/blockquote>/g, '\n\n')
        .replace(/<ul>/g, '')
        .replace(/<\/ul>/g, '\n')
        .replace(/<ol>/g, '')
        .replace(/<\/ol>/g, '\n')
        .replace(/<li>/g, '- ')
        .replace(/<\/li>/g, '\n')
        .replace(/<br>/g, '\n')
        .replace(/<hr>/g, '\n---\n')
        .replace(/<[^>]*>/g, ''); // Remove remaining HTML tags

      const blob = new Blob([markdown], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'content.md';
      a.click();
      URL.revokeObjectURL(url);
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className={`notion-editor ${className}`}>
      {/* Toolbar */}
      {showToolbar && (
        <div className="border-b border-gray-200 p-3 bg-white">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Block Type Selector */}
            <div className="relative">
              <select
                value={currentBlockType}
                onChange={(e) => {
                  const value = e.target.value;
                  switch (value) {
                    case 'paragraph':
                      editor.chain().focus().setParagraph().run();
                      break;
                    case 'heading1':
                      editor.chain().focus().toggleHeading({ level: 1 }).run();
                      break;
                    case 'heading2':
                      editor.chain().focus().toggleHeading({ level: 2 }).run();
                      break;
                    case 'heading3':
                      editor.chain().focus().toggleHeading({ level: 3 }).run();
                      break;
                    case 'bulletList':
                      editor.chain().focus().toggleBulletList().run();
                      break;
                    case 'orderedList':
                      editor.chain().focus().toggleOrderedList().run();
                      break;
                    case 'taskList':
                      editor.chain().focus().toggleList('taskList', 'taskItem').run();
                      break;
                    case 'blockquote':
                      editor.chain().focus().toggleBlockquote().run();
                      break;
                    case 'codeBlock':
                      editor.chain().focus().toggleCodeBlock().run();
                      break;
                  }
                }}
                className="px-3 py-1.5 border border-gray-200 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="paragraph">Text</option>
                <option value="heading1">Heading 1</option>
                <option value="heading2">Heading 2</option>
                <option value="heading3">Heading 3</option>
                <option value="bulletList">Bullet List</option>
                <option value="orderedList">Numbered List</option>
                <option value="taskList">To-do List</option>
                <option value="blockquote">Quote</option>
                <option value="codeBlock">Code</option>
              </select>
            </div>

            <div className="w-px h-6 bg-gray-200" />

            {/* Text Formatting */}
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
              title="Bold"
            >
              <Bold size={16} />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
              title="Italic"
            >
              <Italic size={16} />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}
              title="Underline"
            >
              <UnderlineIcon size={16} />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('strike') ? 'bg-gray-200' : ''}`}
              title="Strikethrough"
            >
              <Strikethrough size={16} />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('code') ? 'bg-gray-200' : ''}`}
              title="Code"
            >
              <Code size={16} />
            </button>

            <div className="w-px h-6 bg-gray-200" />

            {/* Alignment */}
            <button
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              className={`p-2 rounded hover:bg-gray-100 ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''}`}
              title="Align Left"
            >
              <AlignLeft size={16} />
            </button>

            <button
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              className={`p-2 rounded hover:bg-gray-100 ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''}`}
              title="Align Center"
            >
              <AlignCenter size={16} />
            </button>

            <button
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              className={`p-2 rounded hover:bg-gray-100 ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''}`}
              title="Align Right"
            >
              <AlignRight size={16} />
            </button>

            <div className="w-px h-6 bg-gray-200" />

            {/* Insert Elements */}
            <button
              onClick={() => {
                const url = prompt('Enter link URL:');
                if (url) {
                  editor.chain().focus().setLink({ href: url }).run();
                }
              }}
              className="p-2 rounded hover:bg-gray-100"
              title="Insert Link"
            >
              <LinkIcon size={16} />
            </button>

            <button
              onClick={() => {
                const url = prompt('Enter image URL:');
                if (url) {
                  editor.chain().focus().setImage({ src: url }).run();
                }
              }}
              className="p-2 rounded hover:bg-gray-100"
              title="Insert Image"
            >
              <ImageIcon size={16} />
            </button>

            <button
              onClick={() => {
                editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
              }}
              className="p-2 rounded hover:bg-gray-100"
              title="Insert Table"
            >
              <TableIcon size={16} />
            </button>

            <div className="w-px h-6 bg-gray-200 ml-auto" />

            {/* Export Options */}
            <button
              onClick={exportAsJSON}
              className="p-2 rounded hover:bg-gray-100"
              title="Export as JSON"
            >
              <Download size={16} />
            </button>

            <button
              onClick={exportAsMarkdown}
              className="p-2 rounded hover:bg-gray-100"
              title="Export as Markdown"
            >
              <Download size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Editor Content */}
      <div 
        className="relative"
        style={{ height }}
      >
        <div className="h-full overflow-y-auto">
          <EditorContent 
            editor={editor} 
            className="notion-content p-4 h-full focus:outline-none"
          />
          
          {/* Floating Menu for Empty Lines */}
          <FloatingMenu
            editor={editor}
            tippyOptions={{ duration: 100, placement: 'left-start' }}
          >
            <DragHandle onAddBlock={handleAddBlock} />
          </FloatingMenu>

          {/* Bubble Menu for Selected Text */}
          <BubbleMenu
            editor={editor}
            tippyOptions={{ duration: 100 }}
          >
            <div className="flex items-center gap-1 bg-gray-900 text-white px-2 py-1 rounded shadow-lg">
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-1.5 rounded hover:bg-gray-700 ${editor.isActive('bold') ? 'bg-gray-700' : ''}`}
              >
                <Bold size={14} />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-1.5 rounded hover:bg-gray-700 ${editor.isActive('italic') ? 'bg-gray-700' : ''}`}
              >
                <Italic size={14} />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`p-1.5 rounded hover:bg-gray-700 ${editor.isActive('strike') ? 'bg-gray-700' : ''}`}
              >
                <Strikethrough size={14} />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleCode().run()}
                className={`p-1.5 rounded hover:bg-gray-700 ${editor.isActive('code') ? 'bg-gray-700' : ''}`}
              >
                <Code size={14} />
              </button>
            </div>
          </BubbleMenu>
        </div>
      </div>

      {/* Block Menu */}
      <AddBlockMenu
        editor={editor}
        isOpen={blockMenuOpen}
        onClose={() => setBlockMenuOpen(false)}
        position={blockMenuPosition}
      />

      <style>{`
        .notion-editor {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: white;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .notion-content .ProseMirror {
          outline: none;
          height: 100%;
        }

        .notion-content .ProseMirror > * {
          position: relative;
        }

        .notion-content .ProseMirror > *:hover {
          @apply group;
        }

        .notion-content h1 {
          font-size: 2rem;
          font-weight: 700;
          margin: 1.5rem 0 0.5rem 0;
          line-height: 1.2;
        }

        .notion-content h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 1.25rem 0 0.5rem 0;
          line-height: 1.3;
        }

        .notion-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 1rem 0 0.5rem 0;
          line-height: 1.4;
        }

        .notion-content p {
          margin: 0.75rem 0;
          line-height: 1.6;
        }

        .notion-content ul, .notion-content ol {
          padding-left: 1.5rem;
          margin: 1rem 0;
        }

        .notion-content li {
          margin: 0.25rem 0;
          line-height: 1.5;
        }

        .notion-content ul[data-type="taskList"] {
          list-style: none;
          padding-left: 0;
        }

        .notion-content ul[data-type="taskList"] li {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
        }

        .notion-content ul[data-type="taskList"] li label {
          display: flex;
          align-items: center;
          user-select: none;
        }

        .notion-content ul[data-type="taskList"] li input[type="checkbox"] {
          margin: 0;
          width: 1rem;
          height: 1rem;
        }

        .notion-content blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: #6b7280;
        }

        .notion-content pre {
          background: #f3f4f6;
          border-radius: 6px;
          padding: 1rem;
          margin: 1rem 0;
          overflow-x: auto;
          font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
          font-size: 0.875rem;
        }

        .notion-content code {
          background: #f3f4f6;
          padding: 0.125rem 0.25rem;
          border-radius: 3px;
          font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
          font-size: 0.875em;
        }

        .notion-content img {
          max-width: 100%;
          height: auto;
          margin: 1rem 0;
          border-radius: 6px;
        }

        .notion-content table {
          border-collapse: collapse;
          width: 100%;
          margin: 1rem 0;
        }

        .notion-content table td, .notion-content table th {
          border: 1px solid #e5e7eb;
          padding: 0.5rem;
          text-align: left;
        }

        .notion-content table th {
          background: #f9fafb;
          font-weight: 600;
        }

        .notion-content .is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #9ca3af;
          pointer-events: none;
          height: 0;
        }

        .notion-content .has-focus {
          border-radius: 4px;
          box-shadow: 0 0 0 2px #3b82f6;
        }
      `}</style>
    </div>
  );
};

export default NotionLikeEditor;

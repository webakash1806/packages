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
import { createLowlight, common } from 'lowlight';
import { 
  Plus, 
  GripVertical, 
  Hash,
  Type,
  List,
  ListOrdered,
  Quote,
  Code,
  Image as ImageIcon,
  Link as LinkIcon,
  Table as TableIcon,
  CheckSquare,
  Sparkles,
  Upload,
  ExternalLink,
  X,
  Check,
  Bold,
  Italic,
  Strikethrough,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  RotateCw,
  Move3D,
  Search
} from 'lucide-react';

const lowlight = createLowlight(common);

export interface EnhancedNotionEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  theme?: 'light' | 'dark';
  height?: string;
  className?: string;
  readOnly?: boolean;
}

interface SlashCommand {
  id: string;
  title: string;
  description?: string;
  icon: React.ReactNode;
  category: 'AI' | 'Style' | 'Media' | 'Lists';
  action: () => void;
}

interface DragHandleProps {
  onAddBlock: () => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

interface ResizableImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  onResize?: (width: number, height: number) => void;
  onSelect?: () => void;
  selected?: boolean;
}

const DragHandle: React.FC<DragHandleProps> = ({ onAddBlock, onDragStart, onDragEnd }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="absolute left-0 top-0 flex items-center -ml-14 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={onAddBlock}
        className="flex items-center justify-center w-8 h-8 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md mr-1"
        title="Add block"
      >
        <Plus size={14} className="text-gray-500 dark:text-gray-400" />
      </button>
      
      <div
        className="flex items-center justify-center w-8 h-8 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-grab active:cursor-grabbing transition-colors duration-200"
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        title="Drag to move"
      >
        <GripVertical size={14} className="text-gray-400 dark:text-gray-500" />
      </div>
    </div>
  );
};

const ResizableImage: React.FC<ResizableImageProps> = ({ 
  src, 
  alt = '', 
  width = 400, 
  height = 300, 
  onResize,
  onSelect,
  selected = false 
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startSize, setStartSize] = useState({ width: 0, height: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
    
    setIsResizing(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    setStartSize({ width, height });
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      
      const deltaX = e.clientX - startPos.x;
      const deltaY = e.clientY - startPos.y;
      const aspectRatio = startSize.width / startSize.height;
      
      let newWidth = startSize.width + deltaX;
      let newHeight = newWidth / aspectRatio;
      
      // Minimum size constraints
      newWidth = Math.max(100, Math.min(800, newWidth));
      newHeight = newWidth / aspectRatio;
      
      onResize?.(newWidth, newHeight);
    };
    
    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="relative inline-block group">
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        onClick={onSelect}
        className={`
          max-w-full h-auto rounded-lg shadow-lg cursor-pointer transition-all duration-200
          ${selected ? 'ring-2 ring-blue-500 ring-offset-2' : 'hover:shadow-xl'}
        `}
      />
      
      {selected && (
        <>
          {/* Resize handles */}
          <div 
            className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 rounded-full cursor-se-resize -mb-2 -mr-2 opacity-80 hover:opacity-100 transition-opacity"
            onMouseDown={handleMouseDown}
          />
          
          {/* Corner indicators */}
          <div className="absolute top-0 left-0 w-2 h-2 bg-blue-500 rounded-full -mt-1 -ml-1" />
          <div className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full -mt-1 -mr-1" />
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-blue-500 rounded-full -mb-1 -ml-1" />
        </>
      )}
    </div>
  );
};

const SlashCommandMenu: React.FC<{
  editor: any;
  isOpen: boolean;
  onClose: () => void;
  position: { x: number; y: number };
}> = ({ editor, isOpen, onClose, position }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: SlashCommand[] = [
    // AI Category
    {
      id: 'continue-writing',
      title: 'Continue Writing',
      description: 'Let AI continue your content',
      icon: <Sparkles size={16} className="text-purple-500" />,
      category: 'AI',
      action: () => {
        // Placeholder for AI continue writing
        editor.chain().focus().insertContent(' [AI will continue writing here...]').run();
        onClose();
      }
    },
    {
      id: 'ask-ai',
      title: 'Ask AI',
      description: 'Get help from AI assistant',
      icon: <Sparkles size={16} className="text-purple-500" />,
      category: 'AI',
      action: () => {
        // Placeholder for AI assistance
        editor.chain().focus().insertContent(' [Ask AI anything...]').run();
        onClose();
      }
    },
    
    // Style Category
    {
      id: 'text',
      title: 'Text',
      description: 'Regular paragraph text',
      icon: <Type size={16} className="text-gray-600" />,
      category: 'Style',
      action: () => {
        editor.chain().focus().setParagraph().run();
        onClose();
      }
    },
    {
      id: 'heading-1',
      title: 'Heading 1',
      description: 'Large section heading',
      icon: <Hash size={16} className="text-gray-600" />,
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
      icon: <Hash size={16} className="text-gray-600" />,
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
      icon: <Hash size={16} className="text-gray-600" />,
      category: 'Style',
      action: () => {
        editor.chain().focus().toggleHeading({ level: 3 }).run();
        onClose();
      }
    },
    
    // Lists Category
    {
      id: 'bullet-list',
      title: 'Bullet List',
      description: 'Create a bulleted list',
      icon: <List size={16} className="text-gray-600" />,
      category: 'Lists',
      action: () => {
        editor.chain().focus().toggleBulletList().run();
        onClose();
      }
    },
    {
      id: 'numbered-list',
      title: 'Numbered List',
      description: 'Create a numbered list',
      icon: <ListOrdered size={16} className="text-gray-600" />,
      category: 'Lists',
      action: () => {
        editor.chain().focus().toggleOrderedList().run();
        onClose();
      }
    },
    {
      id: 'todo-list',
      title: 'To-do List',
      description: 'Create a task list',
      icon: <CheckSquare size={16} className="text-gray-600" />,
      category: 'Lists',
      action: () => {
        editor.chain().focus().insertContent('<ul data-type="taskList"><li data-type="taskItem" data-checked="false">Task item</li></ul>').run();
        onClose();
      }
    },
    
    // Media Category
    {
      id: 'blockquote',
      title: 'Blockquote',
      description: 'Create a quote block',
      icon: <Quote size={16} className="text-gray-600" />,
      category: 'Media',
      action: () => {
        editor.chain().focus().toggleBlockquote().run();
        onClose();
      }
    },
    {
      id: 'code-block',
      title: 'Code Block',
      description: 'Insert a code block',
      icon: <Code size={16} className="text-gray-600" />,
      category: 'Media',
      action: () => {
        editor.chain().focus().toggleCodeBlock().run();
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
  }, {} as Record<string, SlashCommand[]>);

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
        className="fixed z-50 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 w-80 max-h-96 overflow-hidden"
        style={{
          left: Math.min(position.x, window.innerWidth - 320),
          top: Math.min(position.y, window.innerHeight - 400)
        }}
      >
        {/* Search Header */}
        <div className="p-3 border-b border-gray-100 dark:border-gray-700">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Filter commands..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setSelectedIndex(0);
              }}
              className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Commands */}
        <div className="max-h-80 overflow-y-auto">
          {Object.entries(groupedCommands).map(([category, categoryCommands]) => (
            <div key={category}>
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide bg-gray-50 dark:bg-gray-750 sticky top-0">
                {category}
              </div>
              {categoryCommands.map((command, index) => {
                const globalIndex = filteredCommands.indexOf(command);
                return (
                  <button
                    key={command.id}
                    onClick={command.action}
                    className={`w-full flex items-center gap-3 px-3 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      globalIndex === selectedIndex ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {command.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                        {command.title}
                      </div>
                      {command.description && (
                        <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">
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

const EnhancedImageModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onInsert: (data: { src: string; alt: string; width?: number; height?: number }) => void;
}> = ({ isOpen, onClose, onInsert }) => {
  const [activeTab, setActiveTab] = useState<'url' | 'upload'>('url');
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setUploadedFile(file);
      
      // Create object URL for preview
      const objectUrl = URL.createObjectURL(file);
      setImageUrl(objectUrl);
    }
  };

  const handleInsert = () => {
    if (imageUrl) {
      onInsert({
        src: imageUrl,
        alt: imageAlt || 'Inserted image',
        width: 400,
        height: 300
      });
      
      // Reset form
      setImageUrl('');
      setImageAlt('');
      setUploadedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-lg w-full mx-4 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Insert Image</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('url')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'url'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <ExternalLink size={16} />
            URL
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'upload'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Upload size={16} />
            Upload
          </button>
        </div>

        <div className="space-y-4">
          {activeTab === 'url' ? (
            <input
              type="url"
              placeholder="Paste image URL here..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              autoFocus
            />
          ) : (
            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex flex-col items-center justify-center gap-3 py-8 px-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
              >
                <Upload size={32} className="text-gray-400" />
                <div className="text-center">
                  <div className="font-medium text-gray-900 dark:text-white">Choose an image file</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    JPG, PNG, GIF up to 10MB
                  </div>
                </div>
              </button>
              
              {uploadedFile && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Selected: {uploadedFile.name} ({Math.round(uploadedFile.size / 1024)} KB)
                </div>
              )}
            </div>
          )}

          <input
            type="text"
            placeholder="Alt text (optional)"
            value={imageAlt}
            onChange={(e) => setImageAlt(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />

          {/* Preview */}
          {imageUrl && (
            <div className="mt-4">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preview:</div>
              <img
                src={imageUrl}
                alt={imageAlt || 'Preview'}
                className="max-w-full h-auto max-h-48 rounded-lg shadow-sm"
                onError={() => setImageUrl('')}
              />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleInsert}
            disabled={!imageUrl}
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            Insert Image
          </button>
        </div>
      </div>
    </div>
  );
};

const EnhancedNotionEditor: React.FC<EnhancedNotionEditorProps> = ({
  content = '<h1>Welcome to Notion-like template ✨</h1><blockquote><p>💫 <strong>Invite your colleagues to make this fun!</strong></p><p>Just copy the URL from your browser and share it — everyone with the link can join in and collaborate in real time.</p></blockquote><p>Start writing your thoughts here ... ✏️</p><p>Try some <strong>Markdown</strong>:</p><p><em>/Filter...</em></p>',
  onChange,
  placeholder = 'Type "/" for commands, or start writing...',
  theme = 'light',
  height = '600px',
  className = '',
  readOnly = false
}) => {
  const [slashMenuOpen, setSlashMenuOpen] = useState(false);
  const [slashMenuPosition, setSlashMenuPosition] = useState({ x: 0, y: 0 });
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        codeBlock: false,
      }),
      Underline,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right'],
      }),
      FontFamily.configure({ types: ['textStyle'] }),
      TextStyle,
      Color.configure({ types: ['textStyle'] }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-blue-600 hover:text-blue-800 underline cursor-pointer' },
      }),
      Image.configure({
        HTMLAttributes: { class: 'max-w-full h-auto rounded-lg shadow-md' },
        allowBase64: true,
      }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: { class: 'rounded-lg bg-gray-100 dark:bg-gray-800 p-4 font-mono text-sm' },
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
      Focus.configure({ className: 'has-focus', mode: 'all' }),
      Dropcursor.configure({ color: '#3b82f6' }),
      Gapcursor,
    ],
    content,
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
    onSelectionUpdate: ({ editor }) => {
      // Handle slash command detection
      const { $head } = editor.state.selection;
      const textBefore = $head.parent.textBetween(Math.max(0, $head.parentOffset - 10), $head.parentOffset);
      
      if (textBefore.endsWith('/') && !slashMenuOpen) {
        const pos = editor.view.coordsAtPos($head.pos);
        setSlashMenuPosition({ x: pos.left, y: pos.bottom });
        setSlashMenuOpen(true);
      }
    }
  });

  const handleInsertImage = (data: { src: string; alt: string; width?: number; height?: number }) => {
    if (editor) {
      editor.chain().focus().setImage({
        src: data.src,
        alt: data.alt,
        title: data.alt
      }).run();
    }
  };

  const handleAddBlock = () => {
    const pos = editor?.view.coordsAtPos(editor.state.selection.head);
    if (pos) {
      setSlashMenuPosition({ x: pos.left, y: pos.bottom });
      setSlashMenuOpen(true);
    }
  };

  if (!editor) return null;

  return (
    <div className={`enhanced-notion-editor ${theme} ${className}`}>
      {/* Header */}
      <div className="header-gradient min-h-[200px] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl font-bold mb-2">Welcome to Notion-like template ✨</h1>
          <p className="text-xl opacity-90">A beautiful, feature-rich editor experience</p>
        </div>
      </div>

      {/* Editor Container */}
      <div 
        className="editor-wrapper bg-white dark:bg-gray-900 shadow-2xl"
        style={{ minHeight: height }}
      >
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="prose prose-lg max-w-none">
            <div className="relative">
              <EditorContent 
                editor={editor} 
                className="notion-content focus:outline-none min-h-[400px]"
              />
              
              {/* Enhanced Floating Menu */}
              <FloatingMenu
                editor={editor}
                className="floating-menu-enhanced"
              >
                <div className="flex items-center gap-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-1">
                  <button
                    onClick={handleAddBlock}
                    className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title="Add block"
                  >
                    <Plus size={16} className="text-gray-600 dark:text-gray-400" />
                  </button>
                  <div className="w-px h-6 bg-gray-200 dark:bg-gray-600 mx-1"></div>
                  <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title="Heading 1"
                  >
                    <Hash size={16} className="text-gray-600 dark:text-gray-400" />
                  </button>
                  <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title="Bullet List"
                  >
                    <List size={16} className="text-gray-600 dark:text-gray-400" />
                  </button>
                  <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title="Quote"
                  >
                    <Quote size={16} className="text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </FloatingMenu>

              {/* Enhanced Bubble Menu */}
              <BubbleMenu
                editor={editor}
                className="bubble-menu-enhanced"
              >
                <div className="flex items-center gap-1 bg-black text-white rounded-lg shadow-xl p-1">
                  <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`flex items-center justify-center w-8 h-8 rounded-md transition-colors ${
                      editor.isActive('bold') ? 'bg-white/20' : 'hover:bg-white/10'
                    }`}
                    title="Bold"
                  >
                    <Bold size={14} />
                  </button>
                  <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`flex items-center justify-center w-8 h-8 rounded-md transition-colors ${
                      editor.isActive('italic') ? 'bg-white/20' : 'hover:bg-white/10'
                    }`}
                    title="Italic"
                  >
                    <Italic size={14} />
                  </button>
                  <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={`flex items-center justify-center w-8 h-8 rounded-md transition-colors ${
                      editor.isActive('strike') ? 'bg-white/20' : 'hover:bg-white/10'
                    }`}
                    title="Strikethrough"
                  >
                    <Strikethrough size={14} />
                  </button>
                  <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`flex items-center justify-center w-8 h-8 rounded-md transition-colors ${
                      editor.isActive('underline') ? 'bg-white/20' : 'hover:bg-white/10'
                    }`}
                    title="Underline"
                  >
                    <UnderlineIcon size={14} />
                  </button>
                </div>
              </BubbleMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Slash Command Menu */}
      <SlashCommandMenu
        editor={editor}
        isOpen={slashMenuOpen}
        onClose={() => setSlashMenuOpen(false)}
        position={slashMenuPosition}
      />

      {/* Enhanced Image Modal */}
      <EnhancedImageModal
        isOpen={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
        onInsert={handleInsertImage}
      />

      <style jsx>{`
        .enhanced-notion-editor {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background: #fafbfc;
          min-height: 100vh;
        }

        .enhanced-notion-editor.dark {
          background: #1a1b1e;
        }

        .header-gradient {
          position: relative;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .editor-wrapper {
          margin-top: -50px;
          border-radius: 12px 12px 0 0;
          position: relative;
          z-index: 10;
        }

        .notion-content {
          line-height: 1.7;
          color: #374151;
        }

        .dark .notion-content {
          color: #d1d5db;
        }

        .notion-content .ProseMirror {
          outline: none;
          padding: 1rem 0;
        }

        .notion-content .ProseMirror > * {
          position: relative;
        }

        .notion-content .ProseMirror > *:hover {
          @apply group;
        }

        .notion-content h1 {
          font-size: 2.25rem;
          font-weight: 700;
          line-height: 1.2;
          margin: 2rem 0 1rem 0;
          color: #1f2937;
        }

        .dark .notion-content h1 {
          color: #f9fafb;
        }

        .notion-content h2 {
          font-size: 1.875rem;
          font-weight: 600;
          line-height: 1.3;
          margin: 1.5rem 0 0.75rem 0;
          color: #1f2937;
        }

        .dark .notion-content h2 {
          color: #f3f4f6;
        }

        .notion-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          line-height: 1.3;
          margin: 1.25rem 0 0.5rem 0;
          color: #374151;
        }

        .dark .notion-content h3 {
          color: #e5e7eb;
        }

        .notion-content p {
          margin: 0.75rem 0;
          line-height: 1.7;
        }

        .notion-content blockquote {
          border-left: 4px solid #3b82f6;
          padding: 1rem 1.5rem;
          margin: 1.5rem 0;
          background: #f8fafc;
          border-radius: 0 8px 8px 0;
          font-style: normal;
        }

        .dark .notion-content blockquote {
          background: #1f2937;
          border-left-color: #60a5fa;
        }

        .notion-content blockquote p {
          margin: 0.5rem 0;
        }

        .notion-content ul, .notion-content ol {
          padding-left: 1.5rem;
          margin: 1rem 0;
        }

        .notion-content li {
          margin: 0.25rem 0;
          line-height: 1.6;
        }

        .notion-content code {
          background: #f3f4f6;
          padding: 0.125rem 0.375rem;
          border-radius: 0.375rem;
          font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
          font-size: 0.875em;
          color: #ef4444;
        }

        .dark .notion-content code {
          background: #374151;
          color: #fbbf24;
        }

        .notion-content pre {
          background: #1f2937;
          border-radius: 8px;
          padding: 1.5rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }

        .notion-content pre code {
          background: none;
          padding: 0;
          color: #f9fafb;
        }

        .floating-menu-enhanced {
          z-index: 1000;
          animation: slideInLeft 0.2s ease-out;
        }

        .bubble-menu-enhanced {
          z-index: 1000;
          animation: fadeInScale 0.15s ease-out;
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .notion-content img {
          margin: 1.5rem 0;
          border-radius: 8px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          transition: all 0.2s ease;
        }

        .notion-content img:hover {
          box-shadow: 0 20px 40px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          transform: translateY(-2px);
        }

        .notion-content .ProseMirror-selectednode {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }

        /* Placeholder styling */
        .notion-content .ProseMirror .is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #9ca3af;
          pointer-events: none;
          height: 0;
          font-style: italic;
        }

        .dark .notion-content .ProseMirror .is-editor-empty:first-child::before {
          color: #6b7280;
        }
      `}</style>
    </div>
  );
};

export default EnhancedNotionEditor;

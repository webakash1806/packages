import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react';
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
  Highlighter,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Plus,
  Minus,
  Check,
  X,
  ChevronDown,
  Maximize2,
  Minimize2,
  ExternalLink,
  FileCode,
  HelpCircle,
  Settings,
  Copy,
  LayoutGrid,
  Trash2,
  MoreHorizontal
} from 'lucide-react';

export interface RichTextEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  className?: string;
  readonly?: boolean;
  maxLength?: number;
  theme?: 'light' | 'dark' | 'auto';
  enabledFeatures?: {
    basic?: boolean;
    alignment?: boolean;
    lists?: boolean;
    colors?: boolean;
    media?: boolean;
    tables?: boolean;
    history?: boolean;
    fonts?: boolean;
    headings?: boolean;
    bubbleMenu?: boolean;
    floatingMenu?: boolean;
    fullscreen?: boolean;
  };
  toolbar?: 'top' | 'bottom' | 'both' | 'none';
  onBlur?: () => void;
  onFocus?: () => void;
  height?: string;
  autofocus?: boolean;
  tooltips?: boolean;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content = '',
  onChange,
  placeholder = 'Start typing...',
  className = '',
  readonly = false,
  theme = 'light',
  enabledFeatures = {
    basic: true,
    alignment: true,
    lists: true,
    colors: true,
    media: true,
    tables: true,
    history: true,
    fonts: false,
    headings: true,
    bubbleMenu: true,
    floatingMenu: true,
    fullscreen: true
  },
  toolbar = 'top',
  onBlur,
  onFocus,
  height = 'auto',
  autofocus = false,
  tooltips = true
}) => {
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [linkTitle, setLinkTitle] = useState('');
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFontSizeMenu, setShowFontSizeMenu] = useState(false);
  const [showFontFamilyMenu, setShowFontFamilyMenu] = useState(false);
  const [showHeadingMenu, setShowHeadingMenu] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [imageTitle, setImageTitle] = useState('');
  const [imageDimensions, setImageDimensions] = useState({ width: '', height: '' });
  const [imageAlignment, setImageAlignment] = useState('none');
  const [showTableDialog, setShowTableDialog] = useState(false);
  const [tableSize, setTableSize] = useState({ rows: 3, cols: 3 });
  const [hasHeader, setHasHeader] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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
        alignments: ['left', 'center', 'right', 'justify'],
        defaultAlignment: 'left',
      })
    );
  }

  if (enabledFeatures.media) {
    extensions.push(
      Link.configure({
        openOnClick: false,
        linkOnPaste: true,
        HTMLAttributes: {
          class: 'text-blue-500 hover:text-blue-700 underline cursor-pointer',
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
      Image.configure({
        allowBase64: true,
        inline: true,
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
        HTMLAttributes: {
          class: 'rce-table',
        },
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: 'rce-tr',
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: 'rce-th',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'rce-td',
        },
      })
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
    autofocus,
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
    onFocus: onFocus,
    onBlur: onBlur,
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  useEffect(() => {
    if (isFullscreen && editorContainerRef.current) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Exit fullscreen with Escape key
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
      
      // Other global keyboard shortcuts can be added here
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Close all dropdowns and dialogs except the specified one
  const closeAllDialogs = (except: string | null = null) => {
    if (except !== 'color') setShowColorPicker(false);
    if (except !== 'highlight') setShowHighlightPicker(false);
    if (except !== 'link') setShowLinkDialog(false);
    if (except !== 'image') setShowImageDialog(false);
    if (except !== 'table') setShowTableDialog(false);
    if (except !== 'fontSize') setShowFontSizeMenu(false);
    if (except !== 'fontFamily') setShowFontFamilyMenu(false);
    if (except !== 'heading') setShowHeadingMenu(false);
    
    if (except !== activeDropdown) {
      setActiveDropdown(except);
    }
  };

  // Toggle a dropdown menu
  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) {
      closeAllDialogs();
    } else {
      closeAllDialogs(name);
    }
  };

  // Handle clicks outside dropdowns to close them
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // If the click is not on a dropdown toggle button and we have an active dropdown
      if (activeDropdown && !target.closest('[data-dropdown-toggle]')) {
        closeAllDialogs();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  const setLink = useCallback(() => {
    if (!editor) return;

    if (linkUrl) {
      const attrs = {
        href: linkUrl,
        target: '_blank',
        rel: 'noopener noreferrer',
        title: linkTitle || undefined,
      };
      
      editor.chain().focus().extendMarkRange('link').setLink(attrs).run();
      
      // If there's new link text and no text is selected, insert the link text
      if (linkText && editor.state.selection.empty) {
        editor.chain().insertContent(linkText).setLink(attrs).run();
      }
    } else {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    }

    closeAllDialogs();
    setLinkUrl('');
    setLinkText('');
    setLinkTitle('');
  }, [editor, linkUrl, linkText, linkTitle]);

  const addImage = useCallback(() => {
    if (!editor) return;

    if (imageUrl) {
      const attrs: any = { src: imageUrl };
      
      if (imageAlt) attrs.alt = imageAlt;
      if (imageTitle) attrs.title = imageTitle;
      
      // Add custom HTML attributes for width, height, alignment
      const htmlAttrs: any = {};
      
      if (imageDimensions.width) htmlAttrs.width = imageDimensions.width;
      if (imageDimensions.height) htmlAttrs.height = imageDimensions.height;
      
      if (imageAlignment !== 'none') {
        htmlAttrs.class = `rce-image-align-${imageAlignment}`;
      }

      attrs.HTMLAttributes = htmlAttrs;
      
      editor.chain().focus().setImage(attrs).run();
    }

    closeAllDialogs();
    setImageUrl('');
    setImageAlt('');
    setImageTitle('');
    setImageDimensions({ width: '', height: '' });
    setImageAlignment('none');
  }, [editor, imageUrl, imageAlt, imageTitle, imageDimensions, imageAlignment]);

  const addTable = useCallback(() => {
    if (!editor) return;

    editor.chain().focus().insertTable({ 
      rows: tableSize.rows, 
      cols: tableSize.cols, 
      withHeaderRow: hasHeader 
    }).run();
    
    closeAllDialogs();
    setTableSize({ rows: 3, cols: 3 });
    setHasHeader(true);
  }, [editor, tableSize, hasHeader]);
  
  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);
  
  // Font size handler - disabled for now
  const setFontSize = useCallback((size: string) => {
    if (!editor) return;
    // Font size not available in current setup
    closeAllDialogs();
  }, [editor]);
  
  // Font family handler
  const setFontFamily = useCallback((font: string) => {
    if (!editor) return;
    editor.chain().focus().setFontFamily(font).run();
    closeAllDialogs();
  }, [editor]);
  
  // Heading handler
  const setHeading = useCallback((level: 1 | 2 | 3 | 4 | 5 | 6) => {
    if (!editor) return;
    editor.chain().focus().toggleHeading({ level }).run();
    closeAllDialogs();
  }, [editor]);

  // Define available options for fonts, colors, etc.
  const fontSizes = [
    '8px', '10px', '12px', '14px', '16px', '18px', '20px', '24px', '30px', '36px', '48px', '60px', '72px'
  ];
  
  const fontFamilies = [
    { name: 'Default', value: 'inherit' },
    { name: 'Arial', value: 'Arial, sans-serif' },
    { name: 'Courier New', value: 'Courier New, monospace' },
    { name: 'Georgia', value: 'Georgia, serif' },
    { name: 'Times New Roman', value: 'Times New Roman, serif' },
    { name: 'Verdana', value: 'Verdana, sans-serif' },
    { name: 'Roboto', value: 'Roboto, sans-serif' },
    { name: 'Open Sans', value: 'Open Sans, sans-serif' },
    { name: 'Lato', value: 'Lato, sans-serif' },
    { name: 'Montserrat', value: 'Montserrat, sans-serif' }
  ];
  
  const colors = [
    // Black & White
    '#000000', '#262626', '#404040', '#595959', '#737373', '#8c8c8c', '#a6a6a6', '#bfbfbf', '#d9d9d9', '#f2f2f2', '#ffffff',
    // Blues
    '#0d47a1', '#1565c0', '#1976d2', '#1e88e5', '#2196f3', '#42a5f5', '#64b5f6', '#90caf9', '#bbdefb', '#e3f2fd',
    // Greens
    '#1b5e20', '#2e7d32', '#388e3c', '#43a047', '#4caf50', '#66bb6a', '#81c784', '#a5d6a7', '#c8e6c9', '#e8f5e9',
    // Reds
    '#b71c1c', '#c62828', '#d32f2f', '#e53935', '#f44336', '#ef5350', '#e57373', '#ef9a9a', '#ffcdd2', '#ffebee',
    // Purples
    '#4a148c', '#6a1b9a', '#7b1fa2', '#8e24aa', '#9c27b0', '#ab47bc', '#ba68c8', '#ce93d8', '#e1bee7', '#f3e5f5',
    // Yellows & Oranges
    '#e65100', '#ef6c00', '#f57c00', '#fb8c00', '#ff9800', '#ffa726', '#ffb74d', '#ffcc80', '#ffe0b2', '#fff3e0'
  ];

  if (!editor) {
    return (
      <div className="rce-container p-4 border border-gray-300 rounded-lg bg-white">
        <div className="flex items-center justify-center h-40">
          <div className="flex flex-col items-center text-gray-500">
            <svg className="animate-spin h-8 w-8 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p>Loading editor...</p>
          </div>
        </div>
      </div>
    );
  }

  // Define CSS classes based on theme and fullscreen mode
  const themeClass = theme === 'dark' ? 'rce-theme-dark' : 'rce-theme-light';
  const containerClass = isFullscreen ? 'rce-fullscreen' : '';
  
  // Define tooltip component if tooltips are enabled
  const Tooltip = ({ children, title }: { children: React.ReactNode, title: string }) => {
    if (!tooltips) return <>{children}</>;
    
    return (
      <div className="rce-tooltip-container">
        {children}
        <div className="rce-tooltip">{title}</div>
      </div>
    );
  };
  
  // Button component for toolbar
  const ToolbarButton = ({
    onClick,
    isActive = false,
    disabled = false,
    title,
    children,
    className = '',
    dataAttr = {}
  }: {
    onClick: () => void,
    isActive?: boolean,
    disabled?: boolean,
    title: string,
    children: React.ReactNode,
    className?: string,
    dataAttr?: Record<string, string>
  }) => (
    <Tooltip title={title}>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`rce-button ${isActive ? 'rce-button-active' : ''} ${disabled ? 'rce-button-disabled' : ''} ${className}`}
        {...dataAttr}
      >
        {children}
      </button>
    </Tooltip>
  );
  
  // Dropdown component for toolbar
  const ToolbarDropdown = ({
    toggle,
    isOpen,
    title,
    icon,
    children,
    className = '',
    dataAttr = {}
  }: {
    toggle: () => void,
    isOpen: boolean,
    title: string,
    icon: React.ReactNode,
    children: React.ReactNode,
    className?: string,
    dataAttr?: Record<string, string>
  }) => (
    <div className="rce-dropdown-container">
      <Tooltip title={title}>
        <button
          onClick={toggle}
          className={`rce-button rce-dropdown-toggle ${isOpen ? 'rce-button-active' : ''} ${className}`}
          data-dropdown-toggle="true"
          {...dataAttr}
        >
          {icon}
          <ChevronDown size={12} className="rce-dropdown-arrow" />
        </button>
      </Tooltip>
      {isOpen && (
        <div className="rce-dropdown-menu">
          {children}
        </div>
      )}
    </div>
  );
  
  // Modal component for dialogs
  const Modal = ({
    title,
    onClose,
    onSubmit,
    children,
    submitLabel = 'Save',
    cancelLabel = 'Cancel',
    className = ''
  }: {
    title: string,
    onClose: () => void,
    onSubmit: () => void,
    children: React.ReactNode,
    submitLabel?: string,
    cancelLabel?: string,
    className?: string
  }) => (
    <div className="rce-modal-overlay" onClick={() => onClose()}>
      <div className={`rce-modal ${className}`} onClick={(e) => e.stopPropagation()}>
        <div className="rce-modal-header">
          <h3>{title}</h3>
          <button className="rce-modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="rce-modal-body">
          {children}
        </div>
        <div className="rce-modal-footer">
          <button className="rce-button rce-button-secondary" onClick={onClose}>
            {cancelLabel}
          </button>
          <button className="rce-button rce-button-primary" onClick={onSubmit}>
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );

  // Character count renderer - disabled for now
  const CharacterCounter = () => {
    return null; // Character counting disabled
  };

  return (
    <div 
      ref={editorContainerRef}
      className={`rce-container ${themeClass} ${containerClass} ${className}`}
      style={{ height: isFullscreen ? '100vh' : height }}
    >
      {/* Bubble Menu */}
      {editor && enabledFeatures.bubbleMenu && (
        <BubbleMenu 
          editor={editor} 
          tippyOptions={{ duration: 100 }} 
          className="rce-bubble-menu"
        >
          <div className="rce-bubble-toolbar">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={editor.isActive('bold')}
              title="Bold (Ctrl+B)"
            >
              <Bold size={14} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              isActive={editor.isActive('italic')}
              title="Italic (Ctrl+I)"
            >
              <Italic size={14} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              isActive={editor.isActive('underline')}
              title="Underline (Ctrl+U)"
            >
              <UnderlineIcon size={14} />
            </ToolbarButton>
            
            <div className="rce-toolbar-divider"></div>
            
            <ToolbarButton
              onClick={() => setShowLinkDialog(true)}
              isActive={editor.isActive('link')}
              title="Insert link"
            >
              <LinkIcon size={14} />
            </ToolbarButton>
            
            <div className="rce-toolbar-divider"></div>
            
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              isActive={editor.isActive('highlight')}
              title="Highlight text"
            >
              <Highlighter size={14} />
            </ToolbarButton>
          </div>
        </BubbleMenu>
      )}
      
      {/* Floating Menu */}
      {editor && enabledFeatures.floatingMenu && (
        <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }} className="rce-floating-menu">
          <div className="rce-floating-toolbar">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              isActive={editor.isActive('heading', { level: 1 })}
              title="Heading 1"
            >
              <Heading1 size={14} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              isActive={editor.isActive('heading', { level: 2 })}
              title="Heading 2"
            >
              <Heading2 size={14} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              isActive={editor.isActive('bulletList')}
              title="Bullet List"
            >
              <List size={14} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              isActive={editor.isActive('orderedList')}
              title="Numbered List"
            >
              <ListOrdered size={14} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              isActive={editor.isActive('blockquote')}
              title="Quote"
            >
              <Quote size={14} />
            </ToolbarButton>
          </div>
        </FloatingMenu>
      )}
      
      {/* Main Toolbar */}
      {!readonly && (toolbar === 'top' || toolbar === 'both') && (
        <div className="rce-toolbar">
          {/* Headings Section */}
          {enabledFeatures.headings && (
            <div className="rce-toolbar-group">
              <ToolbarDropdown
                toggle={() => toggleDropdown('heading')}
                isOpen={activeDropdown === 'heading'}
                title="Paragraph format"
                icon={<Type size={16} />}
              >
                <button 
                  className={`rce-dropdown-item ${editor.isActive('paragraph') ? 'rce-dropdown-item-active' : ''}`} 
                  onClick={() => editor.chain().focus().setParagraph().run()}
                >
                  <span className="rce-dropdown-item-icon"><Type size={16} /></span>
                  <span className="rce-dropdown-item-text">Paragraph</span>
                </button>
                {[1, 2, 3, 4, 5, 6].map(level => {
                  const HeadingIcon = [Heading1, Heading2, Heading3, Heading4, Heading5, Heading6][level-1];
                  return (
                    <button 
                      key={level} 
                      className={`rce-dropdown-item ${editor.isActive('heading', { level }) ? 'rce-dropdown-item-active' : ''}`} 
                      onClick={() => setHeading(level as 1 | 2 | 3 | 4 | 5 | 6)}
                    >
                      <span className="rce-dropdown-item-icon"><HeadingIcon size={16} /></span>
                      <span className="rce-dropdown-item-text">Heading {level}</span>
                    </button>
                  );
                })}
              </ToolbarDropdown>
            </div>
          )}

          {/* Font Controls */}
          {enabledFeatures.fonts && (
            <div className="rce-toolbar-group">
              <ToolbarDropdown
                toggle={() => toggleDropdown('fontFamily')}
                isOpen={activeDropdown === 'fontFamily'}
                title="Font family"
                icon={<span className="rce-font-family-button">Font <ChevronDown size={12} /></span>}
                className="rce-font-family-dropdown"
              >
                {fontFamilies.map(font => (
                  <button 
                    key={font.value} 
                    className={`rce-dropdown-item ${editor.isActive('textStyle', { fontFamily: font.value }) ? 'rce-dropdown-item-active' : ''}`} 
                    onClick={() => setFontFamily(font.value)}
                    style={{ fontFamily: font.value }}
                  >
                    <span className="rce-dropdown-item-text">{font.name}</span>
                  </button>
                ))}
              </ToolbarDropdown>

            </div>
          )}

          {/* Text Formatting */}
          {enabledFeatures.basic && (
            <div className="rce-toolbar-group">
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
          )}

          {/* Text Alignment */}
          {enabledFeatures.alignment && (
            <div className="rce-toolbar-group">
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
          )}

          {/* Lists */}
          {enabledFeatures.lists && (
            <div className="rce-toolbar-group">
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
          )}

          {/* Colors and Highlighting */}
          {enabledFeatures.colors && (
            <div className="rce-toolbar-group">
              <ToolbarDropdown
                toggle={() => toggleDropdown('color')}
                isOpen={activeDropdown === 'color'}
                title="Text Color"
                icon={<Palette size={16} />}
              >
                <div className="rce-color-grid">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        editor.chain().focus().setColor(color).run();
                        closeAllDialogs();
                      }}
                      className="rce-color-button"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
                <div className="rce-dropdown-divider"></div>
                <button 
                  className="rce-dropdown-item" 
                  onClick={() => {
                    editor.chain().focus().unsetColor().run();
                    closeAllDialogs();
                  }}
                >
                  <span className="rce-dropdown-item-icon"><X size={16} /></span>
                  <span className="rce-dropdown-item-text">Remove color</span>
                </button>
              </ToolbarDropdown>
              
              <ToolbarDropdown
                toggle={() => toggleDropdown('highlight')}
                isOpen={activeDropdown === 'highlight'}
                title="Highlight"
                icon={<Highlighter size={16} />}
              >
                <div className="rce-color-grid">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        editor.chain().focus().setHighlight({ color }).run();
                        closeAllDialogs();
                      }}
                      className="rce-color-button"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
                <div className="rce-dropdown-divider"></div>
                <button 
                  className="rce-dropdown-item" 
                  onClick={() => {
                    editor.chain().focus().unsetHighlight().run();
                    closeAllDialogs();
                  }}
                >
                  <span className="rce-dropdown-item-icon"><X size={16} /></span>
                  <span className="rce-dropdown-item-text">Remove highlight</span>
                </button>
              </ToolbarDropdown>
            </div>
          )}

          {/* Media and Links */}
          {enabledFeatures.media && (
            <div className="rce-toolbar-group">
              <ToolbarButton
                onClick={() => setShowLinkDialog(true)}
                isActive={editor.isActive('link')}
                title="Insert Link"
              >
                <LinkIcon size={16} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => setShowImageDialog(true)}
                title="Insert Image"
              >
                <ImageIcon size={16} />
              </ToolbarButton>
              {enabledFeatures.tables && (
                <ToolbarButton
                  onClick={() => setShowTableDialog(true)}
                  title="Insert Table"
                >
                  <TableIcon size={16} />
                </ToolbarButton>
              )}
            </div>
          )}

          {/* Undo/Redo */}
          <div className="rce-toolbar-spacer"></div>
          
          <div className="rce-toolbar-group">
            {enabledFeatures.history && (
              <>
                <ToolbarButton
                  onClick={() => editor.chain().focus().undo().run()}
                  disabled={!editor.can().chain().focus().undo().run()}
                  title="Undo"
                >
                  <Undo size={16} />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => editor.chain().focus().redo().run()}
                  disabled={!editor.can().chain().focus().redo().run()}
                  title="Redo"
                >
                  <Redo size={16} />
                </ToolbarButton>
              </>
            )}
            
            {enabledFeatures.fullscreen && (
              <ToolbarButton
                onClick={toggleFullscreen}
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </ToolbarButton>
            )}
          </div>
        </div>
      )}

      {/* Editor Content */}
      <div className="rce-editor-content" style={{ height: isFullscreen ? 'calc(100vh - 120px)' : '' }}>
        <EditorContent 
          editor={editor} 
          className="rce-editor-area"
        />
        
      </div>
      
      {/* Bottom Toolbar (if enabled) */}
      {!readonly && (toolbar === 'bottom' || toolbar === 'both') && (
        <div className="rce-toolbar rce-bottom-toolbar">
          <div className="rce-toolbar-group">
            {enabledFeatures.basic && (
              <>
                <ToolbarButton
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  isActive={editor.isActive('bold')}
                  title="Bold"
                >
                  <Bold size={16} />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  isActive={editor.isActive('italic')}
                  title="Italic"
                >
                  <Italic size={16} />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                  isActive={editor.isActive('underline')}
                  title="Underline"
                >
                  <UnderlineIcon size={16} />
                </ToolbarButton>
              </>
            )}
            
            {enabledFeatures.lists && (
              <>
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
              </>
            )}
            
            {enabledFeatures.media && (
              <ToolbarButton
                onClick={() => setShowLinkDialog(true)}
                isActive={editor.isActive('link')}
                title="Insert Link"
              >
                <LinkIcon size={16} />
              </ToolbarButton>
            )}
          </div>
          
          <div className="rce-toolbar-spacer"></div>
          
        </div>
      )}

      {/* Link Dialog */}
      {showLinkDialog && enabledFeatures.media && (
        <Modal
          title="Insert Link"
          onClose={() => closeAllDialogs()}
          onSubmit={setLink}
          submitLabel="Insert"
        >
          <div className="rce-form-group">
            <label className="rce-form-label">URL</label>
            <input
              type="url"
              placeholder="https://example.com"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="rce-form-input"
              autoFocus
            />
          </div>
          
          <div className="rce-form-group">
            <label className="rce-form-label">Text</label>
            <input
              type="text"
              placeholder="Link text (optional)"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              className="rce-form-input"
            />
            <div className="rce-form-help">Leave empty to use the selected text</div>
          </div>
          
          <div className="rce-form-group">
            <label className="rce-form-label">Title</label>
            <input
              type="text"
              placeholder="Link title (optional)"
              value={linkTitle}
              onChange={(e) => setLinkTitle(e.target.value)}
              className="rce-form-input"
            />
            <div className="rce-form-help">Appears as tooltip when hovering over the link</div>
          </div>
        </Modal>
      )}

      {/* Image Dialog */}
      {showImageDialog && enabledFeatures.media && (
        <Modal
          title="Insert Image"
          onClose={() => closeAllDialogs()}
          onSubmit={addImage}
          submitLabel="Insert"
        >
          <div className="rce-form-group">
            <label className="rce-form-label">Image URL</label>
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="rce-form-input"
              autoFocus
            />
          </div>
          
          <div className="rce-form-row">
            <div className="rce-form-group rce-form-group-half">
              <label className="rce-form-label">Alt Text</label>
              <input
                type="text"
                placeholder="Image description"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                className="rce-form-input"
              />
            </div>
            
            <div className="rce-form-group rce-form-group-half">
              <label className="rce-form-label">Title</label>
              <input
                type="text"
                placeholder="Image title"
                value={imageTitle}
                onChange={(e) => setImageTitle(e.target.value)}
                className="rce-form-input"
              />
            </div>
          </div>
          
          <div className="rce-form-row">
            <div className="rce-form-group rce-form-group-half">
              <label className="rce-form-label">Width</label>
              <input
                type="text"
                placeholder="e.g. 300px or 50%"
                value={imageDimensions.width}
                onChange={(e) => setImageDimensions({...imageDimensions, width: e.target.value})}
                className="rce-form-input"
              />
            </div>
            
            <div className="rce-form-group rce-form-group-half">
              <label className="rce-form-label">Height</label>
              <input
                type="text"
                placeholder="e.g. 200px"
                value={imageDimensions.height}
                onChange={(e) => setImageDimensions({...imageDimensions, height: e.target.value})}
                className="rce-form-input"
              />
            </div>
          </div>
          
          <div className="rce-form-group">
            <label className="rce-form-label">Alignment</label>
            <div className="rce-form-button-group">
              <button 
                type="button" 
                className={`rce-form-button ${imageAlignment === 'left' ? 'rce-form-button-active' : ''}`}
                onClick={() => setImageAlignment('left')}
              >
                <AlignLeft size={16} /> Left
              </button>
              <button 
                type="button" 
                className={`rce-form-button ${imageAlignment === 'center' ? 'rce-form-button-active' : ''}`}
                onClick={() => setImageAlignment('center')}
              >
                <AlignCenter size={16} /> Center
              </button>
              <button 
                type="button" 
                className={`rce-form-button ${imageAlignment === 'right' ? 'rce-form-button-active' : ''}`}
                onClick={() => setImageAlignment('right')}
              >
                <AlignRight size={16} /> Right
              </button>
              <button 
                type="button" 
                className={`rce-form-button ${imageAlignment === 'none' ? 'rce-form-button-active' : ''}`}
                onClick={() => setImageAlignment('none')}
              >
                <X size={16} /> None
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Table Dialog */}
      {showTableDialog && enabledFeatures.tables && (
        <Modal
          title="Insert Table"
          onClose={() => closeAllDialogs()}
          onSubmit={addTable}
          submitLabel="Insert"
        >
          <div className="rce-form-row">
            <div className="rce-form-group rce-form-group-half">
              <label className="rce-form-label">Rows</label>
              <input
                type="number"
                min="1"
                max="20"
                value={tableSize.rows}
                onChange={(e) => setTableSize({...tableSize, rows: parseInt(e.target.value) || 1})}
                className="rce-form-input"
              />
            </div>
            
            <div className="rce-form-group rce-form-group-half">
              <label className="rce-form-label">Columns</label>
              <input
                type="number"
                min="1"
                max="10"
                value={tableSize.cols}
                onChange={(e) => setTableSize({...tableSize, cols: parseInt(e.target.value) || 1})}
                className="rce-form-input"
              />
            </div>
          </div>
          
          <div className="rce-form-group">
            <label className="rce-form-label">
              <input
                type="checkbox"
                checked={hasHeader}
                onChange={(e) => setHasHeader(e.target.checked)}
                className="rce-form-checkbox"
              />
              Include header row
            </label>
          </div>
          
          <div className="rce-table-preview">
            <div className="rce-table-preview-label">Preview:</div>
            <div className="rce-table-preview-grid">
              {Array.from({ length: Math.min(tableSize.rows, 5) }).map((_, rowIndex) => (
                <div key={`row-${rowIndex}`} className="rce-table-preview-row">
                  {Array.from({ length: Math.min(tableSize.cols, 5) }).map((_, colIndex) => (
                    <div 
                      key={`cell-${rowIndex}-${colIndex}`} 
                      className={`rce-table-preview-cell ${rowIndex === 0 && hasHeader ? 'rce-table-preview-header' : ''}`}
                    ></div>
                  ))}
                  {tableSize.cols > 5 && <div className="rce-table-preview-more">...</div>}
                </div>
              ))}
              {tableSize.rows > 5 && (
                <div className="rce-table-preview-more-rows">...</div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RichTextEditor;

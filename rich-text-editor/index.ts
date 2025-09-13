// Main export for devi-rce package
export { default as RichTextEditor } from './RichTextEditor.js';
export type { RichTextEditorProps } from './RichTextEditor.js';

// Import CSS styles (users can also import manually)
import './RichTextEditor.css';

// Re-export common types that users might need
export type { Editor } from '@tiptap/react';

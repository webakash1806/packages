// Main export for devi-rce package (legacy)
export { default as RichTextEditor } from './RichTextEditor.js';
export type { RichTextEditorProps } from './RichTextEditor.js';

// New editor exports
export { default as DeviBasicEditor } from './src/DeviBasicEditor.js';
export type { DeviBasicEditorProps } from './src/DeviBasicEditor.js';

export { default as DeviNotionEditor } from './src/DeviNotionEditor.js';
export type { DeviNotionEditorProps } from './src/DeviNotionEditor.js';

export { default as NotionLikeEditor } from './src/NotionLikeEditor.js';
export type { NotionLikeEditorProps } from './src/NotionLikeEditor.js';

// Import CSS styles (users can also import manually)
import './RichTextEditor.css';
import './src/DeviEditors.css';

// Re-export common types that users might need
export type { Editor } from '@tiptap/react';

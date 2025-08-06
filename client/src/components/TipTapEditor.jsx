// client/src/components/TiptapEditor.jsx

import { useEditor, EditorContent } from '@tiptap/react';
import PropTypes from 'prop-types';

// This is our flexible base editor component.
export default function TiptapEditor({ content, onContentChange, extensions, editorClass, placeholder }) {
  const editor = useEditor({
    // The 'extensions' prop allows us to define different feature sets.
    extensions: extensions,
    // The initial content for the editor.
    content: content,
    // The 'onUpdate' callback fires every time the content changes.
    onUpdate: ({ editor }) => {
      // We convert the content to HTML and pass it up to the parent component.
      onContentChange(editor.getHTML());
    },

    placeholder: {
      // The text that appears when the editor is empty.
      placeholder: placeholder  ? placeholder : 'Start typing...',
    },

    // Pass editor-specific props.
    editorProps: {
      attributes: {
        // Apply Tailwind's 'prose' classes for typography and any custom classes.
        class: `prose dark:prose-invert focus:outline-none max-w-none ${editorClass}`,
      },
    },
  });

  // This sets the placeholder text dynamically if the editor supports it.
  // Note: This requires the Placeholder extension to be in the 'extensions' array.
  if (editor && placeholder) {
    const placeholderExt = editor.extensionManager.extensions.find(
      (ext) => ext.name === 'placeholder'
    );
    if (placeholderExt && placeholderExt.options) {
      placeholderExt.options.placeholder = placeholder;
    }
  }

  return <EditorContent editor={editor} />;
}

TiptapEditor.propTypes = {
    content: PropTypes.string.isRequired,
    onContentChange: PropTypes.func.isRequired,
    extensions: PropTypes.array.isRequired,
    editorClass: PropTypes.string,
    placeholder: PropTypes.string,
}
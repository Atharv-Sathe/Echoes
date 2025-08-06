import { useEditor, EditorContent } from "@tiptap/react";
import PropTypes from "prop-types";
import { useEffect } from "react";

// This is our flexible base editor component.
export default function TiptapEditor({
  content,
  onContentChange,
  extensions,
  editorClass,
}) {
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

    // Pass editor-specific props.
    editorProps: {
      attributes: {
        // Apply Tailwind's 'prose' classes for typography and any custom classes.
        class: `prose dark:prose-invert focus:outline-none max-w-none ${editorClass}`,
      },
    },
  });

  // This effect ensures that the editor's content is set correctly when it mounts or when 'content' changes.
  // This is important for cases where the content might be updated externally.
  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content, false);
      // console.log("Editor content set to: ", content);
    }
  }, [editor, content]);

  return <EditorContent editor={editor} />;
}

TiptapEditor.propTypes = {
  content: PropTypes.string.isRequired,
  onContentChange: PropTypes.func.isRequired,
  extensions: PropTypes.array.isRequired,
  editorClass: PropTypes.string,
};

import { EditorContent, useEditor } from "@tiptap/react";
import PropTypes from "prop-types";

export default function TipTapEditor({
  content,
  onContentChange,
  extensions,
  editorClass,
  placeHolder,
}) {
  const editor = useEditor({
    extensions: extensions,
    content: content,
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML());
    },

    editorProps: {
      attributes: {
        class: `prose dark:prose-invert prose-sm focus:outline-none max-w-none  ${editorClass}`,
      },
    },
  });

  // This sets the placeholder text dynamically if the editor supports it.
  // Note: This requires the Placeholder extension to be in the 'extensions' array.
  if (editor && placeHolder) {
    editor.extensionManager.extensions.find(
      (ext) => ext.name === "Placeholder"
    ).options.placeHolder = placeHolder;
  }
  return <EditorContent editor={editor} />;
}

TipTapEditor.propTypes = {
  content: PropTypes.string,
  onContentChange: PropTypes.func.isRequired,
  extensions: PropTypes.array.isRequired,
  editorClass: PropTypes.string,
  placeHolder: PropTypes.string,
};


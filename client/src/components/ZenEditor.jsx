// client/src/components/EditorZen.jsx

import TiptapEditor from "./TipTapEditor";
import StarterKit from "@tiptap/starter-kit";
import PropTypes from "prop-types";
// import Placeholder from '@tiptap/extension-placeholder';

// A specific "flavor" of the editor for the initial capture page.
export default function EditorZen({ content, onContentChange }) {
  // Define the minimal set of features for our Zen Mode editor.
  const zenExtensions = [
    StarterKit.configure({
      // Disable features we don't want in zen mode
      heading: false,
      blockquote: false,
      codeBlock: false,
      horizontalRule: false,
    }),
    // Placeholder.configure({
    //   // The text that appears when the editor is empty.
    //   placeholder: 'Let the words flow...',
    // }),
  ];

  return (
    <TiptapEditor
      content={content}
      onContentChange={onContentChange}
      extensions={zenExtensions}
      editorClass="p-4 h-[30rem] max-h-[40rem]" // Add some padding inside the editor
      placeholder="Let the words flow..." // Placeholder text for the editor
    />
  );
}

EditorZen.propTypes = {
  content: PropTypes.string.isRequired,
  onContentChange: PropTypes.func.isRequired,
};

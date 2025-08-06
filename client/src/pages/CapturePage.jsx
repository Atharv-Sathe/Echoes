import { useState } from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useLocalStorageDraft } from "../utils/useLocalStorageDraft";
import EditorZen from "../components/ZenEditor";

const DRAFT_KEY = "ephemeralNote";

export function CapturePage() {
  const [draft, setDraft, clearDraft] = useLocalStorageDraft(DRAFT_KEY, 2000);

  const [showEvolveModal, setShowEvolveModal] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");

  const handleEvolve = async () => {
    if (!title || !type || !draft) {
      return alert("Please provide a title and type for your note.");
    }

    console.log("Evolving Note : ", { title, type, content: draft });

    // API call to evolve the note

    clearDraft();
    setTitle("");
    setType("");
    setShowEvolveModal(false);
    // alert("Note evolved successfully!");
  };

  return (
    <div className="p-3 pt-2 max-w-4xl mx-auto min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold mb-4">Capture Your Thoughts</h1>
      <div className="flex-grow border rounded-lg dark:border-gray-700 shadow-sm h-fit">
        <EditorZen content={draft} onContentChange={setDraft} />
      </div>

      {/* Show button only if there is content in the draft */}
      {draft && draft !== "<p></p>" && (
        <div className="flex justify-center my-5">
          <Button
            gradientDuoTone="purpleToBlue"
            onClick={() => setShowEvolveModal(true)}
          >
            Evolve this Note
          </Button>
        </div>
      )}

      {/* ... The Evolve Modal ... */}
      <Modal
        show={showEvolveModal}
        // This should just close the modal. The evolve logic is handled by the button.
        onClose={() => setShowEvolveModal(false)}
        popup
        size="lg" // A slightly larger size for better spacing
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-4 pb-4 sm:pb-6 lg:px-6 xl:pb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Evolve Your Note
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Give your ephemeral thought a permanent form. Choose a title and a
              type to publish it.
            </p>

            {/* Title Input */}
            <div className="space-y-2">
              <Label htmlFor="title" value="Title" className="font-semibold" />
              <TextInput
                id="title"
                placeholder="Give your creation a title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Content Type Selection Grid */}
            <div className="space-y-2">
              <Label value="Choose its Form" className="font-semibold" />
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {["Journal", "Blog", "Poem", "Story", "Quote", "Learning"].map(
                  (contentType) => (
                    <button
                      key={contentType}
                      type="button"
                      onClick={() => setType(contentType)}
                      className={`w-full rounded-lg border-2 p-4 text-center text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500
              ${
                type === contentType
                  ? "border-cyan-500 bg-cyan-50 text-cyan-700 dark:bg-cyan-900/50 dark:text-white" // Selected Style
                  : "border-gray-300 bg-white hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600" // Default Style
              }`}
                    >
                      {contentType}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex w-full justify-between">
            <Button color="gray" onClick={() => setShowEvolveModal(false)}>
              Cancel
            </Button>
            <Button gradientDuoTone="purpleToBlue" onClick={handleEvolve}>
              Evolve & Publish
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

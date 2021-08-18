import { convertToRaw, EditorState } from "draft-js";
import Editor from "@draft-js-plugins/editor";
import { useEffect, useRef, useState } from "react";
import { DraftField } from "./Wrapper";
import "draft-js/dist/Draft.css";
import { TextField } from "./TextField";
import "@draft-js-plugins/mention/lib/plugin.css";
import { useDraftMention } from "../hooks/useDraftMention";

export const DraftEditor = () => {
  const ref = useRef<Editor>(null);
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const onChange = (editorState: EditorState) => {
    console.debug(
      JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    );
    setEditorState(editorState);
  };

  const mention = useDraftMention();
  return (
    <div>
      <TextField
        onClick={() => ref.current?.focus()}
        rows={4}
        fullWidth
        multiline
        variant="outlined"
        InputProps={{
          inputProps: {
            component: Editor,
            editorRef: ref,
            editorState,
            handleOnChange: onChange,
            plugins: mention.plugins,
          },
          inputComponent: DraftField,
        }}
      />
      {/* <Editor
        editorState={editorState}
        ref={ref}
        onChange={onChange}
        plugins={mention.plugins}
      /> */}
      <mention.MentionSuggestions
        open={mention.open}
        onOpenChange={mention.onOpenChange}
        suggestions={mention.suggestions}
        onSearchChange={mention.onSearchChange}
        onAddMention={() => {
          // get the mention object selected
        }}
      />
      <mention.EmojiSuggestions />
    </div>
  );
};

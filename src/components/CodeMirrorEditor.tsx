import React, { useState, useMemo } from "react";
import { createEditor, Descendant } from "slate";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import { withHistory } from "slate-history";
import {
  createAlignPlugin,
  createAutoformatPlugin,
  createBlockquotePlugin,
  createBoldPlugin,
  createCodeBlockPlugin,
  createCodePlugin,
  createDeserializeAstPlugin,
  createDeserializeCSVPlugin,
  createDeserializeHTMLPlugin,
  createDeserializeMDPlugin,
  createExitBreakPlugin,
  createFontBackgroundColorPlugin,
  createFontColorPlugin,
  createHeadingPlugin,
  createHighlightPlugin,
  createHistoryPlugin,
  createImagePlugin,
  createItalicPlugin,
  createKbdPlugin,
  createLinkPlugin,
  createListPlugin,
  createMediaEmbedPlugin,
  createNodeIdPlugin,
  createNormalizeTypesPlugin,
  createParagraphPlugin,
  createPlateComponents,
  createPlateOptions,
  createReactPlugin,
  createResetNodePlugin,
  createSelectOnBackspacePlugin,
  createSoftBreakPlugin,
  createStrikethroughPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin,
  createTablePlugin,
  createTodoListPlugin,
  createTrailingBlockPlugin,
  createUnderlinePlugin,
  ELEMENT_H1,
  ELEMENT_IMAGE,
  ELEMENT_MENTION,
  ELEMENT_PARAGRAPH,
  MARK_BG_COLOR,
  MARK_COLOR,
  MentionElement,
  MentionNodeData,
  MentionSelect,
  Plate,
  StyledLeaf,
  useEventEditorId,
  useFindReplacePlugin,
  useMentionPlugin,
  useStoreEditorRef,
  withProps,
  withStyledProps,
} from "@udecode/plate";
// import  {} from "@udecode/plate-mention"

import "emoji-mart/css/emoji-mart.css";
import { Emoji, Picker } from "emoji-mart";
import emoji from "emoji-mart/dist-es/components/emoji/emoji";
import { optionsAutoformat } from "../config/autoformat";
import {
  MENTIONABLES,
  optionsExitBreakPlugin,
  optionsResetBlockTypePlugin,
  optionsSoftBreakPlugin,
} from "../config/pluginOption";

const pluginsBasic = [
  createReactPlugin(), // withReact
  createHistoryPlugin(), // withHistory

  // elements
  createParagraphPlugin(), // paragraph element
  createBlockquotePlugin(), // blockquote element
  createCodeBlockPlugin(), // code block element
  createHeadingPlugin(), // heading elements

  // marks
  createBoldPlugin(), // bold mark
  createItalicPlugin(), // italic mark
  createUnderlinePlugin(), // underline mark
  createStrikethroughPlugin(), // strikethrough mark
  createCodePlugin(),
];

const options = createPlateOptions();

const Em = (props: { emoji: string }) => {
  <Emoji emoji={props.emoji} size={14} />;
};
export const renderMentionLabel = (mentionable: MentionNodeData) => {
  const entry = MENTIONABLES.find((m) => m.value === mentionable.value);
  if (!entry) return "unknown option";
  return `${entry.name} - ${entry.email}`;
};
let components = createPlateComponents({
  [ELEMENT_MENTION]: withProps(MentionElement, {
    renderLabel: renderMentionLabel,
  }),
  [MARK_COLOR]: withStyledProps(StyledLeaf, {
    leafProps: {
      [MARK_COLOR]: ["color"],
    },
  }),
  [MARK_BG_COLOR]: withStyledProps(StyledLeaf, {
    leafProps: {
      [MARK_BG_COLOR]: ["backgroundColor"],
    },
  }),
  // customize your components by plugin key
});

export const optionsMentionPlugin = {
  mentionables: MENTIONABLES,
  maxSuggestions: 10,
  insertSpaceAfterMention: false,
  trigger: "@",
  mentionableFilter: (s: string) => (mentionable: MentionNodeData) =>
    mentionable.email.toLowerCase().includes(s.toLowerCase()) ||
    mentionable.name.toLowerCase().includes(s.toLowerCase()),
  mentionableSearchPattern: "\\S*",
};

export const CodeMirrorEditor = () => {
  const [debugValue, setDebugValue] = useState(null);
  const { setSearch, plugin: searchHighlightPlugin } = useFindReplacePlugin();
  const { getMentionSelectProps, plugin: mentionPlugin } =
    useMentionPlugin(optionsMentionPlugin);

  const pluginsMemo = useMemo(() => {
    const plugins = [
      createReactPlugin(),
      createHistoryPlugin(),
      createParagraphPlugin(),
      createBlockquotePlugin(),
      createTodoListPlugin(),
      createHeadingPlugin(),
      createImagePlugin(),
      createLinkPlugin(),
      createListPlugin(),
      createTablePlugin(),
      createMediaEmbedPlugin(),
      createCodeBlockPlugin(),
      createAlignPlugin(),
      createBoldPlugin(),
      createCodePlugin(),
      createItalicPlugin(),
      createHighlightPlugin(),
      createUnderlinePlugin(),
      createStrikethroughPlugin(),
      createSubscriptPlugin(),
      createSuperscriptPlugin(),
      createFontColorPlugin(),
      createFontBackgroundColorPlugin(),
      createKbdPlugin(),
      createNodeIdPlugin(),
      createAutoformatPlugin(optionsAutoformat),
      createResetNodePlugin(optionsResetBlockTypePlugin),
      createSoftBreakPlugin(optionsSoftBreakPlugin),
      createExitBreakPlugin(optionsExitBreakPlugin),
      createTrailingBlockPlugin({ type: ELEMENT_PARAGRAPH }),
      createSelectOnBackspacePlugin({ allow: ELEMENT_IMAGE }),
      mentionPlugin,
      searchHighlightPlugin,
    ];

    plugins.push(
      ...[
        createDeserializeMDPlugin({ plugins }),
        createDeserializeCSVPlugin({ plugins }),
        createDeserializeHTMLPlugin({ plugins }),
        createDeserializeAstPlugin({ plugins }),
      ]
    );

    return plugins;
  }, [mentionPlugin, options, searchHighlightPlugin]);
  const editor = useStoreEditorRef(useEventEditorId("focus"));
  const defaultOptions = createPlateOptions();
  const editableProps = {
    placeholder: "Type…",
    style: {
      padding: "15px",
    },
  };

  const addEmoji = async (emoji: any) => {
    await setTimeout(() => {
      editor?.insertText(emoji.native);
    }, 100);
  };

  return (
    <>
      <Plate
        id="2"
        editableProps={editableProps}
        plugins={pluginsMemo}
        components={components}
        options={defaultOptions}
        onChange={(value) => {
          console.debug(JSON.stringify(value));
        }}
      />
      <Emoj addEmoji={addEmoji} />
      <MentionSelect
        {...getMentionSelectProps()}
        renderLabel={renderMentionLabel}
      />
    </>
  );
};

const Emoj = (props: any) => {
  return <Picker onSelect={(e) => props.addEmoji(e)} />;
};

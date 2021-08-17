import {
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_PARAGRAPH,
  ELEMENT_TD,
  ELEMENT_TODO_LI,
  ELEMENT_IMAGE,
  ExitBreakPluginOptions,
  createPlateOptions,
  isBlockAboveEmpty,
  isSelectionAtBlockStart,
  KEYS_HEADING,
  MentionNodeData,
  ResetBlockTypePluginOptions,
  SoftBreakPluginOptions,
} from "@udecode/plate";
export const MENTIONABLES: MentionNodeData[] = [
  {
    value: "0",
    name: "Aayla Secura",
    email: "aayla_secura@force.com",
    imageUrl: "hogehoge",
  },
  { value: "1", name: "Adi Gallia", email: "adi_gallia@force.com" },
  {
    value: "2",
    name: "Admiral Dodd Rancit",
    email: "admiral_dodd_rancit@force.com",
  },
  {
    value: "3",
    name: "Admiral Firmus Piett",
    email: "admiral_firmus_piett@force.com",
  },
];

export const options = createPlateOptions();

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

const resetBlockTypesCommonRule = {
  types: [options[ELEMENT_BLOCKQUOTE].type, options[ELEMENT_TODO_LI].type],
  defaultType: options[ELEMENT_PARAGRAPH].type,
};

export const optionsResetBlockTypePlugin: ResetBlockTypePluginOptions = {
  rules: [
    {
      ...resetBlockTypesCommonRule,
      hotkey: "Enter",
      predicate: isBlockAboveEmpty,
    },
    {
      ...resetBlockTypesCommonRule,
      hotkey: "Backspace",
      predicate: isSelectionAtBlockStart,
    },
  ],
};

export const optionsSoftBreakPlugin: SoftBreakPluginOptions = {
  rules: [
    { hotkey: "shift+enter" },
    {
      hotkey: "enter",
      query: {
        allow: [
          options[ELEMENT_CODE_BLOCK].type,
          options[ELEMENT_BLOCKQUOTE].type,
          options[ELEMENT_TD].type,
        ],
      },
    },
  ],
};

export const optionsExitBreakPlugin: ExitBreakPluginOptions = {
  rules: [
    {
      hotkey: "mod+enter",
    },
    {
      hotkey: "mod+shift+enter",
      before: true,
    },
    {
      hotkey: "enter",
      query: {
        start: true,
        end: true,
        allow: KEYS_HEADING,
      },
    },
    {
      hotkey: "enter",
      query: {
        allow: [options[ELEMENT_IMAGE].type],
      },
    },
    {
      hotkey: "enter",
      before: true,
      query: {
        start: true,
        allow: [options[ELEMENT_PARAGRAPH].type],
      },
    },
  ],
};

export const editableProps = {
  placeholder: "Enter some rich text…",
  spellCheck: false,
  padding: "0 30px",
};

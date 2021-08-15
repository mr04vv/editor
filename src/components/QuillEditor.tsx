import { useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "quill-mention";
import { Button } from "@material-ui/core";
import { BoundsStatic, Delta, DeltaStatic, RangeStatic } from "quill";
import "@nutrify/quill-emoji-mart-picker/emoji.quill.css";
import { Emoji, emojis } from "@nutrify/quill-emoji-mart-picker";
import QuillMarkdown from "quilljs-markdown";
import MarkdownShortcuts from "quill-markdown-shortcuts";
import "quilljs-markdown/dist/quilljs-markdown-common-style.css";
interface UnprivilegedEditor {
  getLength(): number;
  getText(index?: number, length?: number): string;
  getHTML(): string;
  getBounds(index: number, length?: number): BoundsStatic;
  getSelection(focus?: boolean): RangeStatic;
  getContents(index?: number, length?: number): DeltaStatic;
}

const customEmojis = [
  {
    name: "inow",
    shortNames: ["inow"],
    text: "",
    emoticons: [],
    keywords: ["inow"],
    imageUrl:
      "https://emoji.slack-edge.com/T02D68X3V/inow/6e978745c95ef425.png",
  },
  {
    name: "oneteam",
    shortNames: ["oneteam"],
    text: "",
    emoticons: [],
    keywords: ["oneteam"],
    imageUrl:
      "https://emoji.slack-edge.com/T02D68X3V/oneteam/29882496d60b5772.png",
  },
  {
    name: "azamasu",
    shortNames: ["azamasu"],
    text: "",
    emoticons: [],
    keywords: ["azamasu"],
    imageUrl:
      "https://emoji.slack-edge.com/T02D68X3V/azamasu/5b4bd44f64266bd4.png",
  },
];

const atValues = [
  {
    id: 1,
    value: "Fredrik Sundqvist",
    imageUrl:
      "https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg",
  },
  {
    id: 2,
    value: "Patrik Sjölin",
    imageUrl:
      "https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg",
  },
];
const hashValues = [
  { id: 3, value: "Fredrik Sundqvist 2" },
  { id: 4, value: "Patrik Sjölin 2" },
];
const modules2 = {
  markdownShortcuts: {},

  mention: {
    toolbar: false,
    allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
    mentionDenotationChars: ["@", "#"],
    dataAttributes: [
      "id",
      "value",
      "denotationChar",
      "link",
      "target",
      "disabled",
      "imageUrl",
    ],
    renderItem: (item: any, searchTerm: any) => {
      return `
            <div style="display: flex; align-items: center;">
            <div style="margin-right: 8px; display: flex; align-items: center;">
              <img src="${item.imageUrl}" width=30 height=30>
              </div>
              ${item.value}
            </div>`;
    },
    source: function (searchTerm: any, renderList: any, mentionChar: any) {
      let values;

      if (mentionChar === "@") {
        values = atValues;
      } else {
        values = hashValues;
      }

      if (searchTerm.length === 0) {
        renderList(values, searchTerm);
      } else {
        const matches = [];
        for (let i = 0; i < values.length; i++)
          if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase()))
            matches.push(values[i]);
        renderList(matches, searchTerm);
      }
    },
  },
  "emoji-module": {
    emojiData: emojis,
    customEmojiData: customEmojis,
    preventDrag: true,
    showTitle: true,
    indicator: ":",
    convertEmoticons: false,
    convertShortNames: true,
  },
};
const modules = {
  mention: {
    toolbar: false,
    allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
    mentionDenotationChars: ["@", "#"],
    dataAttributes: [
      "id",
      "value",
      "denotationChar",
      "link",
      "target",
      "disabled",
      "imageUrl",
    ],
    renderItem: (item: any, searchTerm: any) => {
      return `
          <div style="display: flex; align-items: center;">
          <div style="margin-right: 8px; display: flex; align-items: center;">
            <img src="${item.imageUrl}" width=30 height=30>
            </div>
            ${item.value}
          </div>`;
    },
    source: function (searchTerm: any, renderList: any, mentionChar: any) {
      let values;

      if (mentionChar === "@") {
        values = atValues;
      } else {
        values = hashValues;
      }

      if (searchTerm.length === 0) {
        renderList(values, searchTerm);
      } else {
        const matches = [];
        for (let i = 0; i < values.length; i++)
          if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase()))
            matches.push(values[i]);
        renderList(matches, searchTerm);
      }
    },
  },
  "emoji-module": {
    emojiData: emojis,
    customEmojiData: customEmojis,
    preventDrag: true,
    showTitle: true,
    indicator: ":",
    convertEmoticons: false,
    convertShortNames: true,
  },
};
Quill.register("modules/markdownShortcuts", MarkdownShortcuts);

export const QuillEditor = () => {
  const [value, setValue] = useState<string>("");
  const [showValue, setShowValue] = useState<Delta>();
  const [rawValue, setRawValue] = useState<Delta>();

  useEffect(() => {
    const savedRaw = localStorage.getItem("quill");
    if (!savedRaw) {
      return;
    }
    const cc = JSON.parse(savedRaw);
    setShowValue(cc);
  }, []);

  const set = (v: string, _: any, __: any, editor: UnprivilegedEditor) => {
    setRawValue(editor.getContents());
    // console.debug(JSON.stringify(editor.getContents()));
    setValue(v);
  };

  const onClick = () => {
    const raw = JSON.stringify(rawValue);
    localStorage.setItem("quill", raw);
  };

  return (
    <div>
      <ReactQuill defaultValue={rawValue} onChange={set} modules={modules} />
      <Button onClick={onClick}>save</Button>
      {showValue && (
        <ReactQuill
          defaultValue={showValue}
          onChange={set}
          modules={modules2}
          // formats={["mention", "emoji", "custom", "image", "img", "emoji-module"]}
        />
      )}
      <Button onClick={onClick}>save</Button>
    </div>
  );
};

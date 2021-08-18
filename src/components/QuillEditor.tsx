import { useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "quill-mention";
import 'element-remove'
// import { Button, TextField } from "@material-ui/core";
// import { BoundsStatic, Delta, DeltaStatic, RangeStatic } from "quill";
// import "@nutrify/quill-emoji-mart-picker/emoji.quill.css";
import './a.css'
import { Emoji, emojis } from "@nutrify/quill-emoji-mart-picker";
// import MarkdownShortcuts from "quill-markdown-shortcuts";
// import { QuillField } from "./Wrapper";
// import styled from "styled-components";
// import QuillMarkdown from "quilljs-markdown";

// interface UnprivilegedEditor {
//   getLength(): number;
//   getText(index?: number, length?: number): string;
//   getHTML(): string;
//   getBounds(index: number, length?: number): BoundsStatic;
//   getSelection(focus?: boolean): RangeStatic;
//   getContents(index?: number, length?: number): DeltaStatic;
// }

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
// Quill.register("modules/markdownShortcuts", MarkdownShortcuts);

const modules = {
  toolbar: false,
  mention: {
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



export const QuillEditor = () => {
  const [value, setValue] = useState<string>("");
  // const [showValue, setShowValue] = useState<Delta>();
  // const [rawValue, setRawValue] = useState<Delta>();
  // const [defaultShowValue, setDefaultShowValue] = useState<Delta>();

  // useEffect(() => {
  //   const savedRaw = localStorage.getItem("quill");
  //   if (!savedRaw) {
  //     return;
  //   }
  //   const cc = JSON.parse(savedRaw);
  //   setDefaultShowValue(cc);
  //   setTimeout(() => {
  //     ref.current?.focus();
  //   }, 50);
  // }, []);

  const set = (v: string, _: any, __: any) => {
    // setRawValue(editor.getContents());
    // console.debug(JSON.stringify(editor.getContents()));
    setValue(v);
  };

  // const onClick = () => {
  //   const rawValue = ref.current?.getEditor().getContents();

  //   const raw = JSON.stringify(rawValue);
  //   console.debug(raw);
  //   localStorage.setItem("quill", raw);
  // };
  // const onClick2 = () => {
  //   const rawValue = ref2.current?.getEditor().getContents();

  //   const raw = JSON.stringify(rawValue);
  //   console.debug(raw);
  //   localStorage.setItem("quill", raw);
  // };
  // const ref = useRef<ReactQuill>(null);
  // const ref2 = useRef<ReactQuill>(null);
  return (
    <div>
      {/* <TextField
        onClick={() => ref.current?.focus()}
        rows={4}
        fullWidth
        multiline
        variant="outlined"
        InputProps={{
          inputComponent: ({ ...rest }) => (
            <CustomQuill
              onFocus={rest.onFocus as any}
              onBlur={rest.onBlur as any}
              // theme="bubble"
              ref={ref}
              // defaultValue={rawValue}
              // onChange={set}
              modules={modules}
            />
          ),
        }}
      /> */}

      <ReactQuill
        // ref={ref}
        defaultValue={value}
        // onChange={set}
        modules={modules}
      />
      {/* <Button onClick={onClick}>save</Button>
      {defaultShowValue && (
        <TextField
          // onClick={() => ref.current?.focus()}
          rows={4}
          fullWidth
          multiline
          variant="outlined"
          InputProps={{
            inputComponent: () => (
              <CustomQuill
                theme="bubble"
                ref={ref2}
                defaultValue={defaultShowValue}
                // onChange={set}
                modules={modules}
              />
            ),
          }}
        />
      )}
      <Button onClick={onClick2}>save</Button> */}
    </div>
  );
};

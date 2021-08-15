import { useCallback, useMemo, useState } from "react";

import createMentionPlugin, {
  defaultSuggestionsFilter,
  MentionData,
} from "@draft-js-plugins/mention";
import "@draft-js-plugins/emoji/lib/plugin.css";
// スタイル微調整のため

import createEmojiPlugin from "@draft-js-plugins/emoji";

export const mentions: MentionData[] = [
  {
    id: 1,
    name: "Tagami",
    avatar:
      "https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg",
    link: "https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg",
  },
  {
    id: 2,
    name: "Kawamura Seiya",
    avatar: "https://avatars2.githubusercontent.com/u/1188186?v=3&s=400",
  },
  {
    id: 3,
    name: "Dai",
    avatar: "https://avatars0.githubusercontent.com/u/2182307?v=3&s=400",
  },
  {
    id: 4,
    name: "Mori Gump Takuto",
    avatar: "https://avatars0.githubusercontent.com/u/7525670?s=200&v=4",
  },
  {
    id: 5,
    name: "Nik Graf",
    avatar: "https://avatars0.githubusercontent.com/u/223045?v=3&s=400",
  },
  {
    id: 6,
    name: "Pascal Brandt",
    avatar:
      "https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png",
  },
  {
    id: 7,
    name: "Pascal Brandt",
    avatar:
      "https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png",
  },
  {
    id: 8,
    name: "Pascal Brandt",
    avatar:
      "https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png",
  },
  {
    id: 9,
    name: "Pascal Brandt",
    avatar:
      "https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png",
  },
  {
    id: 10,
    name: "Pascal Brandt",
    avatar:
      "https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png",
  },
  {
    id: 11,
    name: "Pascal Brandt",
    avatar:
      "https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png",
  },
  {
    id: 12,
    name: "Pascal Brandt",
    avatar:
      "https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png",
  },
  {
    id: 13,
    name: "Pascal Brandt",
    avatar:
      "https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png",
  },
  {
    id: 14,
    name: "Pascal Brandt",
    avatar:
      "https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png",
  },
];

export const useDraftMention = () => {
  const [open, setOpen] = useState(false);
  const onOpenChange = useCallback((_open: boolean) => {
    setOpen(_open);
  }, []);

  const onSearchChange = useCallback(({ value }: { value: string }) => {
    setSuggestions(defaultSuggestionsFilter(value, mentions));
  }, []);
  const { MentionSuggestions, plugins, EmojiSuggestions, EmojiSelect } =
    useMemo(() => {
      const mentionPlugin = createMentionPlugin({
        entityMutability: "IMMUTABLE",
        mentionPrefix: "@",
        supportWhitespace: true,
      });

      const emojiPlugin = createEmojiPlugin({
        useNativeArt: true,
      });

      // eslint-disable-next-line no-shadow
      const { MentionSuggestions } = mentionPlugin;
      const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
      // eslint-disable-next-line no-shadow
      const plugins = [mentionPlugin, emojiPlugin];
      return { plugins, MentionSuggestions, EmojiSuggestions, EmojiSelect };
    }, []);

  const [suggestions, setSuggestions] = useState(mentions);

  return {
    MentionSuggestions,
    plugins,
    EmojiSuggestions,
    EmojiSelect,
    suggestions,
    setSuggestions,
    open,
    onOpenChange,
    onSearchChange,
  };
};

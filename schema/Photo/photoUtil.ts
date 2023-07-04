export const precessHashtags = (caption: string) => {
  const hashtags = caption.match(/#[\w]+/g);
  return hashtags?.map((hashtag) => ({
    where: {
      hashtag,
    },
    create: {
      hashtag,
    },
  }));
};

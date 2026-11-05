/**
 * Approved photography. EMPTY ON PURPOSE.
 *
 * Drop optimised files in /public/images and add them here once the client has
 * approved them. Sections that use these arrays render nothing while empty.
 *
 * Do not add stock photos or generated likenesses of the client.
 */
export type ApprovedImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export const media: {
  portrait?: ApprovedImage;
  riding: ApprovedImage[];
} = {
  portrait: undefined,
  riding: [],
};

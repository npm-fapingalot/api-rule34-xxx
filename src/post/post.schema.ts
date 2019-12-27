/**
 * The object used to describe a tag
 */
export interface ITag {
  /**
   * The name
   */
  name: string;
  /**
   * The href of the link
   */
  href: string;
}

/**
 * A object used to describe a page
 */
export interface IPage {
  /**
   * A list of possible image URLs
   */
  imgURL: string[];
}

/**
 * A object used to describe a tagged data
 */
export interface ITagged {
  characters: ITag[];
  tags: ITag[];
  artists: ITag[];
  copyrights: ITag[];
  metadata: ITag[];
}

/**
 * A object used to describe a post data
 */
export interface IData {
  /**
   * The pages
   */
  pages: IPage[];
}

/**
 * A object used to describe a post
 */
export interface IPost extends ITagged, IData {
  /**
   * The id of the post
   */
  id: number;
}

import { nanoid } from "nanoid";
import { Database } from "../../../constants";
import { USERS } from "./tables/users";
import { POSTS } from "./tables/posts";
import { TAGS } from "./tables/tags";
import { COMMENTS } from "./tables/comments";
import { CATEGORIES } from "./tables/categories";
import { POST_TAGS } from "./tables/post_tags";
import { FK_USER_POSTS } from "./relationships/fk_user_posts";
import { FK_POSTS_CATEGORY } from "./relationships/fk_posts_category";
import { FK_POST_TAGS_TAG } from "./relationships/fk_post_tags_tag";
import { FK_POST_TAGS_POST } from "./relationships/fk_post_tags_post";
import { FK_COMMENTS_USER } from "./relationships/fk_comments_user";
import { FK_COMMENTS_POST } from "./relationships/fk_comments_post";
import type { Diagram } from "../../../../models/diagram";

export const BLOG: Diagram = {
  id: nanoid(6),
  name: "Blog Schema",
  type: Database.POSTGRESQL,
  tables: [USERS, POSTS, TAGS, COMMENTS, CATEGORIES, POST_TAGS],
  relationships: [
    FK_USER_POSTS,
    FK_POSTS_CATEGORY,
    FK_POST_TAGS_TAG,
    FK_POST_TAGS_POST,
    FK_COMMENTS_USER,
    FK_COMMENTS_POST,
  ],
};

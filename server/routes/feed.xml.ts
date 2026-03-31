import { createFeed } from "../utils/feed";

export default defineEventHandler((event) => createFeed(event, "zh"));

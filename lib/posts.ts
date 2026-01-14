import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/^\d+\.\s*/, '').replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      const processedContent = remark()
        .use(html)
        .processSync(matterResult.content);
      const content = processedContent.toString();

      return {
        slug,
        title: matterResult.data.title,
        date: matterResult.data.date,
        excerpt: matterResult.data.excerpt,
        content,
      } as Post;
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug);
}
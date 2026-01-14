import { getAllPosts, Post } from '../../lib/posts';
import Link from 'next/link';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto px-4 py-8 pt-30">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="space-y-4 pr-40">
        {posts.map((post: Post) => (
          <div key={post.slug} className="border-b pb-4">
            <Link href={`/blog/${post.slug}`} className="text-xl font-semibold hover:underline">
              {post.title}
            </Link>
            <p className="text-gray-600">{post.excerpt}</p>
            <p className="text-sm text-gray-500">{post.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
import { getPostBySlug, getAllPosts, Post } from '../../../lib/posts';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-5 py-8 pt-30">
      <article>
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-500 mb-8">{post.date}</p>
        <div
          className="prose prose-lg max-w-none px-5 lg:px-50 text-justify
            prose-h1:mb-4
    prose-h2:mb-3
    prose-h3:mb-2
    prose-h1:mt-8
    prose-h2:mt-6
    prose-h3:mt-4"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post: Post) => ({
    slug: post.slug,
  }));
}
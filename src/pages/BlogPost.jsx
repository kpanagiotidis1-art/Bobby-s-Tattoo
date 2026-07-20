import { Link, useParams } from 'react-router-dom'
import Seo from '@/components/Seo'
import { BLOG_POSTS } from '@/constants/blog'
import NotFound from '@/pages/NotFound'

const dateFormatter = new Intl.DateTimeFormat('en-GB', { dateStyle: 'long' })

export default function BlogPost() {
  const { slug } = useParams()
  const post = BLOG_POSTS.find((item) => item.slug === slug)

  if (!post) return <NotFound />

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <Seo title={post.title} description={post.excerpt} />
      <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">
        &larr; Back to blog
      </Link>
      <p className="mt-6 text-sm text-muted-foreground">
        {post.author} · {dateFormatter.format(new Date(post.publishedAt))}
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">{post.title}</h1>
      <p className="mt-6 whitespace-pre-line text-muted-foreground">{post.body}</p>
    </article>
  )
}

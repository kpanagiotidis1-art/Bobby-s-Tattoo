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
      <Link to="/blog" viewTransition className="text-sm text-muted-foreground hover:text-foreground">
        &larr; Back to blog
      </Link>
      <p className="mt-6 text-sm text-muted-foreground">
        {post.author} · {dateFormatter.format(new Date(post.publishedAt))}
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">{post.title}</h1>

      <img
        src={post.image}
        alt={post.imageAlt}
        className="mt-8 aspect-[16/9] w-full rounded-xl object-cover"
      />

      {/* Each post's body is written as blank-line-separated blocks, where
          every block except the first/last is "Heading line\nParagraph
          text" — split on that structure to style headings distinctly,
          rather than restructuring the (client-reviewed) content itself. */}
      {post.body.split('\n\n').map((block) => {
        const [firstLine, ...rest] = block.split('\n')
        const paragraph = rest.join(' ')

        if (!paragraph) {
          return (
            <p key={block} className="mt-6 text-muted-foreground">
              {firstLine}
            </p>
          )
        }

        return (
          <div key={block} className="mt-6">
            <h2 className="font-semibold tracking-tight">{firstLine}</h2>
            <p className="mt-2 text-muted-foreground">{paragraph}</p>
          </div>
        )
      })}
    </article>
  )
}

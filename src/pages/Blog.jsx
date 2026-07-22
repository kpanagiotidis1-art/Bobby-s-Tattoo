import { Link } from 'react-router-dom'
import Seo from '@/components/Seo'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { BLOG_POSTS } from '@/constants/blog'

const dateFormatter = new Intl.DateTimeFormat('en-GB', { dateStyle: 'long' })

export default function Blog() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <Seo
        title="Blog"
        description="Tattoo care, style guides, and studio news from Bobby's Tattoo in Darlinghurst, Sydney."
      />
      <h1 className="text-center text-3xl font-semibold tracking-tight">Blog</h1>
      <p className="mt-3 text-center text-muted-foreground">Tattoo care, style guides, and studio news.</p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {BLOG_POSTS.map((post) => (
          <Link key={post.slug} to={`/blog/${post.slug}`} viewTransition>
            <Card className="h-full border-t-2 border-t-transparent transition-[box-shadow,border-color] hover:border-t-brand hover:shadow-md">
              <img src={post.image} alt={post.imageAlt} className="aspect-[16/9] w-full object-cover" />
              <CardHeader>
                <CardDescription>{dateFormatter.format(new Date(post.publishedAt))}</CardDescription>
                <CardTitle className="text-lg">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">{post.excerpt}</CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}

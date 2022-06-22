import { Link, useLoaderData } from '@remix-run/react'
import type { LoaderFunction } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import { getPostListings } from '~/models/post.server'
import { useOptionalAdminUser } from '~/utils'

type LoaderData = {
    posts: Awaited<ReturnType<typeof getPostListings>>
}

export const loader: LoaderFunction = async () => {
    const posts = await getPostListings()
    return json<LoaderData>({ posts })
}

export default function PostsRoute() {
    const { posts } = useLoaderData() as LoaderData
    const adminUser = useOptionalAdminUser()

    return (
        <main>
            <h1 className="mb-4 text-4xl text-blue-800">Posts</h1>
            {adminUser ? (
                <Link to="admin" className="text-red-600 underline">
                    Admin
                </Link>
            ) : null}
            {posts.map(post => (
                <li key={post.slug}>
                    <Link
                        to={post.slug}
                        prefetch="intent"
                        className="text-blue-600 underline">
                        {post.title}
                    </Link>
                </li>
            ))}
        </main>
    )
}

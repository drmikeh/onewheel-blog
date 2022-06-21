import { Link, useLoaderData } from '@remix-run/react'
import type { LoaderFunction } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import { getPostListings } from '~/models/post.server'

type LoaderData = {
    posts: Awaited<ReturnType<typeof getPostListings>>
}

export const loader: LoaderFunction = async () => {
    const posts = await getPostListings()
    return json<LoaderData>({ posts })
}

export default function PostsRoute() {
    const { posts } = useLoaderData() as LoaderData

    return (
        <main className="m-8">
            <h1 className="mb-4 text-4xl text-blue-800">Posts</h1>
            <Link to="admin" className="text-red-600 underline">
                Admin
            </Link>
            {posts.map(post => (
                <li key={post.slug}>
                    <Link to={post.slug} className="text-blue-600 underline">
                        {post.title}
                    </Link>
                </li>
            ))}
        </main>
    )
}

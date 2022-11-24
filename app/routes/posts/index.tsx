import { Link, useLoaderData } from "@remix-run/react"
import type { PostsProps } from "~/typings"
import { db } from "~/utils/db.server"


export const loader = async () => {
    const data = {
        posts:
            await db.post.findMany({
                select: { id: true, createdAt: true, title: true },
                orderBy: { createdAt: 'desc' }
            })
    }
    return data
}

function PostItems() {

    const { posts }: PostsProps = useLoaderData()

    return (
        <>
            <div className="page-header">
                <h1>All Posts</h1>
                <Link to={'/posts/new'} className='btn'>
                    New Post
                </Link>
            </div>
            <ul className="posts-list">

                {posts.map(post => (
                    <Link key={post.id} to={`/posts/${post.id}`}>
                        <li >
                            <h3>{post.title}</h3>
                            {new Date(post.createdAt).toLocaleString()}
                        </li>
                    </Link>
                ))}
            </ul>


        </>
    )
}

export default PostItems
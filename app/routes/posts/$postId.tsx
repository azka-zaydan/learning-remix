import { useLoaderData } from "@remix-run/react"
import { db } from "~/utils/db.server"
import type { LoaderFunction } from "@remix-run/node"
import type { DataProps } from "~/typings"

export const loader: LoaderFunction = async ({ params }) => {
    const data = await db.post.findUnique({ where: { id: params.postId }, })
    return data
}

function Post() {
    const post: DataProps = useLoaderData()
    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>

            <pre>{new Date(post.createdAt).toLocaleString()}</pre>
            <pre>Last Updated: {new Date(post.updatedAt).toLocaleString()}</pre>
        </div>
    )
}

export default Post
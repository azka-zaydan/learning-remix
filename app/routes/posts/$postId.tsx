import { Link, useLoaderData, useParams } from "@remix-run/react"
import { db } from "~/utils/db.server"
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node"
import type { DataProps, ErrorProps } from "~/typings"
import type { CatchBoundaryComponent } from "@remix-run/react/dist/routeModules"
import { useState } from "react";

export const loader: LoaderFunction = async ({ params }) => {
    const data = await db.post.findUnique({ where: { id: params.postId }, })
    if (!data) {
        throw new Response("Not Found", {
            status: 404,
        });
    }

    return data
}

export const action: ActionFunction = async ({ request, params }) => {
    const form = await request.formData()
    if (form.get('_method') === 'delete') {
        const data = await db.post.findUnique({ where: { id: params.postId }, })
        if (!data) {
            throw new Response("Not Found", {
                status: 404,
            });
        }

        await db.post.delete({ where: { id: params.postId } })
        return redirect('/posts')
    }
}


function Post() {
    const post: DataProps = useLoaderData()
    const [open, setOpen] = useState(false)
    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <form method="POST">
                <input type="hidden" name="_method" id="" value={'delete'} />
                <button className="btn btn-delete">Delete</button>
            </form>

            <form method="POST">
                <div className="form-control">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" />
                </div>
                <div className="form-control">
                    <label htmlFor="body">Body</label>
                    <textarea name="body" id="body" />
                </div>
                <button type="submit" className="btn btn-block">Edit Post</button>
            </form>
            <pre>{new Date(post.createdAt).toLocaleString()}</pre>
            <pre>Last Updated: {new Date(post.updatedAt).toLocaleString()}</pre>
        </div>
    )
}

export default Post

export function CatchBoundary() {
    return (
        <div>
            <h2>We couldn't find that page!</h2>
            <Link to={'/posts'} className='btn'>
                Back
            </Link>
        </div>
    );
}
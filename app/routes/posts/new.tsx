import { Link } from "@remix-run/react"
import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node"
import { db } from "~/utils/db.server";
import type { ErrorProps } from "~/typings";
export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData()


    const title = form.get('title')
    const body = form.get('body')

    if (body?.toString() === '' || title?.toString() === '') {
        throw new Error('Please Enter Body and Title')
    } else if (body && title) {
        const fields = { title: title.toString(), body: body.toString() }
        const post = await db.post.create({ data: fields })

        return redirect(`/posts/${post.id}`)
    }


}

function NewPost() {
    return (
        <>
            <div className="page-header">
                <h1>New Post</h1>
                <Link to={'/posts'} className="btn btn-reverse">
                    Back
                </Link>
            </div>

            <div className="page-content">
                <form method="POST">
                    <div className="form-control">
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" id="title" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="body">Body</label>
                        <textarea name="body" id="body" />
                    </div>
                    <button type="submit" className="btn btn-block">Add Post</button>
                </form>
            </div>
        </>
    )
}

export const ErrorBoundary = ({ error }: ErrorProps) => {
    console.log(error);
    return (
        <>
            <h1>Error</h1>
            <p>{error.message}</p>
            <Link to={'/posts/new'} className='btn'>
                try again
            </Link>
        </>
    )
}



export default NewPost
import { useEffect, useState } from "react"
import { getCommentsToRecipe } from "../api"

export const Comments = (props) => {
    const [comments, setComments] = useState()
    const { id } = props

    useEffect(() => {
        getCommentsToRecipe(id)
            .then(x => {
                if (x.status == 200) {
                    debugger
                    setComments(x.data)
                }
            }
            )
            .catch()
    }, [])

    return <>
        {comments && comments.map(comment =>
            <div>
                <p>{comment.comment}</p>
                <br></br>
            </div>
        )}
    </>
}
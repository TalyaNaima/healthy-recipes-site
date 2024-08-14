import { useState } from "react"
import { postCommentsToRecipe, postRecipe } from "../api"
import './NavBar.css'
import { useSelector } from "react-redux"
import { Comments } from "./Comments"


export const RecipeDetails = (props) => {

    const [flag, setFlag] = useState()
    const [flag2, setflag2] = useState()
    const currentUser = useSelector(u => { return u.currentUser })

    const { id, name, pic, preparationTime, userId, userName, categoryId, categoryName,
        levelId, levelName, note, instructions } = props

    const send = (event) => {
        let comment = {
            "recipeId": id,
            "userId": userId,
            "userName": userName,
            "comment": event.target[0].value
        }

        debugger

        postCommentsToRecipe(comment)
            .then(
                alert("thank's for your comment")
            )
            .catch(
                alert("something went wrong...")
            )
    }

    return <>

        <p>id: {id}</p>
        <p>name: {name}</p>
        <p>pic: {pic}</p>
        <p>preparation time: {preparationTime}</p>
        <p>user id: {userId}</p>
        <p>user name: {userName}</p>
        <p>category id: {categoryId}</p>
        <p>category name: {categoryName}</p>
        <p>level id: {levelId}</p>
        <p>level name: {levelName}</p>
        <p>instructions: {instructions}</p>

        <button onClick={e => setflag2(!flag2)}>comments</button>
        {flag2 && <Comments id={id}></Comments>}
        <br></br><br></br>
        {currentUser != "" && <button onClick={e => setFlag(!flag)}>to add a comment to the recipe</button>}
        <br></br><br></br>
        {flag && <form onSubmit={e => send(e)}>
            <input placeholder="write your comment here:" ></input>
            <button type="submit" >submit</button>
        </form>
        }

    </>
}
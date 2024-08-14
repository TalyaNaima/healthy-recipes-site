import { useEffect, useState } from "react"
import { getRecipes } from "../api"
import { useSelector } from "react-redux"
import {RecipeDetails} from "./RecipeDetails"

export const MyRecipes = () => {
    const currentUser = useSelector(u => { return u.currentUser })
    const [list,setList]=useState()
    const [flag,setFlag]=useState()
    const [recipe, setRecipe] = useState()
    useEffect(() => {
        debugger
        getRecipes()
        .then(x => {
            setList(x.data)})
        .catch(x=> {if (x && x.status != 200)
             alert("couldn't get recipes")})
        }
    )
    return <>
    <div>
        {list && list.map(item => {
                {
                    debugger
                    if ((item.userName ==`${currentUser.firstName} ${currentUser.lastName}` ) )
                        return (
                            <div className={`${item.categoryName}`}>
                                <p>{item.name}</p>
                                <img src={`${item.pic}`}></img>
                                <p>{item.userName}</p>
                                <button placeholder="for more details" onClick={e => {
                                    setFlag(true)
                                    // setRecipe(item)
                                }}>for more detailes</button>
                            </div>
                        )
                }
            })}
            {flag && 
            <RecipeDetails name={recipe.name} id={recipe.id} pic={recipe.pic}
                preperation={recipe.preparationTime}
                userId={recipe.userId} userName={recipe.userName}
                categoryId={recipe.categoryId}
                categoryName={recipe.categoryName} levelId={recipe.levelId}
                levelName={recipe.levelName} note={recipe.note}
                instructions={recipe.instructions} >
            </RecipeDetails>}
        </div>
    </>
}
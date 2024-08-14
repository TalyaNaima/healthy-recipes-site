import { useEffect, useState } from "react"
import { getCategory, getLevel, getRecipes } from "../api"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { RecipeDetails } from "./RecipeDetails"
import './NavBar.css'
import './recipes.css'


export const AllRecipes = () => {
    const [list, setlist] = useState()
    const [listCategories, setCList] = useState()
    const [byCategory, setByCategory] = useState()
    const [listLevels, setLList] = useState()
    const [byLevel, setByLevel] = useState()
    const [listAuthors, setlAuthors] = useState()
    const [byAuthors, setByAuthors] = useState()
    const [flag, setFlag] = useState()
    const [recipe, setRecipe] = useState()

    useEffect(() => {

        getRecipes()
            .then(x => {
                setlist(x.data)
                setlAuthors(list && list.map(y => y.userName))
            }
            )
            .catch(x => {
                if (x && x.status != 200)
                    alert("couldn't get recipes")
            })

        getCategory()
            .then(x => { setCList(x.data) })
            .catch(x => {
                if (x && x.status != 200)
                    alert("coulden't get the recipe categories")
            })

        getLevel()
            .then(x => { setLList(x.data) })
            .catch(x => {
                if (x && x.status)
                    alert("couldn't get the recipe's levels")
            })
    }, [])


    return <>
        <br></br><br></br>
        <FormControl style={{ width: 150 }}>
            <InputLabel >categories</InputLabel>
            <Select
                onChange={(e) => setByCategory(e.target.value)}>

                <MenuItem value="">
                    <em>all categories</em>
                </MenuItem>
                {listCategories && listCategories.map(x =>
                    <MenuItem value={x.id} className="{x.category}">
                        {x.name}
                    </MenuItem>)}
            </Select>
        </FormControl>
        <FormControl style={{ width: 150 }}>
            <InputLabel >levels</InputLabel>
            <Select
                onChange={(e) => setByLevel(e.target.value)}>

                <MenuItem value="">
                    <em>all level</em>
                </MenuItem>
                {listLevels && listLevels.map(x =>
                    <MenuItem value={x.id}>
                        {x.name}
                    </MenuItem>)}
            </Select>
        </FormControl>

        <FormControl style={{ width: 150 }}>
            <InputLabel style={{ width: 100 }}>Authors </InputLabel>
            <Select
                onChange={(e) => setByAuthors(e.target.value)}>
                <MenuItem value="">
                    <em>all Authors</em>
                </MenuItem>
                {listAuthors && listAuthors.map(x =>
                    <MenuItem value={x.id}>
                        {x}
                    </MenuItem>)}
            </Select>
        </FormControl>

        <div>
            {list && list.map(item => {
                {
                    if ((item.levelName == byLevel || !byLevel) && (item.categoryName == byCategory || !byCategory) && (item.userName == byAuthors || !byAuthors))
                        return (
                            // <div className={`${item.categoryName}`}>
                            //     <p>{item.name}</p>
                            //     <img src={`${item.pic}`}></img>
                            //     <p>{item.userName}</p>
                            //     <button placeholder="for more details" onClick={e => {
                            //         setFlag(true)
                            //         setRecipe(item)
                            //     }}>for more detailes</button>
                            // </div>
                            <div class="card">
                                <div class="card__body">
                                    <img src={`${item.pic}`} alt="" class="card-image"></img>
                                    <h2 class="card-title">{item.name}</h2>
                                    <p class="card-description">{item.note}</p>
                                </div>
                                <button class="card-btn" onClick={e => {
                                    setFlag(true)
                                    setRecipe(item)
                                }}>details</button>
                            </div>
                        )

                    //             <div>
                    //             <Card style={{ width: '18rem' }}>
                    //                 <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/image/project/${item.pic}.png`} />
                    //                 <Card.Body>
                    //                     <Card.Title>{item.name}</Card.Title>
                    //                     <Card.Text>
                    //                         {item.userName}
                    //                     </Card.Text>
                    //                     {/* <Details r={r}></Details> */}
                    //                     <button placeholder="for more details" onClick={e => {
                    //                         setFlag(true)
                    //                         setRecipe(item)
                    //                     }}>for more detailes</button>
                    //                 </Card.Body>
                    //             </Card>
                    //             </div>
                    //         )
                    // }
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
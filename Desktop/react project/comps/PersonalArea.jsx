 import { useEffect } from "react"
import { NavLink, Outlet } from "react-router-dom"

export const PersonalArea=()=>{
    return <>
    <h1>my personal area</h1>
    <NavLink to={'MyRecipes'}>my recipes</NavLink> 
    {/*<Outlet></Outlet> */}
    <br></br>
    <br></br>
    <br></br>
    <NavLink to={'AddRecipe'}>add a recipe</NavLink>
    <Outlet></Outlet>
</>

}
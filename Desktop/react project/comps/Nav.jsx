import { NavLink } from "react-router-dom"
import './NavBar.css'
import { Icon } from "@mui/material"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

export const Nav = () => {
    const user = useSelector(x => { return x.currentUser })
    const isAdmin = useSelector(u => { return u.isAdmin })

    return <>
        <div className="navigation">
            {user.firstName && !isAdmin && <h1>{user.firstName[0]}{user.lastName}</h1>}
            {isAdmin && <h1>admin</h1>}
            <NavLink to={'/home_page'} className='link' ><a>Home</a></NavLink >
            <NavLink to={'/Signin'} className='link'><a>Sign In</a></NavLink >
            <NavLink to={'/Login'} className='link'><a>Log In</a></NavLink >
            <NavLink to={'/all_recipes'} className='link'><a>All Recipes</a></NavLink >
            {user.firstName && <NavLink to={'/PersonalArea'} className='link'><a>Personal Area</a></NavLink>}
            {isAdmin && <NavLink to={'/AddLevel'} className='link'><a>add level</a></NavLink >}
            {isAdmin && <NavLink to={'/AddCategory'} className='link'><a>Add category</a></NavLink >}
            <p></p>
            {/* <img src="../../pics_for_react/logo2.png"></img> */}
        </div>
    </>
}

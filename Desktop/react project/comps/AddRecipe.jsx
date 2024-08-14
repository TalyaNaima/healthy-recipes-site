import { useEffect, useState, useRef } from "react"
import { postIngredients, postIngredientsToRecipe, postRecipe, getCategory, getIngredients, getLevel, getUser } from "../api"
import { useSelector } from "react-redux"
import Button from "react-bootstrap/esm/Button"

export const AddRecipe = () => {

    const [list1, setList1] = useState()
    const [list2, setList2] = useState()
    const [list3, setList3] = useState()

    const [resList, setResList] = useState([])

    useEffect(() => {
        getCategory()
            .then(x => { 
                debugger
                setList1(x.data) })
        getLevel()
            .then(x => { setList2(x.data) })
        getIngredients()
            .then(x => { setList3(x.data) })
    }, [])

    const ref = useRef()
    let currentUser = useSelector(u => { return u.currentUser });

    const send = async (event) => {
        // submit מבטל את ברירת המחדל של האירוע
        event.preventDefault()
        let recipe =
        {
            "name": event.target[0].value,
            "pic": event.target[2].value,
            "preparationTime": event.target[3].value,
            "userId": currentUser.id,
            "userName": currentUser.firstName + " " + currentUser.lastName,
            // "categoryId": event.target[5].key,
            "categoryName": event.target[5].value,
            // "levelId": event.target[6].key,
            "levelName": event.target[6].value,
            "note": event.target[1].value,
            "instructions": event.target[4].value
        }
        debugger
        postRecipe(recipe).then(
            r => {
                alert("added")
                const list = document.getElementsByClassName("amount")
                setResList([])
                for (let i = 0; i < list.length; i++) {
                    if (list[i].value != '0') {
                        const ir = {
                            // "id": 0,
                            "recipeId": r,
                            "ingredientId": list[i].id,
                            "ingredientName": document.getElementById(list[i].id).getAttribute('data-n'),
                            "amount": list[i].value
                        }
                        resList.push(ir)
                    }
                }
                postIngredientsToRecipe(resList)
            }
        )
        event.target[0].value=''
    }

    const f_click = async () => {
        let val = ref.current.value
        if (val)
            setList3(await postIngredients({ Name: val }))
        ref.current.value = ''
    }

    return <>
        <form onSubmit={(e) => send(e)}>
            <label htmlFor={'name'}>name</label>
            <br></br>
            <input id={'name'} placeholder="name" required></input>
            <br></br>
            <br></br>
            <label htmlFor={'note'}>note</label>
            <br></br>
            <textarea id={'note'} placeholder="note"></textarea>
            <br></br>
            <br></br>
            <label htmlFor={'pw'}>picture</label>
            <br></br>
            <input id={'pw'} placeholder="picture"></input>
            <br></br>
            <br></br>
            <label htmlFor={'t'}>preparation time</label>
            <br></br>
            <input id={'t'} type="number"></input>
            <br></br>
            <br></br>
            <label htmlFor={'in'}>instructions</label>
            <br></br>
            <textarea id={'in'} placeholder="instructions"></textarea>
            <br></br>
            <br></br>
            <select required>
                {list1 && list1.map((x, i) =>
                    <option key={x.id}>{x.name}</option>
                )}
            </select>
            <br></br>
            <br></br>
            <select required>
                {list2 && list2.map((x, i) =>
                    <option key={x.id}>{x.name}</option>
                )}
            </select>
            <br></br>
            <br></br>
            <label>enter the amount for the relevent ingredient</label>
            {list3 && list3.map(x =>
                <div key={x.id}>
                    <label htmlFor={x.id}>{x.name}</label>
                    <br></br>
                    <input className="amount" data-n={x.name} id={x.id} defaultValue={"0"} type="text"></input>
                </div>
            )}
            <br></br>
            <input ref={ref} placeholder="add an ingredient"></input>
            <br></br>
            <Button onClick={f_click} variant="outline-primary">add</Button>
            <br></br>
            <input type="submit" value={'send'}></input>
        </form>
    </>
}
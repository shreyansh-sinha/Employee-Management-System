import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'

const App = () => {

    const [employee, setEmployee] = useState([])
    const [fname, setfname] = useState('')
    const [lname, setlname] = useState('')
    const [email, setemail] = useState('')
    const [salary, setsalary] = useState('')
    const [date, setdate] = useState('')
    const [editing, setEditing] = useState(false)
    useEffect(() => {
        axios
        .get(`http://localhost:3001/employee`)
        .then(response => { 
            console.log(response)
            setEmployee(response.data)
        })
    }, [])

    const addData = (event) => {
        event.preventDefault()

        const newObject = {
            "id": employee.length + 1,
            "firstName": fname,
            "lastName": lname,
            "email": email,
            "salary": salary,
            "date": date

        }

        axios
        .post(`http://localhost:3001/employee`, newObject)
        .then(response => {
            console.log(response)
            setEmployee(employee.concat(response.data))
            setfname('')
            setlname('')
            setemail('')
            setsalary('')
            setdate('')
        })
    }


    const handlefName = (event) => {
        
        setfname(event.target.value)
    }
    const handlelName = (event) => {
        
        setlname(event.target.value)
    }
    const handleemail = (event) => {
        
        setemail(event.target.value)
    }
    const handlesalary = (event) => {
        
        setsalary(event.target.value)
    }
    const handledate = (event) => {
       
        setdate(event.target.value)
    }

    const [selectedEmployee, setSelectedEmployee] = useState('')

    const handleEdit = (id) => {
        
        const [tempemployee] = employee.filter((e) => e.id === id)
        setSelectedEmployee(tempemployee)
        setEditing(true)

    }

    const [tempfname, settempfname] = useState('')
    const [templname, settemplname] = useState('')
    const [tempemail, settempemail] = useState('')
    const [tempsalary, settempsalary] = useState('')
    const [tempdate, settempdate] = useState('')

    const editfName = (event) => {
        
        settempfname(event.target.value)
    }
    const editlName = (event) => {
        
        settemplname(event.target.value)
    }
    const editemail = (event) => {
        
        settempemail(event.target.value)
    }
    const editsalary = (event) => {
        
        settempsalary(event.target.value)
    }
    const editdate = (event) => {
       
        settempdate(event.target.value)
    }



    const updateData = (event) => {

        event.preventDefault()
        console.log(selectedEmployee.id)

        var id = selectedEmployee.id

        const newObject = {
            "id": id,
            "firstName": tempfname,
            "lastName": templname,
            "email": tempemail,
            "salary": tempsalary,
            "date": tempdate
        }

        console.log(newObject)
        const toUpdate = employee.find((e) => e.id === id)

        axios
        .put(`http://localhost:3001/employee/${id}`, newObject)
        .then(response => {
            setEmployee(employee.map(emp => emp.id !== id ? emp : response.data))
            setfname('')
            setlname('')
            setemail('')
            setsalary('')
            setdate('')

        })
    }

    const handleDelete = (id) => {

        axios
        .delete(`http://localhost:3001/employee/${id}`)
        .then(() => setEmployee(employee.filter((e) => e.id !== id)))
    }
    return (

            <div>

                <h1> Employee Management Software </h1>
                <form onSubmit = {addData}>
                    <input type="text" value = {fname} onChange = {handlefName} placeholder = "First Name"/>
                    <br/>
                    <input type="text" value = {lname} onChange = {handlelName} placeholder = "Last Name"/>
                    <br/>
                    <input type="text" value = {email} onChange = {handleemail} placeholder = "Email"/>
                    <br/>
                    <input type="text" value = {salary} onChange = {handlesalary} placeholder = "Salary"/>
                    <br/>
                    <input type="text" value = {date} onChange = {handledate} placeholder = "Date"/>
                    <br/>
                    <br/>
                    <button type = "submit"> Add Employee </button>
                </form>
                <br/>
                <br/>
                <table>
                    <thead>
                        <tr>

                            <th> No. </th>
                            <th> First Name </th>
                            <th> Last Name </th>
                            <th> Email </th>
                            <th> Salary </th>
                            <th> Date </th>
                            <th colSpan={2} className="text-center">
                                Actions
                            </th>                        
                        </tr>
                    </thead>

                    <tbody>
                        {employee.map((data, i) => {
                            return <tr key = {i}>
                                <td> {data.id} </td>
                                <td> {data.firstName} </td>
                                <td> {data.lastName} </td>
                                <td> {data.email} </td>
                                <td> {data.salary} </td>
                                <td> {data.date} </td>
                                <td> <button onClick = {() => handleEdit(data.id)}> Edit </button> <button onClick = {() => handleDelete(data.id)}> Delete </button> </td>
                            </tr>
                        })}
                    </tbody>
                </table>

                <br/>
                <br/>

                {
                    editing === true ? 
                    <div>
                    <form onSubmit = {updateData}>
                    <input type="text" value = {tempfname} onChange = {editfName} placeholder = "First Name"/>
                    <br/>
                    <input type="text" value = {templname}  onChange = {editlName} placeholder = "Last Name"/>
                    <br/>
                    <input type="text" value = {tempemail}  onChange = {editemail} placeholder = "Email"/>
                    <br/>
                    <input type="text" value = {tempsalary} onChange = {editsalary} placeholder = "Salary"/>
                    <br/>
                    <input type="text" value = {tempdate} onChange = {editdate} placeholder = "Date"/>
                    <br/>
                    <br/>
                    <button type = "submit"> Update </button>
                </form>
                    </div> : <div></div>
                }
            </div>
        )
}

export default App;

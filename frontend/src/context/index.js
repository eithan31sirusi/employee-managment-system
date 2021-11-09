import React, {createContext, useState, useEffect} from "react";
import { getAllEmployees, createEmployee, editEmployee, deleteEmployee } from '../services/employeeService'
import { registerUser, loginUser } from '../services/userService'


const Context = createContext()


export function Provider(props) {
   
    // all Employees list. 
    const [allEmployees, setAllEmployees] = useState([])

    // add employee States
    const [addEmployeeForm, setAddEmployeeForm] = useState({ displayed: false})

    // edit employee States
    const [editEmployeeForm, setEditEmployeeForm] = useState({ displayed: false, employee: {}})
    const [currentEmployee, setCurrentEmployee] = useState({})

    // after change State 
    const [isChange, setIsChange] = useState(false)




    // [GET] get all Employees from server.
    useEffect(() => {
        getAllEmployees()
        .then(Employees => setAllEmployees(Employees))
    },[isChange])

    const userSignUp = (user) => {
    // {firstName: 'moshe', lastName: 'koko', email: 'moshe@gmail.com', userImage: '', password: 'mosheA1234'}

        registerUser(user)
        .then( res => res )
        .then( x => {
            // render the website for all components: (conditional rendering view)
            window.location = '/'
        })
    }

    const userSignIn = (data) => {

        loginUser(data.email, data.password)
        .then( res => res )
        .then( x => {
            // render the website for all components: (conditional rendering view)
            window.location = '/'
        })         
    }

    // [GET] a single emloyee by id.
    const getEmployeebyId = (empId) => {}

    // [POST] create employee
    const addEmployee = (newEmployee) => {

        createEmployee(newEmployee)
        .then( res => res )
        .then( x => {
            setAddEmployeeForm(false)
            setIsChange( !isChange );
        })
    }

    // [PUT] update employee
    const updateEmployee = (employeeId, updateEmployee) => {

        editEmployee(employeeId, updateEmployee)
        .then( res => res )
        .then( x => {
            setEditEmployeeForm({ displayed: false, employee: {}})
            setIsChange( !isChange );
        })
    }

    // [DELETE] remove employee
    const removeEmployee = (employeeId) => {

        deleteEmployee(employeeId)
        .then( res => res )
        .then( x => {
            setIsChange( !isChange );
        })
    }
    

    return (
        <Context.Provider
            value={{
                // user:

                // employees:
                allEmployees,
                addEmployeeForm,
                setAddEmployeeForm,
                editEmployeeForm,
                currentEmployee,
                setCurrentEmployee,
                setEditEmployeeForm,
                actions: {
                    // user: 
                    userSignUp,
                    userSignIn,
                    // employees:
                    getEmployeebyId,
                    addEmployee,
                    updateEmployee,
                    removeEmployee,
                }

            }}
        >
            {props.children}
        </Context.Provider>
    ) 
}
 

export const Consumer = Context.Consumer
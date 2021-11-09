import React, {useState} from 'react'
import {Redirect } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import EmployeeItem from '../components/EmployeeItem'
import EmployeeCard from '../components/EmployeeCard'
import { getCurrentUser } from '../services/userService'
import AddEmployee from './AddEmployee'
import EditEmployee from './EditEmployee'
import { Consumer } from '../context'



const ViewEmployeesScreen = () => {


    // popup add
    const [addEmp, setAddEmp] = useState(false)
     // popup edit

    // const [propsList, setPropsList] = useState({})

    const pupupAddEmployeeHandler = e => setAddEmp(!addEmp)

    if( ! getCurrentUser() ) return <Redirect to="/sign-in"/>   

    return (
        <Consumer>
            {
                context => (
                    <div className="employee-screen">
                        {  getCurrentUser().userData.isEditor === true || getCurrentUser().userData.isAdmin === true 
                                ?  <AddEmployee 
                                        pupupAddEmployeeHandler={pupupAddEmployeeHandler}
                                        addEmployeeUnmount={context.addEmployeeForm.displayed}
                                    />
                                : ''
                    }
                        {  getCurrentUser().userData.isEditor === true || getCurrentUser().userData.isAdmin === true 
                                ? <EditEmployee emp={context.editEmployeeForm.employee} />
                                : ''
                        }
                        

                        <div className="employee-screen__header-section">
                            <PageHeader position="left">Managing Employees</PageHeader>
                            {  getCurrentUser().userData.isEditor === true || getCurrentUser().userData.isAdmin === true ?
                            <div className="button-wrapper">
                                <button className="button" onClick={ () => context.setAddEmployeeForm({ displayed: true})} type="button">+ Add Employee</button>
                            </div>
                            : ''
                            }
                            
                        </div>

                        <div className="employee-screen__employee-section">
                                <div className="table-header">
                                <div className="first-name-title">First Name</div>
                                <div className="last-name-title">Last Name</div>
                                <div className="phone-title">Phone</div>
                                <div className="adress-title">Adress</div>
                                <div className="roll-title">Roll</div>
                                <div className="start-date-title">Start Date</div>
                                </div>

                                <div className="table-body">

                                {context.allEmployees && context.allEmployees.map( emp => 
                                    <EmployeeItem
                                        key={emp._id}
                                        _id={emp._id}
                                        image={emp.image}
                                        firstName={emp.firstName}
                                        lastName={emp.lastName}
                                        phone={emp.phone}
                                        adress={emp.adress}
                                        roll={emp.roll}
                                        empStartDate={emp.createdAt}
                                    />
                                )}

                                {context.allEmployees && context.allEmployees.map( emp => 
                                    <EmployeeCard
                                        key={emp._id}
                                        _id={emp._id}
                                        image={emp.image}
                                        firstName={emp.firstName}
                                        lastName={emp.lastName}
                                        phone={emp.phone}
                                        adress={emp.adress}
                                        roll={emp.roll}
                                        empStartDate={emp.createdAt}
                                    />
                                )}

                                

                                </div>

                                <div className="table-footer"></div>
                        </div>
                    </div>
                )
            }
        </Consumer>
    )
}

export default ViewEmployeesScreen

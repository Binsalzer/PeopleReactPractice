import React from 'react';
import axios from 'axios';
import PersonRow from './PersonRow';
import PersonForm from './PersonForm'

class PeopleTable extends React.Component {

    state = {
        people: [],
        currentPerson: {},
        editMode: false,
        checked: []

    }

    loadPeople = () => {
        axios.get('/api/people/getall').then(response => {
            this.setState({ people: response.data })
        })
    }

    componentDidMount = () => {
        this.loadPeople()
    }

    onTextChange = e => {
        const copy = this.state.currentPerson;
        copy[e.target.name] = e.target.value;
        this.setState({ currentPerson: copy });
    }

    resetCurrentPerson = () => {
        this.setState({
            currentPerson: {
                firstName: '',
                lastName: '',
                age: ''
            }
        })
    }

    onAddClick = () => {
        axios.post('/api/people/add', this.state.currentPerson).then(response => {
            this.loadPeople()
            this.resetCurrentPerson()
        })
    }

    onDeleteClick = (id) => {
        axios.post('api/people/delete', { id: id }).then(response => {
            this.loadPeople()
            this.resetCurrentPerson()
            this.setState({ editMode: false })
        })
    }

    onDeleteAllChecked = () => {
        axios.post('api/people/deleteallchecked', { ids: this.state.checked }).then(response => {
            this.loadPeople()
            this.resetCurrentPerson()
            this.setState({ editMode: false })
        })
    }

    onEditClick = (id) => {
        this.setState({ editMode: true })
        axios.post('api/people/edit', { id: id }).then(response => {
            this.setState({ currentPerson: response.data })
        })
    }

    onUpdateClick = () => {
        const { currentPerson } = this.state
        const person = {
            id: currentPerson.id,
            firstName: currentPerson.firstName,
            lastName: currentPerson.lastName,
            age: currentPerson.age
        }
        axios.post('api/people/update', person).then(response => {
            this.loadPeople()
            this.setState({ editMode: false })
            this.resetCurrentPerson()
        })
    }

    onCancelClick = () => {
        this.setState({ editMode: false })
        this.resetCurrentPerson()
    }

    onCheckChange = (id) => {
        const { checked } = this.state
        if (checked.includes(id)) {
            this.setState({ checked: checked.filter(i => i !== id) })
        } else {
            this.setState({ checked: [...checked, id] })
        }
    }

    onCheckAllClick = () => {
        this.setState({ checked: this.state.people.map(p => p.id) })
    }

    onUncheckAllClick = () => {
        this.setState({ checked: [] })
    }


    render() {

        const { people, currentPerson, editMode, checked } = this.state
        const { firstName, lastName, age } = currentPerson

        return (
            <div className='container' style={{ marginTop: '60px' }}>
                <PersonForm
                    onTextChange={this.onTextChange}
                    onAddClick={this.onAddClick}
                    firstName={firstName}
                    lastName={lastName}
                    age={age}
                    isEditing={editMode}
                    onCancelClick={this.onCancelClick}
                    onUpdateClick={this.onUpdateClick}
                />
                <table className='table table-hover table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th style={{ width: '15%' }}>
                                <button className='btn btn-danger w-100' onClick={this.onDeleteAllChecked}>Delete All Checked</button>
                                <button className='btn btn-outline-danger w-100 mt-2' onClick={this.onCheckAllClick}>Check All</button>
                                <button className='btn btn-outline-success w-100 mt-2' onClick={this.onUncheckAllClick}>Uncheck All</button>
                            </th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {people.map(p => <PersonRow key={p.Id}
                            person={p}
                            onDeleteClick={() => this.onDeleteClick(p.id)}
                            onEditClick={() => { this.onEditClick(p.id) }}
                            checked={checked}
                            onCheckChange={() => this.onCheckChange(p.id)}
                        />)}
                    </tbody>
                </table>
            </div>
        )
    }

}

export default PeopleTable
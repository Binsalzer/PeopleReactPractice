import React from 'react';

class PersonForm extends React.Component {

    render() {
        const { onTextChange, onAddClick, firstName, lastName, age, isEditing, onCancelClick, onUpdateClick } = this.props

        return (
            <div className='row' style={{ marginBottom: '20px' }}>
                <div className='col-md-3'>
                    <input type='text' className='form-control' placeholder='First Name' name='firstName' onChange={onTextChange} value={firstName} />
                </div>
                <div className='col-md-3'>
                    <input type='text' className='form-control' placeholder='Last Name' name='lastName' onChange={onTextChange} value={lastName} />
                </div>
                <div className='col-md-3'>
                    <input type='text' className='form-control' placeholder='Age' name='age' onChange={onTextChange} value={age} />
                </div>

                {isEditing && <div className='col-md-3'>
                    <button className='btn btn-warning w-100' onClick={onUpdateClick}>Update</button>
                    <button className='btn btn-dark w-100 mt-2' onClick={onCancelClick}>Cancel</button>
                </div>}
                {!isEditing && <div className='col-md-3'>
                    <button className='btn btn-primary w-100' onClick={onAddClick}>Add</button>
                </div>}

            </div>
        )
    }


}

export default PersonForm;
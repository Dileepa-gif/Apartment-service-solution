import React from "react";
import "./NameForm.css"
//import TopBar from '../Shared/topbar';
//import Sidebar from '../Shared/sidebar';

class NameForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            FirstName: '',
            MiddleName: '',
            LastName: '',
            Service: '',
            Address: '',
            Tele: '',
            DoB: '',
            NIC: '',
            Date: '',
            Mobile: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }


    handleSubmit(event) {
        alert('Form was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div>
               
             <div style= {{display:"flex"}}>

               
                <div className="inline">
                <div className="bodycss">Add Service Member
                <div style={{marginLeft:"200px", width:"100vh"}}>
                <form  style={{marginTop:"20px "}} onSubmit={this.handleSubmit}>

                    <label className='lablecss'>
                        First Name
                    </label>
                    = <input type="text" name='FirstName' onChange={this.handleChange} className='inputcss' />
                    <br /><br />

                    <label className='lablecss'>
                        Middle Name
                    </label>
                    = <input type="text" name='MiddleName' onChange={this.handleChange} className='inputcss' />
                    <br /><br />

                    <label className='lablecss'>
                        Last Name
                    </label>
                    = <input type="text" name='LastName' onChange={this.handleChange} className='inputcss' />
                    <br /><br />

                    <label className='lablecss'>
                        Service Category
                    </label>
                    = <input type="text" name='Service' onChange={this.handleChange} className='inputcss' />
                    <br /><br />

                    <label className='lablecss'>
                        Address
                    </label>
                    = <input type="text" name='Address' onChange={this.handleChange} className='inputcss' />
                    <br /><br />

                    <label className='lablecss'>
                        Telephone Number
                    </label>
                    = <input type="text" name='tele' onChange={this.handleChange} className='inputcss' />
                    <br /><br />

                    <label className='lablecss'>
                        Date of Birth
                    </label>
                    = <input type="text" name='DoB' onChange={this.handleChange} className='inputcss' />
                    <br /><br />

                    <label className='lablecss'>
                        ID Number
                    </label>
                    = <input type="text" name='NIC' onChange={this.handleChange} className='inputcss' />
                    <br /><br />

                    <label className='lablecss'>
                        Date
                    </label>
                    = <input type="text" name='Date' onChange={this.handleChange} className='inputcss' />
                    <br /><br />

                    <label className='lablecss'>
                        Mobile Number
                    </label>
                    = <input type="text" name='Mobile' onChange={this.handleChange} className='inputcss' />

                    <br /><br /><br />

                    <input type="submit" value="Submit" className='submitcss' />


                </form>

                </div>
                </div>
                </div>
                </div>
            </div>
        );
    }
}

export default NameForm;
import React, {Component} from 'react'
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import {grey500} from 'material-ui/styles/colors';

class PersonForm extends Component {
    

    updateNumber(event){
        const newNumber = document.getElementsByName("count")[0].value * 10;
        document.getElementById("currenCount").innerHTML = newNumber;
    }

    render(){
        const textFieldStyle={
            display: "block",
            width: "100%"
        }

        const iconStyles = {
            marginRight: "10px",
            marginTop: "24px"
        };

        let hasPerson = typeof this.props.person !== 'undefined' && this.props.person !== null;
        return(
            <div className="wrapper">

                <form id="personForm" onSubmit={(event) => this.props.onSubmitPerson(event)}>
                    <div>
                            <input className="hidden" name="personId" value={hasPerson ? this.props.person.personId : ""} ></input>
                            <TextField
                                name="name" 
                                defaultValue={hasPerson ?  this.props.person.name : ""}
                                style={textFieldStyle}
                                floatingLabelText="Name"
                                floatingLabelFixed={false}
                                autoComplete="off"
                                autoCorrect="off" 
                                autoCapitalize="true" 
                                spellCheck="false"
                                />
                            
                            <div className="row" style={{marginTop: "20px"}}>
                                <div className="col-xs-3"><span className="fa fa-lg fa-user-plus"color={grey500} style={iconStyles}></span><span id="currenCount">{hasPerson ? this.props.person.count : 1}</span></div>
                                <div className="col-xs-9"><Slider name="count" step={0.1} defaultValue={hasPerson ? this.props.person.count/10 : 0.1} min={0.1} onChange={(event) => this.updateNumber(event)}/></div>
                            </div>
                    </div>
                </form>
                </div>
        )
    }
}

export default PersonForm
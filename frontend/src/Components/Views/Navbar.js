
import React, {Component} from 'react'
import ShareButton from './ShareButton'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/arrow-back';
import ActionHome from 'material-ui/svg-icons/action/home';
import FlatButton from 'material-ui/FlatButton';

class Navbar extends Component{
    render(){
        const iconRight = () => {
            if(this.props.formName !== ""){
                return <FlatButton
                    label="Save"
                    type="submit"
                    form={this.props.formName}
                    primary={true}
                />
            }
            if(this.props.eventId){
                return <div className="icon"><ShareButton eventName={this.props.eventName} eventId={this.props.eventId}/></div>
            }
        } 

        const iconLeft = this.props.backArrow ? 
        <IconButton>
            <NavigationClose />
        </IconButton> 
        : <IconButton><ActionHome /></IconButton>

        return (
            <AppBar
                style={{position: 'fixed'}}
                onLeftIconButtonTouchTap={() => this.props.backArrow ? this.props.goBack() : this.props.goHome()}
                title={this.props.title}
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                iconElementLeft={iconLeft}
                iconElementRight={iconRight()}
                className="appbar"
            />
            
        )
    };
}

export default Navbar;
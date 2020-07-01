import React, { Component } from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import AddIcon from 'material-ui/svg-icons/content/add'
import LocalAtm from 'material-ui/svg-icons/maps/local-atm'
import PersonAdd from 'material-ui/svg-icons/social/person-add'
import RaisedButton from 'material-ui/RaisedButton';

class SpeedDial extends Component {


    render() {
        const actions = [
            { icon: <LocalAtm />, color: this.props.disableExpense === 0 ? 'rgb(0,0,0)' : 'rgb(0, 188, 212)', disable: this.props.disableExpense, tooltip: "Add Expense", onClick: this.props.onAddExpense },
            { icon: <PersonAdd />, color: 'rgb(0, 188, 212)', disable: false, tooltip: "Add Person", onClick: this.props.onAddPerson },
        ]

        const actionButtons = actions.map((action, index) => {
            const delay = (30 * (this.props.open ? (actions.length - index) : index))
            return (
                <div className="action" key={index}>
                    <div className={"tooltip"} style={{ transitionDelay: delay + 'ms' }}>
                        {action.tooltip}
                    </div>
                    <div className="button" style={{ transitionDelay: delay + 'ms' }}>
                        <FloatingActionButton disabled={action.disable} onClick={() => action.onClick()} backgroundColor="white" iconStyle={{ fill: action.color }}>
                            {action.icon}
                        </FloatingActionButton>
                    </div>
                </div>
            )
        })

        const actionButtonsDesktop = actions.map((action, index) => {
            const style = {
                margin: 12,
            };

            return <RaisedButton key={index} disabled={action.disable} onClick={() => action.onClick()} label={action.tooltip} primary={true} style={style} />
        })

        return (
            <div>
                <div className={"hide-desktop"}>
                    <div className={(this.props.open ? "opened" : "closed")}>
                        <div className={"cover"} style={{ height: this.props.open ? window.innerHeight + 'px' : 0 }} onTouchTap={this.props.handleToggle} />
                        <div className={"speed-container"}>
                            <div className={"actions"} style={{ top: this.props.open ? `${actions.length * -76}px` : '100px' }}>
                                {actionButtons}
                            </div>
                            <FloatingActionButton onMouseUp={this.props.handleToggle} className={"main"}>
                                <AddIcon />
                            </FloatingActionButton>
                        </div>
                    </div>
                </div>
                <div className="hide-mobile actions-desktop">
                    {actionButtonsDesktop}
                </div>
            </div>
        )
    }
}


export default SpeedDial
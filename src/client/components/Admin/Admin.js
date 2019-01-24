import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Constants from './../common/utils/Constants';
import Authorization from '../../components/common/utils/Authorization';
import { getAllUsers } from './adminActions';

export class AdminComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    componentWillMount() {
        //did this for unit tests to pass
        if (this.props.getAllUsers) {
            this.props.getAllUsers();
        }
    }

    editUser(id, field, value) {
        // alert(id + " " + field + " " + value);
        let actualvalue = '';
        let actualfield = '';
        switch(field){
            case 'roledisplay':
                actualfield = 'role';
                actualvalue = Constants.ROLES.find(role => role.display == value).id;
                break;
            default:
                actualfield = field;
                actualvalue = value;
        }
        //this.props.dispatch(saveUserField(id, actualfield, actualvalue));
    }

    format(users){
        for(let k in users){
            if(users[k].roles !=undefined) {
                let rolesarr = [];
                for(let l in users[k].roles){
                    rolesarr.push(Constants.ROLES.filter((obj)=>obj.name==users[k].roles[l])[0].display);
                }
                users[k]['roledisplay'] = rolesarr.join(", ");

            }
        }
        return users;
    }
    onAfterSaveCell(row, cellName, cellValue) {
        //alert(`Save cell ${cellName} with value ${cellValue}`);

        let rowStr = '';
        for (const prop in row) {
            rowStr += prop + ': ' + row[prop] + '\n';
        }
        this.editUser(row.id, cellName, cellValue);
        //alert('Thw whole row :\n' + rowStr);
    }
    onRowSelect(row, isSelected, e) {
        let selected = new Selected();
        selected.rows = [row];
        selected.selected = isSelected;
        this.props.onRowSelect(selected);
    }
    onSelectAll(isSelected, rows) {
        let selected = new Selected();
        selected.rows = rows;
        selected.selected = isSelected;
        this.props.onRowSelect(selected);
    }
    emailFormatter(cell, row) {
        return cell;
        // return (<div>
        //     <Suggestion
        //         id={Math.random()}
        //         type="mitigation"
        //         value="abc"
        //         suggestions={[{name: "a", value: "a"},{name: "aa", value: "aa"},{name: "aaa", value: "aaa"},{name: "aaaa", value: "aaaa"},{name: "aaaaa", value: "aaaaa"}]} />
        // </div>)
    }
    render() {
        //console.log(this.props);
        let { users } = this.props;
        users = this.format(users);
        const roleTypes = [];
        for (let role of Constants.ROLES) {
            roleTypes.push(role.display);
        }
        const selectRowProp = {
            mode: 'checkbox',
            clickToSelect: true,
            unselectable: [1],
            bgColor: '#fff2fc',
            // onSelect: this.onRowSelect.bind(this),
            // onSelectAll: this.onSelectAll.bind(this)
        };
        const cellEditProp = {
            mode: 'click',
            blurToSave: true,
            afterSaveCell: this.onAfterSaveCell.bind(this)
        };
        return (
            <div>
                <div className="header-container">
                  <PageHeading title="User Management" url="/admin" />
                </div>
                <section className="paddedRow">
                    {/*cellEdit={ cellEditProp } selectRow={ selectRowProp }*/}
                    <BootstrapTable ref='userstable' data={ users } selectRow={ selectRowProp } pagination striped={ true } search={ true }>
                        <TableHeaderColumn dataField='id' isKey hidden dataSort={ true }>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='email' dataSort={ true } dataFormat={this.emailFormatter.bind(this)}>Email</TableHeaderColumn>
                        <TableHeaderColumn dataField='roledisplay' dataSort={ true } editable={ { type: 'select', options: { values: roleTypes } } }>Role</TableHeaderColumn>
                    </BootstrapTable>
                </section>
            </div>
        )
    }
}

class Selected{
    get rows() {
        return this._rows;
    }

    set rows(value) {
        this._rows = value;
    }

    get selected() {
        return this._selected;
    }

    set selected(value) {
        this._selected = value;
    }
    constructor(){
        this._rows = new Array();
        this._selected = new Boolean();
    }

}

const mapStateToProps = (state) => {
    return {
        users: state.adminReducer.users
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllUsers: () => dispatch(getAllUsers())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Authorization(AdminComponent, ['ADMINISTRATOR']));

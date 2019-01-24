import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Constants from './../common/utils/Constants';
import Authorization from '../../components/common/utils/Authorization';
import {connect} from 'react-redux';

class CustomerManagement extends React.Component {

    renderShowsTotal(start, to, total) {
        return (
            <p style={ { color: 'blue' } }>
                From { start } to { to }, totals is { total }&nbsp;&nbsp;(its a customize text)
            </p>
        );
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

    format(users) {
        for(let k in users){
            if(users[k].role !=undefined) {
                users[k]['roledisplay'] = users[k].role.display;
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
        let users = this.format([{"lastUpdated":"Apr 25, 2017 9:35:45 PM","password":"","role":{"lastUpdated":"Apr 25, 2017 9:35:44 PM","display":"Administrator","name":"ADMINISTRATOR","id":1},"name":"Ali Jalbani","id":1,"email":"ajalbani@wootcloud.com"},{"lastUpdated":"May 2, 2017 9:04:56 PM","role":{"lastUpdated":"Apr 25, 2017 9:35:44 PM","display":"Administrator","name":"ADMINISTRATOR","id":1},"name":"Srinivas Akella","id":2,"email":"sakella@wootcloud.com"},{"role":{"lastUpdated":"Apr 25, 2017 9:35:44 PM","display":"Administrator","name":"ADMINISTRATOR","id":1},"name":"Siva Mandalam","id":23,"email":"smandalam@wootcloud.com"}]);
        let roleTypes = [];
        for(let role of Constants.ROLES){
            roleTypes.push(role.display)
        }
        const selectRowProp = {
            mode: 'checkbox',
            clickToSelect: true,
            unselectable: [ 1 ],
            bgColor: '#fff2fc',
            // onSelect: this.onRowSelect.bind(this),
            // onSelectAll: this.onSelectAll.bind(this)
        };
        const cellEditProp = {
            mode: 'click',
            blurToSave: true,
            afterSaveCell: this.onAfterSaveCell.bind(this)
        };
        return(
            <div>
                <div className="header-container">
                  <PageHeading title="Customer Management" url="/customers" />
                </div>
                <div className="page-content">
                </div>
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

function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Authorization(CustomerManagement, ['ADMINISTRATOR']));

import React from 'react';
import { FirestoreCollection } from 'react-firestore';

// Virtual Scrolling
import { FixedSizeList } from 'react-window';

import ShareListButton from './ShareListButton';
import Button from '@material-ui/core/Button';
import DeleteButton from './DeleteButton';

// MUI
import { ListItem, ListItemText, List, IconButton } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { red } from '@mui/material/colors';

import TextField from '@mui/material/TextField';



class OwnedList extends React.Component {
    constructor() {
        super()
        this.state = {
            todo: [],
            owner_id: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            todo: e.target.value
        })
    }

    handleSubmit(e) {
        if (this.state.todo != '') {
            this.props.db.collection("lists").doc(this.props.list_id).collection("todo").add({
                text: this.state.todo,
                date: Date.now()
            })

            this.setState({
                todo: ''
            })
        }
        e.preventDefault();
    }

    calculateDate(createTime) {
        var created_date = new Date(createTime)
        var current_date = new Date()
        var mil = current_date - created_date

        var seconds = (mil / 1000) | 0;
        mil -= seconds * 1000;

        var minutes = (seconds / 60) | 0;
        seconds -= minutes * 60;

        var hours = (minutes / 60) | 0;
        minutes -= hours * 60;

        var days = (hours / 24) | 0;
        hours -= days * 24;

        var weeks = (days / 7) | 0;
        days -= weeks * 7;

        return [weeks, days, hours]
    }

    dateString(createTime) {
        var times = this.calculateDate(createTime)

        return `${times[0] > 0 ? `${times[0]} Weeks, ` : ''} 
                ${times[1] > 0 ? `${times[1]} Days and ` : ''} 
                ${[times[2]] > 0 ? `${times[2]} Hours` : ''}`
    }

    dateColour(createTime) {
        var times = this.calculateDate(createTime)

        if (times[0] >= 1) {
            return "#FF0000"
        }
    }

    displayList() {
        return (<FirestoreCollection
            path={"lists/" + this.props.list_id + "/todo"}
            sort={"text:asc"}
            render={({ isLoading, data }) => {
                if (isLoading) {
                    return (<div class="card list mx-auto">
                        <h2>Loading List...</h2>
                    </div>);
                } else {
                    return <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                            <Typography >
                                {this.props.list_name}
                            </Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            <List dense={true}>
                                {data.map(todo => {
                                    return <ListItem>
                                        <ListItemText primary={todo.text} secondary={
                                            <Typography variant='caption' style={{ color: this.dateColour(todo.date) }}>{this.dateString(todo.date)}</Typography>} />

                                        <IconButton onClick={(e) => {
                                            this.props.db.collection("lists").doc(this.props.list_id).collection("todo").doc(todo.id).delete()
                                        }}>
                                            <DeleteIcon fontSize="small" sx={{ color: red[500] }} />
                                        </IconButton>
                                    </ListItem>
                                })}
                            </List>


                        </AccordionDetails>

                        <AccordionActions>
                            <TextField placeholder="To Do" label={"Whats there To Do?"} value={this.state.todo} onChange={(this.handleChange)} />
                            <IconButton onClick={(this.handleSubmit)}>
                                <AddCircleIcon color="success" />
                            </IconButton>
                            <ShareListButton list_id={this.props.list_id} />
                            <DeleteButton db={this.props.db} list_id={this.props.list_id} />
                        </AccordionActions>
                    </Accordion>
                }
            }}
        />)
    }

    render() {
        return (<div>
            {this.displayList()}
        </div>)
    }
}

export default OwnedList
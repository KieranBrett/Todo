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
        this.props.db.collection("lists").doc(this.props.list_id).collection("todo").add({
            text: this.state.todo
        })

        this.setState({
            todo: ''
        })

        e.preventDefault();
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
                            {/* <Typography sx={{ color: 'text.secondary' }}>Accordion Description</Typography> */}
                        </AccordionSummary>

                        <AccordionDetails>
                            <List dense={true}>
                                {data.map(todo => {
                                    return <ListItem>
                                        <ListItemText>
                                            {todo.text}
                                        </ListItemText>

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
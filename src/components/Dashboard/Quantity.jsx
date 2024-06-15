import React from 'react'
import { Grid, ListItem, Paper } from '@mui/material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PetsIcon from '@mui/icons-material/Pets';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import Inventory2Icon from '@mui/icons-material/Inventory2';

export default function Quantity() {

    return (
        <React.Fragment>
            <Grid container spacing={6}>
                <Grid item xs={12} md={4} lg={4}>
                    <Paper style={{
                        display: 'flex',
                        flexWrap: 'nowrap',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div>
                            <ListItem
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 'bolder',
                                    color: 'blue',
                                }}>Packages</ListItem>
                            <ListItem style={{
                                fontSize: '25px',
                                fontWeight: 'bolder'
                            }}>200</ListItem>
                        </div>
                        <div style={{ paddingRight: '20px' }}><Inventory2Icon sx={{ fontSize: '40px' }} /></div>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    <Paper style={{
                        display: 'flex',
                        flexWrap: 'nowrap',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div>
                            <ListItem
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 'bolder',
                                    color: 'blue',
                                }}>Boxes</ListItem>
                            <ListItem style={{
                                fontSize: '25px',
                                fontWeight: 'bolder'
                            }}>200</ListItem>
                        </div>
                        <div style={{ paddingRight: '20px' }}><Inventory2Icon sx={{ fontSize: '40px' }} /></div>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    <Paper style={{
                        display: 'flex',
                        flexWrap: 'nowrap',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div>
                            <ListItem
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 'bolder',
                                    color: 'blue',
                                }}>Product</ListItem>
                            <ListItem style={{
                                fontSize: '25px',
                                fontWeight: 'bolder'
                            }}>200</ListItem>
                        </div>
                        <div style={{ paddingRight: '20px' }}><Inventory2Icon sx={{ fontSize: '40px' }} /></div>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

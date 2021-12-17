import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';

export default function MapUsers({collection}) {

    return (
        <div className={'map-users'}>
            <List
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                }}
            >
                {
                    collection &&
                    collection.map(x => {
                        return (
                            <div>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <LocationOnIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={x.user ? x.user : "Anonymous"} secondary=""/>
                                </ListItem>
                                <Divider variant="inset" component="li"/>
                            </div>
                        )
                    })
                }
            </List>
        </div>
    );
}
import React from 'react';
import { Typography, Avatar, IconButton, makeStyles, useMediaQuery } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { useMutation } from '@apollo/react-hooks';
import { ADD_OR_REMOVE_FROM_QUEUE } from '../graphql/mutation';

function QueuedSongList({ queue }) {
    const greaterThanMd = useMediaQuery(theme => theme.breakpoints.up('md'))

    return greaterThanMd && (
        <div style={{ margin: "10px 0" }}>
            <Typography color="textSecondary" variant='button'>
                QUEUE ({queue.length})
            </Typography>
            {queue.map((song, i) => (
                <QueuedSong key={i} song={song} />
            ))}
        </div>
    );
}


const useStyles = makeStyles(theme => ({
    avatar: {
        width: 44,
        height: 44
    },
    text: {
        textOverflow: 'ellipsis',
        overflow: 'hgidden'
    },
    container: {
        display: 'grid',
        gridAutoFlow: 'column',
        gridTemplateColumns: '50px auto 50px',
        gridGap: 12,
        alignItems: 'center',
        marginTop: 10
    },
    songInfoContainer: {
        overflow: 'hidden',
        whiteSpace: 'nowrap'
    }
}))

function QueuedSong({ song }) {

    const classes = useStyles();
    const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
        onCompleted: data => {
            localStorage.setItem('queue', JSON.stringify(data.addOrRemoveFromQueue))
        }
    });
    const { title, artist, thumbnail } = song;

    function handleAddOrRemoveFromQueue() {
        addOrRemoveFromQueue({
            variables: {
                input: { ...song, __typename: 'Song' }
            }
        })
    }

    return (
        <div className={classes.container}>
            <Avatar src={thumbnail} alt='Song humbnail' className={classes.avatar} />
            <div className={classes.songInfoContainer}>
                <Typography variant='subtitle2' className={classes.text}>
                    {title}
                </Typography>
                <Typography color='textSecondary' variant='body2' className={classes.text}>
                    {artist}
                </Typography>
            </div>
            <IconButton onClick={handleAddOrRemoveFromQueue}>
                <Delete color="error" />
            </IconButton>
        </div>
    )
}

export default QueuedSongList;

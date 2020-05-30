import React from 'react';
import { TextField, InputAdornment, Button, Dialog, DialogTitle, DialogContent, DialogActions, makeStyles } from '@material-ui/core';
import { Link, AddBoxOutlined } from '@material-ui/icons';
import ReactPlayer from 'react-player'
import { ADD_SONG } from '../graphql/mutation';
import { useMutation } from '@apollo/react-hooks';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        alignItems: 'center'
    },
    urlInput: {
        margin: theme.spacing(1)
    },
    addSongButton: {
        margin: theme.spacing(1)
    },
    dialog: {
        textAlign: 'center',
        width: '100%',
        scroll: 'paper'
    },
    thumbnail: {
        width: '90%'
    }
}))

const DEFAULT_SONG = {
    duration: 0,
    title: '',
    artist: '',
    thumbnail: ''
}

function AddSong() {
    const classes = useStyles();
    const [addSong, {error}] = useMutation(ADD_SONG)
    const [url, setUrl] = React.useState('')
    const [playable, setPlayable] = React.useState(false)
    const [dialog, setDialog] = React.useState(false)
    const [song, setSong] = React.useState(DEFAULT_SONG);

    React.useEffect(() => {
        const isPlayable = ReactPlayer.canPlay(url)
        setPlayable(isPlayable)
    }, [url])


    function handleClose() {
        setDialog(false)
    }

    async function handleEditSong({ player }) {

        let songData;

        const nestedPlayer = player.player.player;
        if (nestedPlayer.getVideoData) {
            songData = await getYoutubeInfo(nestedPlayer);
        } else if (nestedPlayer.getCurrentSound) {
            songData = await getSoundCloudInfo(nestedPlayer)
        }

        setSong({...songData, url})
    }

    function getYoutubeInfo(player) {

        const duration = player.getDuration();
        const { title, video_id, author } = player.getVideoData();
        const thumbnail = `https://img.youtube.com/vi/${video_id}/0.jpg`

        return {
            duration,
            title,
            artist: author,
            thumbnail
        }
    }

    function getSoundCloudInfo(player) {
        return new Promise(resolve => {
            player.getCurrentSound(songData => {
                if (songData) {
                    resolve({
                        duration: Number(songData.duration / 1000),
                        title: songData.title,
                        artist: songData.username,
                        thumbnail: songData.artwork_url.replace('-large', '-t500x500')
                    })
                }
            })
        })
    }

    const { thumbnail, title, artist } = song;

    function handleChangeSong(e) {
        const { name, value } = e.target;

        setSong(prevSong => ({
            ...prevSong,
            [name]: value
        }))
    }

    async function handleAddSong(e) {
        e.preventDefault();

        try {
            const { title, artist, url, thumbnail, duration } = song;
            await addSong({
                variables: {
                    url: url.length > 0 ? url : null,
                    thumbnail: thumbnail.length > 0 ? thumbnail : null,
                    duration: duration > 0 ? duration : null,
                    title: title.length > 0 ? title : null,
                    artist: artist.length > 0 ? artist : null
                }
            })
            handleClose();
            setSong(DEFAULT_SONG)
            setUrl('')
        } catch (error) {
            console.error("Error adding song", song)
        }


    }

    function handleError(field) {
        return error?.graphQLErrors[0]?.extensions.path?.includes(field)
    }

    return (
        <div className={classes.container}>
            <Dialog
                open={dialog}
                onClose={handleClose}
                className={classes.dialog}
                PaperProps={{
                    style: {
                        padding: 20,
                        width: "100%"
                    },
                }}
            // style={{ paddingTop: 80 }}
            >
                <DialogTitle>
                    Edit Song
                </DialogTitle>
                <DialogContent>
                    <img
                        src={thumbnail}
                        alt="Song tumbnail"
                        thumbnail={classes.thumbnail}
                    />
                </DialogContent>
                <TextField
                    value={title}
                    onChange={handleChangeSong}
                    margin="dense"
                    name='title'
                    label="Title"
                    fullWidth
                    error={handleError('title')}
                    helperText={handleError('title') && 'Fill out field'}
                />
                <TextField
                    onChange={handleChangeSong}
                    value={artist}
                    margin="dense"
                    name='artist'
                    label="Artist"
                    fullWidth
                    error={handleError('artist')}
                    helperText={handleError('artist') && 'Fill out field'}
                />
                {/* <TextField
                    onChange={handleChangeSong}
                    value={thumbnail}
                    margin="dense"
                    name='thumbnail'
                    label="Thumbnail"
                    fullWidth
                    error={handleError('thumbnail')}
                    helperText={handleError('thumbnail') && 'Fill out field'}
                /> */}
                
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button variant="outlined" onClick={handleAddSong} color="primary">
                        Add Song
                    </Button>
                </DialogActions>
            </Dialog>
            <TextField
                className={classes.urlInput}
                onChange={e => setUrl(e.target.value)}
                value={url}
                placeholder="Add YouTube or SoundCloud Url"
                fullWidth
                type='url'
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Link />
                        </InputAdornment>
                    )
                }}
            />
            <Button
                disabled={!playable}
                className={classes.addSongButton}
                variant='contained'
                color="primary"
                endIcon={<AddBoxOutlined />}
                onClick={() => setDialog(true)}
            >
                Add
            </Button>
            <ReactPlayer url={url} hidden onReady={handleEditSong} />
        </div>
    );
}

export default AddSong;

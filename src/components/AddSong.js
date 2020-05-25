import React from 'react';
import { TextField, InputAdornment, Button, Dialog, DialogTitle, DialogContent, DialogActions, makeStyles } from '@material-ui/core';
import { Link, AddBoxOutlined } from '@material-ui/icons';


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

function AddSong() {
    const classes = useStyles();

    const [dialog, setDialog] = React.useState(false)


    function handleClose() {
        setDialog(false)
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
                        src="https://ww1.prweb.com/prfiles/2014/04/10/11752526/gI_134971_best-image-web-hosting.png"
                        alt="Song tumbnail"
                        thumbnail={classes.thumbnail}
                    />
                </DialogContent>
                <TextField
                    margin="dense"
                    name='title'
                    label="Title"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name='artist'
                    label="Artist"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name='thumbnail'
                    label="Thumbnail"
                    fullWidth
                />
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button variant="outlined" onClick={handleClose} color="primary">
                        Add Song
                    </Button>
                </DialogActions>
            </Dialog>
            <TextField
                className={classes.urlInput}
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
                className={classes.addSongButton}
                variant='contained'
                color="primary"
                endIcon={<AddBoxOutlined />}
                onClick={() => setDialog(true)}
            >
                Add
            </Button>
        </div>
    );
}

export default AddSong;

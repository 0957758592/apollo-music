import React from 'react';
import Header from './components/Header'
import AddSong from './components/AddSong'
import SongList from './components/SongList'
import SongPlayer from './components/SongPlayer'
import { Grid, useMediaQuery, Hidden } from "@material-ui/core"
import songReducer from './store/reducer'

export const SongContext = React.createContext({
  song: {
    id: 'cdefc2ca-fd9c-415f-b84c-7742a34f8785',
    title: 'Unforgivable(First State Remix Edit)',
    artist: "Armin",
    thumbnail: 'https://img.youtube.com/vi/FPPchfgTCZ0/0.jpg',
    url: 'https://www.youtube.com/watch?v=FPPchfgTCZ0&list=LL3xmAZGZZ04QU9qc7fQqvvg&index=7&t=0s',
    duration: 400
  },
  isPlaying: false
})

function App() {
  const initialSongState = React.useContext(SongContext)
  const [state, dispatch] = React.useReducer(songReducer, initialSongState)
  const greaterThanSM = useMediaQuery(theme => theme.breakpoints.up('sm'))
  const greaterThanMd = useMediaQuery(theme => theme.breakpoints.up('md'))

  return (
    <SongContext.Provider value={{state, dispatch}} >
      <Hidden only='xs'>
        <Header />
      </Hidden>

      <Grid style={{ width: '100%' }} container spacing={3} >
        <Grid style={{ paddingTop: greaterThanSM ? 80 : 10 }} item xs={12} md={7}>
          <AddSong />
          <SongList />
        </Grid>

        <Grid style={greaterThanMd ? {
          position: 'fixed',
          width: '100%',
          right: 0,
          top: 70
        } : {
            position: 'fixed',
            width: '100%',
            left: 0,
            bottom: 0
          }} item xs={12} md={5}>
          <SongPlayer />
        </Grid>
      </Grid>

    </SongContext.Provider>
  );
}

export default App;

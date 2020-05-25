import React from 'react';
import Header from './components/Header'
import AddSong from './components/AddSong'
import SongList from './components/SongList'
import SongPlayer from './components/SongPlayer'
import QueuedSongList from './components/QueuedSongList'

function App() {
  return (
    <div >
      <Header/>
      <AddSong/>
      <SongList/>
      <SongPlayer />
      <QueuedSongList/>
    </div>
  );
}

export default App;

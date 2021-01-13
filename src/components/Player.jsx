import React from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.less'

export default function Player({ id }) {
    return (
        <div>
            
                <AudioPlayer
                    header={<center><h3>Now Playing!!..</h3>   </center>}
                    customAdditionalControls={[]}
                    src={`https://docs.google.com/uc?export=download&id=${id}`}
                    onPlay={e => console.log("onPlay")}
                />
                {id}
         
        </div>
    )
}

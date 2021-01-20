import React, { useEffect, useState } from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.less'
import db from '../firebase';

export default function Player({ id }) {
    const [playing, setplaying] = useState({ title: "loading..." })
    useEffect(() => {
        db.collection("audio")
            .doc(id)
            .onSnapshot((async (snap) => {
                let data = snap.data();
                setplaying(data)
            }));
    })

    return (
        <div>

            <AudioPlayer

                header={<center><h3>Now Playing:- {playing.title}.</h3>   </center>}
                customAdditionalControls={[]}
                src={`https://docs.google.com/uc?export=download&id=${id}`}
                onPlay={e => console.log("onPlay")}
            />
            <br/>
            <center>
            <h2>{playing.title}</h2>
                </center>
            <p>
                {
                    playing.description && playing.description.split('I').map(function (item, idx) {
                        return (
                            <span key={idx}>
                                {item}
                                <br />
                            </span>
                        )
                    })
                }
                {/* {playing.date.toDate().toDateString() } */}
            </p>
        </div>
    )
}



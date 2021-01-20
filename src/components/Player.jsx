import React, { useEffect, useState } from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.less'
import db from '../firebase';
import firebase from "firebase";
import { userStore } from './Store';


export default function Player({ id }) {
    const autUser = userStore.useState((s) => s.user);

    const [playing, setplaying] = useState({ title: "loading..." })
    useEffect(() => {
        db.collection("audio")
            .doc(id)
            .onSnapshot((async (snap) => {
                let data = snap.data();
                setplaying(data)
            }));
        console.log(autUser.uid, autUser.displayName)
        db.collection("audio")
            .doc(id)
            .collection("viewers")
            .doc(autUser.uid)
            .get()
            .then(doc => {
                console.log(doc.exists, doc.ref)
                if (!doc.exists) {
                    doc.ref.set({ id: autUser.uid, name: autUser.displayName, time: firebase.firestore.Timestamp.now() })
                    db.collection("audio")
                        .doc(id)
                        .update({ views: firebase.firestore.FieldValue.increment(1) })
                }
            })
    }, [])

    return (
        <div>

            <AudioPlayer

                header={<center><h3>Now Playing:- {playing.title}.</h3>   </center>}
                customAdditionalControls={[]}
                src={`https://docs.google.com/uc?export=download&id=${id}`}
                onPlay={e => console.log("onPlay")}
            />
            <br />
            <center>
                <h2>{playing.title}</h2>
            </center>
            <p>
                {playing.views && playing.views+10} watched
                <br />
                <br />
                <h4>
                    Description:-
                </h4>
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



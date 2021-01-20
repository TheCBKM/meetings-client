import React, { useEffect, useState } from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.less'
import db from '../firebase';
import firebase from "firebase";
import { userStore } from './Store';
import HeartOutlined, { EyeTwoTone, HeartFilled, HeartTwoTone } from '@ant-design/icons'
import LoadingOverlay from 'react-loading-overlay'
import { Button, message } from 'antd';
import { navigate } from '@reach/router'


export default function Player({ id }) {
    const autUser = userStore.useState((s) => s.user);
    const [liked, setliked] = useState(false)
    const [playing, setplaying] = useState({ title: "loading..." })
    const [loading, setloading] = useState(true)
    useEffect(() => {
        db.collection("audio")
            .doc(id)
            .onSnapshot((async (snap) => {
                if (!snap.exists) {
                    navigate("/")
                    return
                }
                let data = snap.data();
                setplaying(data)
            }));


        console.log(autUser.uid, autUser.displayName)


        db.collection("audio")
            .doc(id)
            .collection("likes")
            .doc(autUser.uid)
            .get()
            .then(doc => {
                if (doc.exists) {
                    setliked(true)
                }
            })


        db.collection("audio")
            .doc(id)
            .collection("viewers")
            .doc(autUser.uid)
            .get()
            .then(doc => {
                console.log(doc.exists, doc.ref)
                if (!doc.exists) {
                    doc.ref.set({ id: autUser.uid, name: autUser.displayName || "", time: firebase.firestore.Timestamp.now() })
                    db.collection("audio")
                        .doc(id)
                        .update({ views: firebase.firestore.FieldValue.increment(1) })
                }
            })
    }, [])
    const likeIt = () => {
        if (!liked) {
            message.success("Thank you for a LIKE")

            db.collection("audio")
                .doc(id)
                .update({ liked: firebase.firestore.FieldValue.increment(1) })

            db.collection("audio")
                .doc(id)
                .collection("likes")
                .doc(autUser.uid)
                .set({ id: autUser.uid, name: autUser.displayName || "", time: firebase.firestore.Timestamp.now() })
            setliked(true)

        }

    }
    return (
        <div style={{ height: "50vh" }}>
            <LoadingOverlay
                active={loading}
                spinner
                text={"Loading your audio...."}

            >

                <AudioPlayer

                    header={<center><h3>Now Playing:- {playing.title}.</h3>   </center>}
                    customAdditionalControls={[]}
                    src={`https://docs.google.com/uc?export=download&id=${id}`}
                    onCanPlay={e => { console.log("onCanPlay"); setloading(false) }}

                />
            </LoadingOverlay>

            <br />
            <center>
                <h2>{playing.title}</h2>
            </center>
            <p>
                {playing.views && playing.views + 10} watched <EyeTwoTone />&nbsp;  | &nbsp;
                {playing.liked + 10 || 0} liked &nbsp;
                    <HeartTwoTone id="like-button" onClick={likeIt} twoToneColor={liked ? "#eb2f96" : ""} style={{
                    fontSize: "20px",
                }} />
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



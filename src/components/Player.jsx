import React, { useEffect, useState } from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.less'
import db from '../firebase';
import firebase from "firebase";
import { userStore } from './Store';
import HeartOutlined, { ClockCircleOutlined, EyeTwoTone, HeartFilled, HeartTwoTone, SmileOutlined } from '@ant-design/icons'
import LoadingOverlay from 'react-loading-overlay'
import { Button, message,notification,Timeline } from 'antd';
import { navigate } from '@reach/router'

import { EmailIcon, EmailShareButton, FacebookMessengerIcon, FacebookMessengerShareButton, FacebookShareButton, TelegramIcon, TelegramShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";
import ReactMarkdown from 'react-markdown'


export default function Player({ id }) {
    const autUser = userStore.useState((s) => s.user);
    const playerRef = React.useRef(null)

    const [liked, setliked] = useState(false)
    const [playing, setplaying] = useState({ title: "loading..." })
    const [loading, setloading] = useState(true)
    const [timeStamps, settimeStamps] = useState([])

    const title = `*${playing.title}*
Recording of *${playing.date && playing.date.toDate().toString().substring(0, 15)}* 😄🙏🏼
I loved hearing this audio. Thought sharing with you

`

    useEffect(() => {
        db.collection("audio")
            .doc(id)
            .onSnapshot(async snap => {
                if (!snap.exists) {
                    // await db.collection("audio")
                    //     .doc(id)
                    //     .delete()
                    navigate("/")
                }
                else {
                    let data = snap.data();
                    setplaying(data)
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

    const downloader = {
        "rjoshi14899@gmail.com": true,
        "dharwadkarnj@gmail.com": true,
        "+919340573858":true,
        "+919561721324":true
    }
    return (
        <div style={{ height: "50vh" }}>
            <LoadingOverlay
                active={loading}
                spinner
                text={"Loading your audio...."}

            >

                <AudioPlayer
                    ref={playerRef}
                    header={<center><h3>Now Playing:- {playing.title}.</h3>   </center>}
                    customAdditionalControls={[]}
                    src={`https://docs.google.com/uc?export=download&id=${playing.id}`}
                    onCanPlay={e => { console.log("onCanPlay"); setloading(false) }}

                />
            </LoadingOverlay>

            <br />
            <center>
                <h2>{playing.title}</h2>
            </center>

            <p>
                {playing.views && playing.views} watched <EyeTwoTone />&nbsp;  | &nbsp;
                {playing.liked || 0} liked &nbsp;
                    <HeartTwoTone id="like-button" onClick={likeIt} twoToneColor={liked ? "#eb2f96" : ""} style={{
                    fontSize: "20px",
                }} />
                <br />    &nbsp;&nbsp;
                <h4>
                    Quick Access:-
                </h4>
                <Timeline >

                {playing.ts && playing.ts.map(ts => <Timeline.Item dot={<ClockCircleOutlined />}>
                        {ts.title}&nbsp;&nbsp;{
                            ts.time.split(':').map((t,i)=><span style={{color:"blue"}}>{Number(t)>0?`${t}${i==2?"":":"}`:""}</span>) 
                            }&nbsp;&nbsp;
                        <Button onClick={() => {
                            var hms = ts.time;
                            var a = hms.split(':');
                            var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
                            playerRef.current.audio.current.currentTime = seconds
                        }}>Play</Button>
                    </Timeline.Item>)}
                    </Timeline>

                <WhatsappShareButton
                    url={window.location.href}
                    title={title}
                    separator=" ">
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                &nbsp;&nbsp;&nbsp;
                <TelegramShareButton
                    url={window.location.href}
                    title={title}
                >
                    <TelegramIcon size={32} round />
                </TelegramShareButton>
                &nbsp;
                <EmailShareButton
                    url={window.location.href}
                    subject={"FROM CBKM"}
                    body={title}
                >
                    <EmailIcon size={32} round />
                </EmailShareButton>
                &nbsp;


                <br />
                {
                    playing.date && playing.date.toDate().toString().substring(0, 15)
                }
                <br />
                <br />
                <hr />
                <h4>
                    Description:-
                </h4>
                <ReactMarkdown>
                    {

                        playing.description && playing.description.replaceAll('\\n', '\n')

                    }
                </ReactMarkdown>
                
                <hr />
                <br />
                {
                    autUser && (autUser.email &&downloader[autUser.email] == true) ||(autUser.phoneNumber&& downloader[autUser.phoneNumber])==true ?
                    <div>
                    <Button href={`https://docs.google.com/uc?export=download&id=${playing.id}`} target="_blank">Download</Button>  <br/>
                    {`https://drive.google.com/file/d/${playing.id}/view?usp=sharing`}
                    <br/>
                    <WhatsappShareButton
                    url={`https://drive.google.com/file/d/${playing.id}/view?usp=sharing`}
                    title={"Direct Link "}
                    separator=" ">
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                    </div>
                 : ""

                }

            </p>

        </div>
    )
}



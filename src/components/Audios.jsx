import { Link } from '@reach/router'
import { Button, Card } from 'antd'
import React, { useState, useEffect } from 'react'
import db from '../firebase';

export default function audio() {
    const [audio, setaudio] = useState([]);
    const [lastdoc, setlastdoc] = useState({})
    useEffect(() => {
        db.collection("audio")
            .orderBy("date", "desc")
            .limit(1)
            .get()
            .then(async (snap) => {
                let documents = await snap.docs.map((post) => {
                    let data = post.data();
                    console.log(data)
                    return {
                        ...data,
                    };
                });
                console.log("documents", documents)
                setaudio(documents);
                setlastdoc( snap.docs[snap.docs.length-1])
            })

    }, []);

    const lookMore = () => {
        db.collection("audio")
            .orderBy("date", "desc")
            .startAt(lastdoc)
            .limit(1)
            .get()
            .then(async (snap) => {
                let documents = await snap.docs.map((post) => {
                    let data = post.data();
                    return {
                        ...data,
                    };
                });
                console.log("documents", documents)
                setaudio([...audio, ...documents]);
                setlastdoc(documents[0])
                console.log(lastdoc)
            })
    }

    return (
        <div>
            {
                audio.map(a => <div style={{ marginTop: 20 }}>
                    <Card title={a.title}>
                        <p>
                            {a.description}
                        </p>
                        <Link to={`/audio/${a.id}`}>
                            <Button>PLAY</Button>
                        </Link>
                    </Card>
                </div>)
            }
            <Button onClick={lookMore}>More</Button>
        </div>
    )
}

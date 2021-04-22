import { Link } from '@reach/router'
import { BackTop } from 'antd'
import Search from 'antd/lib/input/Search';
import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown';
import db from '../firebase';

import { Card, CardActions, Button, CardActionArea, Typography, makeStyles, CardContent, Grid, } from "@material-ui/core";
const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});


const GriduseStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },
}));
export default function Audios() {
    const classes = useStyles();
    const gridclasses = GriduseStyles();

    const [audio, setaudio] = useState([]);
    const [result, setresult] = useState([])
    const [query, setquery] = useState('')
    useEffect(() => {
        db.collection("audio")
            .orderBy("date", "desc")
            .get()
            .then(async (snap) => {
                let documents = await snap.docs.map((post) => {
                    let data = post.data();
                    console.log(post)
                    console.log(data)
                    return {
                        aid: post.id,
                        ...data,
                    };
                });
                console.log("documents", documents)
                setaudio(documents);
            })

    }, []);

    useEffect(() => {
        deepSearch('')
    }, [audio])



    function deepSearch(query) {
        console.log("audio", audio, query)
        query = query.trim().toLowerCase()
        console.log()
        if (query === "") {
            setresult(audio)
            return
        }
        let res = new Set([])
        query.split(' ').map(q => {
            search(q, res)
        })

        setresult([...res])
    }
    function search(str, res) {
        audio.map((i) => {
            i.description.split(' ').map(s => {
                if (s.toLowerCase().includes(str)) {
                    res.add(i)
                }
            })
            i.title.split(' ').map(s => {
                if (s.toLowerCase().includes(str)) {
                    res.add(i)
                }
            })
            i.date.toDate().toString().split(' ').map(s => {
                if (s.toLowerCase().includes(str)) {
                    res.add(i)
                }
            })

        })
    }
    return (
        <div>
            <BackTop />

            <Search placeholder="search any thing ( just type महाराज...)  " enterButton="Search" size="large" onChange={(e) => { deepSearch(e.target.value) }} />
            You can search for title description or even date. Can type in Hindi/Marathi.
            {

                <>

                    <div className={gridclasses.root}>
                        <Grid container justify="center" spacing={10}>
                            {
                                result.map(a =>
                                    <Grid key={a.id} item>

                                        <Card className={classes.root}>
                                            <CardActionArea>
                                                <CardContent>
                                                    <Typography gutterBottom variant="h7" component="h2">
                                                        {a.date && a.date.toDate().toString().substring(0, 15)}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        <ReactMarkdown>{`${a.description.replaceAll('\\n', '\n').substr(0, 60)}....[read more](/audio/${a.aid})`}</ReactMarkdown>

                                                    </Typography>
                                                    <CardActions>
                                                        <Link to={`/audio/${a.aid}`}>
                                                            <Button size="small" color="secondary">PLAY</Button>
                                                        </Link>

                                                    </CardActions>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>

                                )}
                        </Grid>
                    </div>

                </>}
        </div>
    )
}

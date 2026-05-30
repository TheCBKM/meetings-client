import { Link } from "@reach/router";
import { BackTop } from "antd";
import Search from "antd/lib/input/Search";
import { SoundFilled } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import db from "../firebase";

import {
  Card,
  CardActions,
  Button,
  CardActionArea,
  Typography,
  CardContent,
  Grid,
} from "@material-ui/core";
import PageHeader from "./PageHeader";
import SkeletonGrid from "./SkeletonGrid";
import { useLayoutStyles } from "./layoutStyles";

const SEARCH_EXAMPLES = ["meeting", "2024", "upasna", "discourse"];

export default function Audios() {
  const classes = useLayoutStyles();

  const [audio, setaudio] = useState([]);
  const [result, setresult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    db.collection("audio")
      .orderBy("date", "desc")
      .get()
      .then(async (snap) => {
        let documents = await snap.docs.map((post) => {
          let data = post.data();
          return {
            aid: post.id,
            ...data,
          };
        });
        setaudio(documents);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    deepSearch("");
  }, [audio]);

  function deepSearch(query) {
    query = query.trim().toLowerCase();
    if (query === "") {
      setresult(audio);
      return;
    }
    let res = new Set([]);
    query.split(" ").map((q) => {
      search(q, res);
    });

    setresult([...res]);
  }
  function search(str, res) {
    audio.map((i) => {
      if (!i.description || !i.title || !i.date) return;
      i.description.split(" ").map((s) => {
        if (s.toLowerCase().includes(str)) {
          res.add(i);
        }
      });
      i.title.split(" ").map((s) => {
        if (s.toLowerCase().includes(str)) {
          res.add(i);
        }
      });
      i.date
        .toDate()
        .toString()
        .split(" ")
        .map((s) => {
          if (s.toLowerCase().includes(str)) {
            res.add(i);
          }
        });
    });
  }

  const applySearch = (q) => {
    setSearchValue(q);
    deepSearch(q);
  };

  return (
    <div className={classes.pageContainer}>
      <BackTop />
      <PageHeader
        title="Recordings"
        subtitle="Search by title, description, or date"
      />

      <div className="search-sticky">
        <div className="search-surface">
          <Search
            placeholder="Search recordings..."
            enterButton="Search"
            size="large"
            value={searchValue}
            onChange={(e) => applySearch(e.target.value)}
          />
          <p className="search-hint">
            Search by title, description, or date.
          </p>
          <div className="search-chips">
            {SEARCH_EXAMPLES.map((ex) => (
              <button
                key={ex}
                type="button"
                className="search-chip"
                onClick={() => applySearch(ex)}
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <SkeletonGrid count={6} />
      ) : (
        <Grid container spacing={3} className="card-grid">
          {result.map((a) => (
            <Grid key={a.aid} item xs={12} sm={6} md={4} lg={3}>
              <Card className={`${classes.cardRoot} brand-card fade-in-up`}>
                <CardActionArea component="div">
                  <CardContent className={classes.cardContent}>
                    <div className="episode-badge">
                      <SoundFilled />
                      Recording
                    </div>
                    <Typography gutterBottom variant="subtitle1" component="h2" className="display-font">
                      {a.title || "Untitled"}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" display="block" gutterBottom>
                      {a.date && a.date.toDate().toString().substring(0, 15)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="div" className="card-desc-clamp">
                      <ReactMarkdown>
                        {`${(a.description || "").replaceAll("\\n", "\n").substr(0, 80)}...`}
                      </ReactMarkdown>
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardActions}>
                  <Link to={`/audio/${a.aid}`} style={{ textDecoration: "none", width: "100%" }}>
                    <Button fullWidth size="medium" color="secondary" variant="contained">
                      Play recording
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {!loading && result.length === 0 && (
        <div className="empty-state">
          <SoundFilled style={{ fontSize: 48, color: "#ff0555" }} />
          <Typography variant="body1">No recordings match your search.</Typography>
        </div>
      )}
    </div>
  );
}

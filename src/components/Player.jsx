import React, { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.less";
import db from "../firebase";
import firebase from "firebase";
import { userStore } from "./Store";
import {
  ClockCircleOutlined,
  EyeTwoTone,
  HeartTwoTone,
} from "@ant-design/icons";
import LoadingOverlay from "react-loading-overlay";
import { Button, message, Timeline, Typography } from "antd";
import { navigate } from "@reach/router";

import {
  EmailIcon,
  EmailShareButton,
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import ReactMarkdown from "react-markdown";

export default function Player({ id }) {
  const autUser = userStore.useState((s) => s.user);
  const playerRef = React.useRef(null);

  const [liked, setliked] = useState(false);
  const [playing, setplaying] = useState({ title: "loading..." });
  const [loading, setloading] = useState(true);

  const title = `*${playing.title}*
Recording of *${
    playing.date && playing.date.toDate().toString().substring(0, 15)
  }* 😄🙏🏼
I loved hearing this audio. Thought sharing with you

`;

  useEffect(() => {
    db.collection("audio")
      .doc(id)
      .onSnapshot(async (snap) => {
        if (!snap.exists) {
          navigate("/");
        } else {
          let data = snap.data();
          setplaying(data);

          db.collection("audio")
            .doc(id)
            .collection("likes")
            .doc(autUser.uid)
            .get()
            .then((doc) => {
              if (doc.exists) {
                setliked(true);
              }
            });

          db.collection("audio")
            .doc(id)
            .collection("viewers")
            .doc(autUser.uid)
            .get()
            .then((doc) => {
              if (!doc.exists) {
                doc.ref.set({
                  id: autUser.uid,
                  name: autUser.displayName || "",
                  time: firebase.firestore.Timestamp.now(),
                });
                db.collection("audio")
                  .doc(id)
                  .update({
                    views: firebase.firestore.FieldValue.increment(1),
                  });
              }
            });
        }
      });
  }, []);
  const likeIt = () => {
    if (!liked) {
      message.success("Thank you for a LIKE");

      db.collection("audio")
        .doc(id)
        .update({ liked: firebase.firestore.FieldValue.increment(1) });

      db.collection("audio")
        .doc(id)
        .collection("likes")
        .doc(autUser.uid)
        .set({
          id: autUser.uid,
          name: autUser.displayName || "",
          time: firebase.firestore.Timestamp.now(),
        });
      setliked(true);
    }
  };

  const downloader = {
    "rjoshi14899@gmail.com": true,
    "dharwadkarnj@gmail.com": true,
    "+919340573858": true,
    "+919561721324": true,
  };
  return (
    <div className="player-page">
      <div className="player-section player-section--hero" style={{ minHeight: 120 }}>
        <LoadingOverlay active={loading} spinner text={"Loading your audio...."}>
          <AudioPlayer
            ref={playerRef}
            header={
              <Typography.Title level={4} style={{ textAlign: "center", margin: 0 }} className="display-font">
                Now Playing: {playing.title}
              </Typography.Title>
            }
            customAdditionalControls={[]}
            style={{ width: "100%" }}
            src={
              playing?.id?.includes("meeting")
                ? playing?.id
                : `https://docs.google.com/uc?export=download&id=${playing.id}`
            }
            onCanPlay={(e) => {
              setloading(false);
            }}
          />
        </LoadingOverlay>
      </div>

      <div className="player-section">
        <Typography.Title level={3} style={{ textAlign: "center", marginTop: 0 }} className="display-font">
          {playing.title}
        </Typography.Title>

        <div className="player-stats">
          <span>
            {playing.views && playing.views} watched <EyeTwoTone />
          </span>
          <span>
            {playing.liked || 0} liked{" "}
            <HeartTwoTone
              id="like-button"
              onClick={likeIt}
              twoToneColor={liked ? "#ff0555" : ""}
              style={{ fontSize: 20, cursor: "pointer" }}
            />
          </span>
          {playing.date && (
            <span>{playing.date.toDate().toString().substring(0, 15)}</span>
          )}
        </div>
      </div>

      {playing.ts && playing.ts.length > 0 && (
        <div className="player-section">
          <Typography.Title level={4} className="display-font">
            Quick Access
          </Typography.Title>
          <Timeline>
            {playing.ts.map((ts, idx) => (
              <Timeline.Item key={idx} dot={<ClockCircleOutlined />}>
                {ts.title}&nbsp;&nbsp;
                {ts.time.split(":").map((t, i) => (
                  <span key={i} className="timestamp-chip">
                    {Number(t) > 0 ? `${t}${i == 2 ? "" : ":"}` : ""}
                  </span>
                ))}
                &nbsp;&nbsp;
                <Button
                  size="small"
                  className="btn-seek"
                  onClick={() => {
                    var hms = ts.time;
                    var a = hms.split(":");
                    var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
                    playerRef.current.audio.current.currentTime = seconds;
                  }}
                >
                  Play
                </Button>
              </Timeline.Item>
            ))}
          </Timeline>
        </div>
      )}

      <div className="player-section">
        <Typography.Title level={4} style={{ textAlign: "center" }} className="display-font">
          Share
        </Typography.Title>
        <div className="player-share-row">
          <WhatsappShareButton url={window.location.href} title={title} separator=" ">
            <span className="share-chip">
              <WhatsappIcon size={36} round />
              WhatsApp
            </span>
          </WhatsappShareButton>
          <TelegramShareButton url={window.location.href} title={title}>
            <span className="share-chip">
              <TelegramIcon size={36} round />
              Telegram
            </span>
          </TelegramShareButton>
          <EmailShareButton url={window.location.href} subject={"FROM CBKM"} body={title}>
            <span className="share-chip">
              <EmailIcon size={36} round />
              Email
            </span>
          </EmailShareButton>
        </div>
      </div>

      <div className="player-section player-description">
        <Typography.Title level={4} className="display-font">
          Description
        </Typography.Title>
        <ReactMarkdown>
          {playing.description && playing.description.replaceAll("\\n", "\n")}
        </ReactMarkdown>
      </div>

      {((autUser && autUser.email && downloader[autUser.email] == true) ||
        (autUser.phoneNumber && downloader[autUser.phoneNumber]) == true) && (
        <div className="player-section">
          <Button
            className="btn-seek"
            size="large"
            href={
              playing?.id?.includes("meeting")
                ? playing.id
                : `https://docs.google.com/uc?export=download&id=${playing.id}`
            }
            target="_blank"
          >
            Download
          </Button>
          <Typography.Paragraph copyable style={{ marginTop: 12, wordBreak: "break-all" }}>
            {playing?.id?.includes("meeting")
              ? playing.id
              : `https://drive.google.com/file/d/${playing.id}/view?usp=sharing`}
          </Typography.Paragraph>
          <div className="player-share-row">
            <WhatsappShareButton
              url={
                playing?.id?.includes("meeting")
                  ? playing?.id
                  : `https://drive.google.com/file/d/${playing.id}/view?usp=sharing`
              }
              title={"Direct Link "}
              separator=" "
            >
              <span className="share-chip">
                <WhatsappIcon size={36} round />
                Share link
              </span>
            </WhatsappShareButton>
          </div>
        </div>
      )}
    </div>
  );
}

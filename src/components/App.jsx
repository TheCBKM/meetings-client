import React from "react";
import SignUp from "./SignUp.jsx";
import { Router, Link, navigate } from "@reach/router";
import {
  AppstoreOutlined,

} from "@ant-design/icons";
import { userStore } from "./Store";
import AllMeetings from "./AllMeetings";
import { Menu, PageHeader, Spin } from "antd";
import { auth } from "../firebase";
import EditMeeting from "./RegisterMeeting.jsx";
import RegisterMeeting from "./RegisterMeeting.jsx";

export default function App() {
  const user = userStore.useState((s) => s.user);
  console.log("user", user);
  const signOut = () => {
    auth.signOut().then(() => navigate("/signup"));
  };
  return (
    <div>
      {user == false ? (
        <center>
          <Spin />
        </center>
      ) : (
          <div>
            <PageHeader
              style={{ border: "1px solid rgb(235, 237, 240)" }}
              title="Meetings"
              subTitle={user ? user.phoneNumber.length > 0 ? user.phoneNumber : user.displayName : ""}
              extra="CBKM"
            />
            {user && (
              <Menu mode="horizontal">
                <Menu.Item key="3" icon={<AppstoreOutlined />}>
                  <Link to="/meetings">All Meetings</Link>
                </Menu.Item>

                <Menu.Item key="1" style={{ float: "right" }} onClick={signOut}>
                  <p>Sign Out</p>
                </Menu.Item>
              </Menu>
            )}

            <Router>
              {!user ? (
                <SignUp default path="/signup" />
              ) : (
                  <>
                    <AllMeetings default path="/meetings" />
                    <RegisterMeeting path="/register/:id" />
                  </>
                )}
            </Router>
          </div>
        )}
    </div>
  );
}

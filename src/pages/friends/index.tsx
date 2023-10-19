import Layout from "@/components/Layout";
import UserSummary from "@/components/UserSummary";
import { withProtected } from "@/hocs/withProtected";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Tab, Tabs, Typography, Badge } from "@mui/material";
import Link from "next/link";
import { useState, useMemo } from "react";
import * as Styled from "@/styles/Friends.styled";

function Friends() {
  const user = useAppSelector((state) => state.user);

  const [activeTopTab, setActiveTopTab] = useState(0);
  const [activeBottomTab, setActiveBottomTab] = useState(0);

  const requestsTotal = useMemo(
    () => user.receivedFriendsRequests.length + user.sentFriendsRequests.length,
    [user.receivedFriendsRequests, user.sentFriendsRequests]
  );

  return (
    <Layout>
      <>
        <Tabs
          value={activeTopTab}
          onChange={(_, num) => setActiveTopTab(num)}
          variant="fullWidth"
        >
          <Tab label="Friends" />
          <Tab
            label={
              <Styled.TabLabel>
                Requests{" "}
                <Badge
                  max={100}
                  color="secondary"
                  badgeContent={requestsTotal}
                  sx={{ marginLeft: "15px" }}
                />
              </Styled.TabLabel>
            }
          />
        </Tabs>
        {activeTopTab === 1 && (
          <Tabs
            value={activeBottomTab}
            onChange={(_, num) => setActiveBottomTab(num)}
            variant="fullWidth"
            sx={{ marginTop: "20px" }}
          >
            <Tab
              label={
                <Styled.TabLabel>
                  Sent{" "}
                  <Badge
                    max={100}
                    color="secondary"
                    badgeContent={user.sentFriendsRequests.length}
                    sx={{ marginLeft: "15px" }}
                  />
                </Styled.TabLabel>
              }
            />
            <Tab
              label={
                <Styled.TabLabel>
                  Received{" "}
                  <Badge
                    max={100}
                    color="secondary"
                    badgeContent={user.receivedFriendsRequests.length}
                    sx={{ marginLeft: "15px" }}
                  />
                </Styled.TabLabel>
              }
            />
          </Tabs>
        )}
        {activeTopTab === 0 && (
          <Styled.UsersContainer>
            {user.friends.length ? (
              user.friends.map((friend) => (
                <UserSummary
                  fullName={friend.fullName}
                  id={friend.id}
                  username={friend.username}
                  key={friend.id}
                />
              ))
            ) : (
              <Typography>
                No friends yet. <Link href="/profiles">Add one</Link>
              </Typography>
            )}
          </Styled.UsersContainer>
        )}
        {activeTopTab === 1 && (
          <Styled.UsersContainer>
            {activeBottomTab === 0 ? (
              user.sentFriendsRequests.length ? (
                user.sentFriendsRequests.map((potentialFriend) => (
                  <UserSummary
                    fullName={potentialFriend.fullName}
                    id={potentialFriend.id}
                    username={potentialFriend.username}
                    key={potentialFriend.id}
                  />
                ))
              ) : (
                <Typography>
                  You didn't send any friends requests.{" "}
                  <Link href="/profiles">Find friend here</Link>
                </Typography>
              )
            ) : user.receivedFriendsRequests.length ? (
              user.receivedFriendsRequests.map((potentialFriend) => (
                <UserSummary
                  fullName={potentialFriend.fullName}
                  id={potentialFriend.id}
                  username={potentialFriend.username}
                  key={potentialFriend.id}
                />
              ))
            ) : (
              <Typography>You have no friends requests</Typography>
            )}
          </Styled.UsersContainer>
        )}
      </>
    </Layout>
  );
}

export default withProtected(Friends);

import React, { useEffect } from "react";
import { Row, Col } from "reactstrap";
import { LoadingData } from "@components";
import { initials } from "@utils";
import "./styles.scss";

const PostList = ({
  userData = {},
  data = [],
  getData,
  loading = false,
  error = false,
}) => {
  useEffect(() => {
    if (data?.length === 0) {
      getData();
    }
  }, []);
  return (
    <div className="post-list">
      {loading || error ? (
        <LoadingData fetchData={getData} loadingFailed={error} />
      ) : (
        <Row md={2}>
          {data?.map((e) => {
            return (
              <Col>
                <div class="post-card">
                  <div class="post-header">
                    <div class="profile-picture bg-primary">
                      {userData?.name ? initials(userData?.name) : "-"}
                    </div>
                    <div class="user-info">
                      <span class="username">{userData?.name}</span>
                      <span class="handle"> - {userData?.username}</span>
                    </div>
                  </div>
                  <div class="post-content">
                    <p>{e?.body || "-"}</p>
                  </div>
                  <div class="post-footer">
                    <button class="action-btn">Edit</button>
                    <button class="action-btn text-danger">Delete</button>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
};

export default PostList;

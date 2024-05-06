import React, { useEffect } from "react";
import "./styles.scss";
import { Col } from "reactstrap";

const PostList = ({ data = [], getData }) => {
  useEffect(() => {
    if (data?.length === 0) {
      getData();
    }
  }, []);
  return (
    <div className="post-list">
      <Row md={2}>
        {data?.map((e) => {
          return (
            <Col>
              <div class="post-card">
                <div class="post-header">
                  <img
                    src="profile-picture.jpg"
                    alt="Profile Picture"
                    class="profile-picture"
                  />
                  <div class="user-info">
                    <span class="username">John Doe</span>
                    <span class="handle">@johndoe</span>
                  </div>
                </div>
                <div class="post-content">
                  <p>
                    This is the post content. It can be of any length and may
                    contain text, links, images, and other media.
                  </p>
                  <img
                    src="post-image.jpg"
                    alt="Post Image"
                    class="post-image"
                  />
                </div>
                <div class="post-footer">
                  <button class="action-btn">Like</button>
                  <button class="action-btn">Comment</button>
                  <button class="action-btn">Share</button>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default PostList;

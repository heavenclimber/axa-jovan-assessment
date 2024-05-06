import React, { useEffect, useState } from "react";
import { Row, Col, Button, Input } from "reactstrap";
import { api } from "@utils/api";
import { notification } from "@utils";
import { LoadingData, ModalPrompt } from "@components";
import { initials } from "@utils";
import "./styles.scss";

const PostList = ({
  userData = {},
  data = [],
  getData,
  loading = false,
  error = false,
}) => {
  const [modalAdd, setModalAdd] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [loadingAddPost, setLoadingAddPost] = useState(false);

  useEffect(() => {
    if (data?.length === 0) {
      getData();
    }
  }, []);

  const addPost = async () => {
    const failed = () => {
      setLoadingAddPost(false);
      notification({
        type: "error",
        text: "Something wrong, please try again",
      });
    };
    try {
      const url = `/posts`;

      setLoadingAddPost(true);
      const response = await api.post(url, {
        userId: userData?.id,
        body: newPost,
        title: newPostTitle,
      });
      if (response.status === 201) {
        setLoadingAddPost(false);
        setNewPost("");
        setNewPostTitle("");
        setModalAdd(false)
        notification({
          type: "success",
          text: "Post added successfully",
        });
      } else {
        failed();
      }
    } catch {
      failed();
    }
  };

  const cancelNewPost = () => {
    setModalAdd(false);
    setNewPost("");
    setNewPostTitle("");
  };

  return (
    <div className="post-list">
      <ModalPrompt
        open={modalAdd}
        handleSubmit={() => {
          addPost();
        }}
        title="Add New Post"
        cancelButton
        loading={loadingAddPost}
        disabled={newPost?.length < 5 || newPost?.length > 200}
      >
        <>
          <Input
            className="my-3"
            placeholder="Input new post title"
            onChange={(e) => {
              setNewPostTitle(e?.target?.value);
            }}
          />
          <textarea
            rows={3}
            cols="30"
            className="textarea-post"
            placeholder="Add your new post min 5 characters and max 200 characters"
            onChange={(e) => {
              setNewPost(e?.target?.value);
            }}
            handleCancel={() => {
              cancelNewPost();
            }}
            maxLength={200}
          />
          <div className="d-flex align-items-center justify-content-end">
            <span
              className={`${
                newPost?.length === 200 ? "text-danger" : "text-info"
              }`}
            >
              {newPost?.length}
            </span>
            /200
          </div>
        </>
      </ModalPrompt>

      {loading || error ? (
        <LoadingData fetchData={getData} loadingFailed={error} />
      ) : (
        <>
          <Button
            color="success"
            outline
            onClick={() => {
              setModalAdd(true);
            }}
            style={{ marginBottom: 25 }}
          >
            Add New Post
          </Button>
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
        </>
      )}
    </div>
  );
};

export default PostList;

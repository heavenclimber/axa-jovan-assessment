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

  const [modalEdit, setModalEdit] = useState(false);
  const [editPost, setEditPost] = useState("");
  const [editPostTitle, setEditPostTitle] = useState("");
  const [editPostId, setEditPostId] = useState(0);
  const [loadingEditPost, setLoadingEditPost] = useState(false);

  const [modalDelete, setModalDelete] = useState(false);
  const [deletePostId, setDeletePostId] = useState(0);
  const [loadingDeletePost, setLoadingDeletePost] = useState(false);

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
        setModalAdd(false);
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

  const submitEditPost = async () => {
    const failed = () => {
      setLoadingEditPost(false);
      notification({
        type: "error",
        text: "Something wrong, please try again",
      });
    };
    try {
      const url = `/posts/${editPostId}`;

      setLoadingEditPost(true);
      const response = await api.put(url, {
        userId: userData?.id,
        body: editPost,
        title: editPostTitle,
      });
      if (response.status === 200) {
        setLoadingEditPost(false);
        setEditPost("");
        setEditPostTitle("");
        setModalEdit(false);
        setEditPostId(0);
        notification({
          type: "success",
          text: "Post edited successfully",
        });
      } else {
        failed();
      }
    } catch {
      failed();
    }
  };

  const submitDeletePost = async () => {
    const failed = () => {
      setLoadingDeletePost(false);
      notification({
        type: "error",
        text: "Something wrong, please try again",
      });
    };
    try {
      const url = `/posts/${deletePostId}`;

      setLoadingDeletePost(true);
      const response = await api.delete(url, {});
      if (response.status === 200) {
        setLoadingDeletePost(false);
        setModalDelete(false);
        setDeletePostId(0);
        notification({
          type: "success",
          text: "Post deleted successfully",
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

  const cancelEditPost = () => {
    setModalEdit(false);
    setEditPost("");
    setEditPostTitle("");
    setEditPostId(0);
  };

  const cancelDeletePost = () => {
    setModalDelete(false);
    setDeletePostId(0);
  };

  const openModalEdit = (e) => {
    setModalEdit(true);
    setEditPost(e?.body);
    setEditPostTitle(e?.title);
    setEditPostId(e?.id);
  };

  const openModalDelete = (e) => {
    setModalDelete(true);
    setDeletePostId(e?.id);
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
        handleCancel={() => {
          cancelNewPost();
        }}
      >
        <>
          <Input
            className="my-3"
            placeholder="Input new post title"
            onChange={(e) => {
              setNewPostTitle(e?.target?.value);
            }}
            value={newPostTitle}
          />
          <textarea
            rows={3}
            cols="30"
            className="textarea-post"
            placeholder="Add your new post min 5 characters and max 200 characters"
            value={newPost}
            onChange={(e) => {
              setNewPost(e?.target?.value);
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

      <ModalPrompt
        open={modalEdit}
        handleSubmit={() => {
          submitEditPost();
        }}
        title="Edit Post"
        cancelButton
        loading={loadingEditPost}
        disabled={editPost?.length < 5 || newPost?.length > 200}
        handleCancel={() => {
          cancelEditPost();
        }}
      >
        <>
          <Input
            className="my-3"
            placeholder="Input new post title"
            onChange={(e) => {
              setEditPostTitle(e?.target?.value);
            }}
            value={editPostTitle}
          />
          <textarea
            rows={3}
            cols="30"
            className="textarea-post"
            placeholder="Add your new post min 5 characters and max 200 characters"
            value={editPost}
            onChange={(e) => {
              setEditPost(e?.target?.value);
            }}
            maxLength={200}
          />
          <div className="d-flex align-items-center justify-content-end">
            <span
              className={`${
                editPost?.length === 200 ? "text-danger" : "text-info"
              }`}
            >
              {editPost?.length}
            </span>
            /200
          </div>
        </>
      </ModalPrompt>

      <ModalPrompt
        open={modalDelete}
        handleSubmit={() => {
          submitDeletePost();
        }}
        title="Are you sure want to delete this post?"
        cancelButton
        loading={loadingDeletePost}
        handleCancel={() => {
          cancelDeletePost();
        }}
      />

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
                      <div class="user-info d-flex align-items-center justify-content-between">
                        <span class="username">{userData?.name}</span>
                        <span class="handle"> - {userData?.username}</span>
                      </div>
                    </div>
                    <div class="post-content">
                      <strong style={{ fontSize: 18 }}>
                        {e?.title || "-"}
                      </strong>
                      <p>{e?.body || "-"}</p>
                    </div>
                    <div class="post-footer">
                      <button
                        onClick={() => {
                          openModalEdit(e);
                        }}
                        class="action-btn"
                      >
                        Edit
                      </button>
                      <button
                        class="action-btn text-danger"
                        onClick={() => {
                          openModalDelete(e);
                        }}
                      >
                        Delete
                      </button>
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

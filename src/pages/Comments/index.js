import React, { useEffect, useState } from "react";
import { Row, Col, Button, Card } from "reactstrap";
import { api } from "@utils/api";
import { useParams } from "react-router-dom";
import { notification } from "@utils";
import { initials } from "@utils";
import { LoadingData, ModalPrompt } from "@components";
import "./styles.scss";

const CommentList = ({}) => {
  const { id } = useParams();
  const [modalAdd, setModalAdd] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [loadingAddComment, setLoadingAddComment] = useState(false);

  const [modalEdit, setModalEdit] = useState(false);
  const [editComment, setEditComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(0);
  const [loadingEditComment, setLoadingEditComment] = useState(false);

  const [modalDelete, setModalDelete] = useState(false);
  const [deleteCommentId, setDeleteCommentId] = useState(0);
  const [loadingDeleteComment, setLoadingDeleteComment] = useState(false);

  const [commentData, setCommentData] = useState([]);
  const [postData, setPostData] = useState({});

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const getData = async () => {
    const failed = () => {
      setCommentData([]);
      setPostData({});
      setLoading(false);
      notification({
        type: "error",
        text: "Something wrong, please try again",
      });
      setError(true);
    };
    try {
      const url = `/comments?postId=${id}`;
      const urlPost = `/posts/${id}`;

      setLoading(true);
      setError(false);
      const [response1, response2] = await Promise.all([
        api.get(url, {}),
        api.get(urlPost, {}),
      ]);
      // const response1 = await api.get(url, {});
      if (response1.status === 200 && response2.status === 200) {
        setLoading(false);
        setCommentData(response1?.data);
        setPostData(response2?.data);
      } else {
        failed();
      }
    } catch {
      failed();
    }
  };

  const addComment = async () => {
    const failed = () => {
      setLoadingAddComment(false);
      notification({
        type: "error",
        text: "Something wrong, please try again",
      });
    };
    try {
      const url = `/comments`;

      setLoadingAddComment(true);
      const response = await api.post(url, {
        postId: id,
        body: newComment,
      });
      if (response.status === 201) {
        setLoadingAddComment(false);
        setNewComment("");
        setModalAdd(false);
        notification({
          type: "success",
          text: "Comment added successfully",
        });
      } else {
        failed();
      }
    } catch {
      failed();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const submitEditComment = async () => {
    const failed = () => {
      setLoadingEditComment(false);
      notification({
        type: "error",
        text: "Something wrong, please try again",
      });
    };
    try {
      const url = `/comments/${editCommentId}`;

      setLoadingEditComment(true);
      const response = await api.patch(url, {
        body: editComment,
      });
      if (response.status === 200) {
        setLoadingEditComment(false);
        setEditComment("");
        setModalEdit(false);
        setEditCommentId(0);
        notification({
          type: "success",
          text: "Comment edited successfully",
        });
      } else {
        failed();
      }
    } catch {
      failed();
    }
  };

  const submitDeleteComment = async () => {
    const failed = () => {
      setLoadingDeleteComment(false);
      notification({
        type: "error",
        text: "Something wrong, please try again",
      });
    };
    try {
      const url = `/comments/${deleteCommentId}`;

      setLoadingDeleteComment(true);
      const response = await api.delete(url, {});
      if (response.status === 200) {
        setLoadingDeleteComment(false);
        setModalDelete(false);
        setDeleteCommentId(0);
        notification({
          type: "success",
          text: "Comment deleted successfully",
        });
      } else {
        failed();
      }
    } catch {
      failed();
    }
  };

  const cancelNewComment = () => {
    setModalAdd(false);
    setNewComment("");
  };

  const cancelEditComment = () => {
    setModalEdit(false);
    setEditComment("");
    setEditCommentId(0);
  };

  const cancelDeleteComment = () => {
    setModalDelete(false);
    setDeleteCommentId(0);
  };

  const openModalEdit = (e) => {
    setModalEdit(true);
    setEditComment(e?.body);
    setEditCommentId(e?.id);
  };

  const openModalDelete = (e) => {
    setModalDelete(true);
    setDeleteCommentId(e?.id);
  };

  return (
    <Card className="p-4">
      <Card className="p-3 my-4">
        <div class="post-header">
          <div class="profile-picture bg-primary">
            {postData?.name ? initials(postData?.name) : "-"}
          </div>
          <div class="user-info d-flex align-items-center justify-content-between">
            <span class="username">{postData?.name}</span>
            <span class="handle"> - {postData?.username}</span>
          </div>
        </div>
        <div class="post-content">
          <strong style={{ fontSize: 18 }}>{postData?.title || "-"}</strong>
          <p>{postData?.body || "-"}</p>
        </div>
      </Card>
      <Card className="comment-list p-5 border">
        <ModalPrompt
          open={modalAdd}
          handleSubmit={() => {
            addComment();
          }}
          title="Add New Comment"
          cancelButton
          loading={loadingAddComment}
          disabled={newComment?.length < 5 || newComment?.length > 500}
          handleCancel={() => {
            cancelNewComment();
          }}
        >
          <>
            <textarea
              rows={3}
              cols="30"
              className="textarea-comment"
              placeholder="Add your new comment min 5 characters and max 500 characters"
              value={newComment}
              onChange={(e) => {
                setNewComment(e?.target?.value);
              }}
              maxLength={500}
            />
            <div className="d-flex align-items-center justify-content-end">
              <span
                className={`${
                  newComment?.length === 500 ? "text-danger" : "text-info"
                }`}
              >
                {newComment?.length}
              </span>
              /500
            </div>
          </>
        </ModalPrompt>

        <ModalPrompt
          open={modalEdit}
          handleSubmit={() => {
            submitEditComment();
          }}
          title="Edit Comment"
          cancelButton
          loading={loadingEditComment}
          disabled={editComment?.length < 5 || newComment?.length > 500}
          handleCancel={() => {
            cancelEditComment();
          }}
        >
          <>
            <textarea
              rows={3}
              cols="30"
              className="textarea-comment"
              placeholder="Add your new comment min 5 characters and max 500 characters"
              value={editComment}
              onChange={(e) => {
                setEditComment(e?.target?.value);
              }}
              maxLength={500}
            />
            <div className="d-flex align-items-center justify-content-end">
              <span
                className={`${
                  editComment?.length === 500 ? "text-danger" : "text-info"
                }`}
              >
                {editComment?.length}
              </span>
              /500
            </div>
          </>
        </ModalPrompt>

        <ModalPrompt
          open={modalDelete}
          handleSubmit={() => {
            submitDeleteComment();
          }}
          title="Are you sure want to delete this comment?"
          cancelButton
          loading={loadingDeleteComment}
          handleCancel={() => {
            cancelDeleteComment();
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
              Add New Comment
            </Button>
            <Row md={1}>
              {commentData?.map((e) => {
                return (
                  <Col>
                    <div class="comment-bubble-card">
                      <div class="comment">
                        <div class="comment-header">
                          <h3 class="comment-name">{e?.name}</h3>
                          <p class="comment-email">{e?.email}</p>
                        </div>
                        <p class="comment-content">{e?.body}</p>
                        <div class="comment-footer my-3">
                          <Button
                            style={{ marginRight: 15 }}
                            onClick={() => {
                              openModalEdit(e);
                            }}
                            class="action-btn"
                          >
                            Edit
                          </Button>
                          <Button
                            color="danger"
                            class="action-btn text-danger"
                            onClick={() => {
                              openModalDelete(e);
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </>
        )}
      </Card>
    </Card>
  );
};

export default CommentList;

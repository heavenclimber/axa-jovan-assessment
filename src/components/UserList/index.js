import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col } from "reactstrap";
import { initials } from "@utils";

const UserList = ({ data = [] }) => {
  const navigate = useNavigate();

  const toUserDetail = (e = {}) => {
    navigate(`/user/${e?.id}`);
  };

  return (
    <>
      {data?.map((e) => {
        return (
          <Col className="mb-4">
            <Card
              className="p-3 up-user-card"
              onClick={() => {
                toUserDetail(e);
              }}
            >
              <div className="d-flex align-items-center">
                <div className="avatar-icon-initial bg-primary rounded-circle shadow-sm-dark text-white mr-4">
                  {initials(e?.name)}
                </div>
                <div>
                  <strong>{e?.name}</strong>
                  <div>{e?.username}</div>
                  <div>{e?.email}</div>
                  <div>{e?.website}</div>
                </div>
              </div>
            </Card>
          </Col>
        );
      })}
    </>
  );
};

export default UserList;

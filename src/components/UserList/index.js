import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col } from "reactstrap";

const UserList = ({ data = [] }) => {
  const navigate = useNavigate();

  const initials = (name = "") => {
    name = name?.split(" ").filter((e) => e.length > 0);
    if (name?.length > 1) {
      return `${name[0][0]}${name[1][0]}`.toUpperCase();
    } else {
      name = name[0];
      return `${name[0]}${name[name.length - 1]}`.toUpperCase();
    }
  };

  const toUserDetail = (e = {}) => {
    navigate(`/user/${e?.id}`);
  };

  return (
    <>
      {data?.map((e) => {
        return (
          <Col className="mb-4">
            <Card className="p-3 up-user-card" onClick={toUserDetail(e)}>
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

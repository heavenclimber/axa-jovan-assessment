import React, { useEffect, useState } from "react";
import { api } from "@utils/api";
import { LoadingData } from "@components";
import { notification } from "@utils";
import { Card, Row } from "reactstrap";
import { UserList } from "@components";

const Home = () => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getData = async () => {
    const failed = () => {
      setUserList([]);
      setLoading(false);
      notification({
        type: "error",
        text: "Something wrong, please try again",
      });
      setError(true);
    };
    try {
      const url = "/users";
      setLoading(true);
      setError(false);
      const response = await api.get(url, {});
      if (response.status === 200) {
        setLoading(false);
        setUserList(response?.data);
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

  return (
    <div className="d-flex align-items-center user-page">
      {(loading || error) && (
        <LoadingData fetchData={getData} loadingFailed={error} />
      )}
      <Card className="m-3 p-3">
        <Row md={4}>
          <UserList data={userList} />
        </Row>
      </Card>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "@utils/api";
import { notification } from "@utils";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { Card, CardBody, CardHeader } from "reactstrap";
import { LoadingData } from "@components";
import { AlbumList, PostList } from "@components";

const UserPage = ({}) => {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [postData, setPostData] = useState([]);
  const [albumData, setAlbumData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);
  const [loadingAlbum, setLoadingAlbum] = useState(false);

  const [error, setError] = useState(false);

  const getData = async () => {
    const failed = () => {
      setUserData({});
      setLoading(false);
      notification({
        type: "error",
        text: "Something wrong, please try again",
      });
      setError(true);
    };
    try {
      const url = `/users/${id}`;

      setLoading(true);
      setError(false);
      const response = await api.get(url, {});
      if (response.status === 200) {
        setLoading(false);
        setUserData(response?.data);
      } else {
        failed();
      }
    } catch {
      failed();
    }
  };

  const getDataPost = async () => {
    const failed = () => {
      setPostData([]);
      setLoadingPost(false);
      notification({
        type: "error",
        text: "Something wrong, please try again",
      });
      setError(true);
    };
    try {
      const urlPost = `/posts?userId=${id}`;

      setLoadingPost(true);
      setError(false);
      const response = await api.get(urlPost, {});
      if (response.status === 200) {
        setLoadingPost(false);
        setPostData(response?.data);
      } else {
        failed();
      }
    } catch {
      failed();
    }
  };

  const getDataAlbum = async () => {
    const failed = () => {
      setAlbumData([]);
      setLoadingAlbum(false);
      notification({
        type: "error",
        text: "Something wrong, please try again",
      });
      setError(true);
    };
    try {
      const urlPost = `/albums?userId=${id}`;
      setLoadingAlbum(true);
      setError(false);
      const response = await api.get(urlPost, {});
      if (response.status === 200) {
        setLoadingAlbum(false);
        setAlbumData(response?.data);
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
    <div className="p-4">
      {(loading || error) && (
        <LoadingData fetchData={getData} loadingFailed={error} />
      )}
      <Card>
        <CardHeader className="d-flex align-items-center justify-content-between">
          <div>
            <strong className="text-primary">{userData?.name}</strong>
            <div className="text-secondary">{userData?.username}</div>
          </div>
          <span className="text-secondary"> {userData?.email}</span>
        </CardHeader>
        <CardBody>
          <Tabs>
            <TabList>
              <Tab>Post</Tab>
              <Tab>Album</Tab>
            </TabList>
            <TabPanel>
              <PostList getData={getDataPost} data={postData} />
            </TabPanel>
            <TabPanel>
              <AlbumList getData={getDataAlbum} data={albumData} />
            </TabPanel>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserPage;

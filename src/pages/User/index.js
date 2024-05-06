import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { api } from "@utils/api";
import { notification } from "@utils";
import { Card, CardBody, CardHeader } from "reactstrap";
import { LoadingData } from "@components";
import { AlbumList, PostList, NavigationContent } from "@components";

const UserPage = ({}) => {
  const { id } = useParams();
  const query = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const [navProspect, setNavProspect] = useState(query.get("tab") || "post");

  const [userData, setUserData] = useState({});
  const [postData, setPostData] = useState([]);
  const [albumData, setAlbumData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);
  const [loadingAlbum, setLoadingAlbum] = useState(false);

  const [error, setError] = useState(false);
  const [errorPost, setErrorPost] = useState(false);
  const [errorAlbum, setErrorAlbum] = useState(false);

  const navMap = [
    {
      navId: "post",
      onClick: () => {
        setNavProspect("post");
        navigate({
          pathname: `/user/${id}`,
          search: `tab=post`,
          replace: true,
        });
      },
      label: "Posts",
    },
    {
      navId: "album",
      onClick: () => {
        setNavProspect("album");
        navigate({
          pathname: `/user/${id}`,
          search: `tab=album`,
          replace: true,
        });
      },
      label: "Albums",
    },
  ];

  useEffect(() => {
    setNavProspect(query.get("tab") || "post");
  }, [query]);

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
      setErrorPost(true);
    };
    try {
      const urlPost = `/posts?userId=${id}`;

      setLoadingPost(true);
      setErrorPost(false);
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
      setErrorAlbum(true);
    };
    try {
      const urlAlbum = `/albums?userId=${id}`;
      setLoadingAlbum(true);
      setErrorAlbum(false);
      const response = await api.get(urlAlbum, {});
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

  const renderContent = () => {
    if (navProspect === "post") {
      return (
        <PostList
          userData={userData}
          getData={getDataPost}
          data={postData}
          loading={loadingPost}
          error={errorPost}
        />
      );
    } else if (navProspect === "album") {
      return (
        <AlbumList
          userData={userData}
          getData={getDataAlbum}
          data={albumData}
          loading={loadingAlbum}
          error={errorAlbum}
        />
      );
    }
  };

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
          <NavigationContent navMap={navMap} navProspect={navProspect} />
          {renderContent()}
        </CardBody>
      </Card>
    </div>
  );
};

export default UserPage;

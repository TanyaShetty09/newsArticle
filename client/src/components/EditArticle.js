import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './EditArticle.css';

const EditArticle = () => {
  const { id } = useParams();
  const [articleName, setArticleName] = useState("");
  const [articleType, setArticleType] = useState("");
  const [articleDescription, setArticleDescription] = useState("");
  const [image, setImage] = useState(null);  // New state for image

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/articles/${id}`)
      .then((response) => {
        console.log(response.data);
        setArticleName(response.data.articleName);
        setArticleType(response.data.articleType);
        setArticleDescription(response.data.articleDescription);
      })
      .catch((err) => {
        console.log(err);
        navigate("/error");
      });
  }, [id, navigate]);

  const onUpdateHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('articleName', articleName);
    formData.append('articleType', articleType);
    formData.append('articleDescription', articleDescription);
    if (image) {
      formData.append('image', image);  // Append image to form data
    }

    axios.put(`http://localhost:8000/api/pets/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log(response.data);
        navigate(`/articles/${response.data._id}`);
        alert("Updated Successfully!")
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Edit Article</h1>
        <p>
          <Link to="/articles">Home</Link>
        </p>
      </div>
      <div className="sub-header">
        <h3>Edit {articleName}</h3>
      </div>

      <form className="form" onSubmit={onUpdateHandler}>
        <div className="form-group">
          <label htmlFor="articleName">Article Name</label>
          <input
            type="text"
            id="articleName"
            name="articleName"
            value={articleName}
            onChange={(e) => setArticleName(e.target.value)}
          />
          {errors.articleName && <span>{errors.articleName.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="articleType">Article Type</label>
          <input
            type="text"
            id="articleType"
            name="articleType"
            value={articleType}
            onChange={(e) => setArticleType(e.target.value)}
          />
          {errors.articleType && <span>{errors.articleType.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="articleDescription">Article Description</label>
          <textarea
            id="articleDescription"
            name="articleDescription"
            value={articleDescription}
            onChange={(e) => setArticleDescription(e.target.value)}
          />
          {errors.articleDescription && <span>{errors.articleDescription.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="image">Article Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}  // Update image state
          />
          {errors.image && <span>{errors.image.message}</span>}
        </div>

        <button type="submit">Update Article</button>
      </form>
    </div>
  );
};

export default EditArticle;

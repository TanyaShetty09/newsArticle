import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./ArticleDetails.css"; // Import the CSS file for styling

const ArticleDetails = () => {
  const [allArticles, setAllArticles] = useState([]);
  const { id } = useParams();
  const [article, setArticle] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/articles/${id}`)
      .then((response) => {
        console.log(response.data);
        setArticle(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const deleteArticleHandler = (id) => {
    axios
      .delete(`http://localhost:8000/api/articles/${id}`)
      .then((response) => {
        console.log(response.data);
        setAllArticles(allArticles.filter((article) => article._id !== id));
        alert("Thanks for adopting this pet..Visit again!")
        navigate("/articles");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="row my-3">
        <div className="col text-end"></div>
        <div className="header">
          <h1>NewsHub</h1>
          <Link to="/articles">Home</Link>
        </div>
      </div>
      <div className="row my-3 py-2">
        <div className="col text-start">
          <h3 className="my-2"> {article.articleName}</h3>
        </div>
        <div className="col text-end">
          <button
            type="button"
            className="btn btn-danger my-2"
            onClick={() => deleteArticleHandler(id)}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="article-details-container">
        <div className="article-image-container">
          <img
            src={`http://localhost:8000/${article.imageUrl}`}
            alt={article.articleName}
            className="article-image-details"
          />
        </div>
        <div className="article-info-container">
          <div className="article-info-row">
            <div className="article-info-label">Type:</div>
            <div className="article-info-value">{article.articleType}</div>
          </div>
          <div className="article-info-row">
            <div className="article-info-label">Description:</div>
            <div className="article-info-value">{article.articleDescription}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;

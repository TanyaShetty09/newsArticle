import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaInfoCircle, FaEdit, FaSearch } from "react-icons/fa"; // Import icons from React Icons
import "./ArticleStore.css";

const ArticleStore = () => {
  const [allArticles, setAllArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/articles")
      .then((response) => {
        console.log(response.data);
        setAllArticles(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredArticles = allArticles.filter(
    (article) =>
      article.articleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.articleType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <div className="header">
        <h1>NewsHub</h1>
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        <FaSearch className="search-icon" />
        <Link to="/articles/new">Add Article</Link>
      </div>
      <div className="sub-header">
        <h3>To know more goto to the official NEWS website</h3>
      </div>
      <div className="article-cards">
        {filteredArticles.map((article, index) => (
          <div key={index} className="article-card">
            <div className="article-image">
              <img
                src={`http://localhost:8000/${article.imageUrl}`}
                alt={article.articleName}
              />
            </div>

            <div className="article-info">
              <h2>{article.articleName}</h2>
              <p>Type: {article.articleType}</p>
              <div className="actions">
                <Link to={`/articles/${article._id}`}>
                  <button className="btn details">
                    <FaInfoCircle /> Details
                  </button>
                </Link>
                <Link to={`/articles/edit/${article._id}`}>
                  <button className="btn edit">
                    <FaEdit /> Edit
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleStore;

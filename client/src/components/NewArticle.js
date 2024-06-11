import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './NewArticle.css'; // Import your custom CSS for styling

const NewArticle = () => {
    const [articleName, setArticleName] = useState("");
    const [articleType, setArticleType] = useState("");
    const [articleDescription, setArticleDescription] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('articleName', articleName);
            formData.append('articleType', articleType);
            formData.append('articleDescription', articleDescription);
           

            const response = await axios.post("http://localhost:8000/api/articles", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            console.log(response.data);
            alert("Article added successfully!")
            navigate("/articles");
        } catch (err) {
            console.error(err);
            setErrors(err.response.data.errors);
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div className="container">
            <div className="header">
                <h1>NewsHub</h1>                    
                <Link to="/articles">Home</Link>
            </div>
            
            <form className="form" onSubmit={onSubmitHandler}>
                <label htmlFor="articleName">Article Name:</label>
                <input
                    type="text"
                    id="articleName"
                    name="articleName"
                    value={articleName}
                    onChange={(e) => setArticleName(e.target.value)}
                />
                {errors.articleName ? <span>{errors.articleName.message}</span> : null}

                <label htmlFor="articleType">Article Type:</label>
                <input
                    type="text"
                    id="articleType"
                    name="articleType"
                    value={articleType}
                    onChange={(e) => setArticleType(e.target.value)}
                />
                {errors.articleType ? <span>{errors.articleType.message}</span> : null}

                <label htmlFor="articleDescription">Article Description:</label>
                <textarea
                    id="articleDescription"
                    name="articleDescription"
                    value={articleDescription}
                    onChange={(e) => setArticleDescription(e.target.value)}
                />
                {errors.articleDescription ? <span>{errors.articleDescription.message}</span> : null}

                <label htmlFor="image">Upload Image:</label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                {errors.image ? <span>{errors.image.message}</span> : null}

                <button type="submit">Add Article</button>
            </form>
        </div>
    );
};

export default NewArticle;

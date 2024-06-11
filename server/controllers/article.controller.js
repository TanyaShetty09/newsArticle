const Article = require('../models/article.model');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

module.exports = {
    getAllArticles: (request, response) => {
        Article.find()
            .sort({ articleType: 1 })
            .then((allArticles) => {
                console.log(allArticles);
                response.json(allArticles);
            })
            .catch((err) => {
                console.log("Something went wrong with getAllArticles");
                response.json({ message: "Something went wrong with getAllArticles", error: err });
            });
    },

    getOneArticle: (request, response) => {
        Article.findOne({ _id: request.params.id })
            .then((oneArticle) => {
                console.log(oneArticle);
                response.json(oneArticle);
            })
            .catch((err) => {
                console.log("Something went wrong with getOneArticle");
                response.json({ message: "Something went wrong with getOneArticle", error: err });
            });
    },

    createArticle: (request, response) => {
        upload.single('image')(request, response, (err) => {
            if (err) {
                console.log("Something went wrong with file upload");
                return response.status(500).json({ message: "Something went wrong with file upload", error: err });
            }

            const { articleName, articleType, articleDescription} = request.body;
            const newArticle = {
                articleName,
                articleType,
                articleDescription,
                imageUrl: request.file ? 'uploads/' + request.file.filename : null // Save the relative path of the uploaded image
            };

            Article.create(newArticle)
                .then((article) => {
                    console.log(article);
                    response.json(article);
                })
                .catch((err) => {
                    console.log("Something went wrong with createArticle");
                    response.status(400).json(err);
                });
        });
    },

    updateArticle: (request, response) => {
        upload.single('image')(request, response, (err) => {
            if (err) {
                console.log("Something went wrong with file upload");
                return response.status(500).json({ message: "Something went wrong with file upload", error: err });
            }

            const { articleName, articleType, articleDescription } = request.body;
            const updateData = {
                articleName,
                articleType,
                articleDescription
            };

            if (request.file) {
                updateData.imageUrl = 'uploads/' + request.file.filename;
            }

            Article.findOneAndUpdate(
                { _id: request.params.id },
                updateData,
                {
                    new: true,
                    runValidators: true,
                }
            )
                .then((updateArticlet) => {
                    console.log(updateArticle);
                    response.json(updateArticle);
                    console.log("successfully updated article!");
                })
                .catch((err) => {
                    console.log("Something went wrong with updateArticle");
                    response.status(400).json(err);
                });
        });
    },

    deleteArticle: (request, response) => {
        Article.deleteOne({ _id: request.params.id })
            .then((deleteArticle) => {
                console.log(deleteArticle);
                response.json(deleteArticle);
            })
            .catch((err) => {
                console.log("Something went wrong with deleteArticle");
                response.json({ message: "Something went wrong with deleteArticle", error: err });
            });
    }
};

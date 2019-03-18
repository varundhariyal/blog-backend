const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const check = require('./../libs/checkLib')
/* Models */
const BlogModel = mongoose.model('Blog')

/**
 * function to read all blogs.
 */
let getAllBlog = (req, res) => {
    BlogModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Blog Controller: getAllBlog', 10)
                let apiResponse = response.generate(true, 'Failed To Find Blog Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Blog Found', 'Blog Controller: getAllBlog')
                let apiResponse = response.generate(true, 'No Blog Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All Blog Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get all blogs

/**
 * function to read single blog.
 */
let viewByBlogId = (req, res) => {

    if (check.isEmpty(req.params.blogId)) {

        console.log('blogId should be passed')
        let apiResponse = response.generate(true, 'blogId is missing', 403, null)
        res.send(apiResponse)
    } else {

        BlogModel.findOne({ 'blogId': req.params.blogId }, (err, result) => {

            if (err) {

                console.log('Error Occured.')
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {

                console.log('Blog Not Found.')
                let apiResponse = response.generate(true, 'Blog Not Found', 404, null)
                res.send(apiResponse)
            } else {
                logger.info("Blog found successfully","BlogController:ViewBlogById",5)
                let apiResponse = response.generate(false, 'Blog Found Successfully.', 200, result)
                res.send(apiResponse)
            }
        })
    }
}

/**
 * function to read blogs by category.
 */
let viewByCategory = (req, res) => {

    if (check.isEmpty(req.params.categoryId)) {

        console.log('categoryId should be passed')
        let apiResponse = response.generate(true, 'CategoryId is missing', 403, null)
        res.send(apiResponse)
    } else {

        BlogModel.find({ 'category': req.params.category }, (err, result) => {

            if (err) {

                console.log('Error Occured.')
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {

                console.log('Blogs Not Found.')
                let apiResponse = response.generate(true, 'Blogs Not Found', 404, null)
                res.send(apiResponse)
            } else {
                console.log('Blogs Found Successfully')
                let apiResponse = response.generate(false, 'Blogs Found Successfully.', 200, result)
                res.send(apiResponse)
            }
        })
    }
}

/**
 * function to read blogs by author.
 */
let viewByAuthor = (req, res) => {

    if (check.isEmpty(req.params.author)) {

        console.log('author should be passed')
        let apiResponse = response.generate(true, 'author is missing', 403, null)
        res.send(apiResponse)
    } else {

        BlogModel.find({ 'author': req.params.author }, (err, result) => {

            if (err) {

                console.log('Error Occured.')
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {

                console.log('Blogs Not Found.')
                let apiResponse = response.generate(true, 'Blogs Not Found', 404, null)
                res.send(apiResponse)
            } else {
                console.log('Blogs Found Successfully')
                let apiResponse = response.generate(false, 'Blogs Found Successfully.', 200, result)
                res.send(apiResponse)
            }
        })
    }
}

/**
 * function to edit blog by admin.
 */
let editBlog = (req, res) => {

    if (check.isEmpty(req.params.blogId)) {

        console.log('blogId should be passed')
        let apiResponse = response.generate(true, 'blogId is missing', 403, null)
        res.send(apiResponse)
    } else {

        let options = req.body;
        console.log(options);
        BlogModel.update({ 'blogId': req.params.blogId }, options, { multi: true }).exec((err, result) => {

            if (err) {

                console.log('Error Occured.')
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {

                console.log('Blog Not Found.')
                let apiResponse = response.generate(true, 'Blog Not Found', 404, null)
                res.send(apiResponse)
            } else {
                console.log('Blog Edited Successfully')
                let apiResponse = response.generate(false, 'Blog Edited Successfully.', 200, result)
                res.send(apiResponse)
            }
        })
    }
}

/**
 * function to find the assignment.
 */
let findBlogToEdit = (blogId) => {

    if (check.isEmpty(req.params.blogId)) {

        console.log('blogId should be passed')
        let apiResponse = response.generate(true, 'blogId is missing', 403, null)
        reject(apiResponse)
    } else {
        return new Promise((resolve, reject) => {
            BlogModel.findOne({ 'blogId': req.params.blogId }, (err, blog) => {
                if (err) {
                    console.log('Error Occured.')
                    logger.error(`Error Occured : ${err}`, 'Database', 10)
                    let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(blog)) {
                    console.log('Blog Not Found.')
                    let apiResponse = response.generate(true, 'Blog Not Found', 404, null)
                    reject(apiResponse)
                } else {
                    console.log('Blog Found.')
                    resolve(blog)
                }
            })
        })
    }
}

/**
 * function to delete the assignment collection.
 */
let deleteBlog = (req, res) => {

    if (check.isEmpty(req.params.blogId)) {

        console.log('blogId should be passed')
        let apiResponse = response.generate(true, 'blogId is missing', 403, null)
        res.send(apiResponse)
    } else {

        BlogModel.remove({ 'blogId': req.params.blogId }, (err, result) => {
            if (err) {
                console.log('Error Occured.')
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                console.log('Blog Not Found.')
                let apiResponse = response.generate(true, 'Blog Not Found.', 404, null)
                res.send(apiResponse)
            } else {
                console.log('Blog Deletion Success')
                let apiResponse = response.generate(false, 'Blog Deleted Successfully', 200, result)
                res.send(apiResponse)
            }
        })
    }
}

/**
 * function to create the blog.
 */
let createBlog = (req, res) => {
    let blogCreationFunction = () => {
        return new Promise((resolve, reject) => {
            console.log(req.body)
            if (check.isEmpty(req.body.title) || check.isEmpty(req.body.description) || check.isEmpty(req.body.blogBody) || check.isEmpty(req.body.category)) {

                console.log("403, forbidden request");
                let apiResponse = response.generate(true, 'required parameters are missing', 403, null)
                reject(apiResponse)
            } else {

                var today = Date.now()
                let blogId = shortid.generate()

                let newBlog = new BlogModel({

                    blogId: blogId,
                    title: req.body.title,
                    description: req.body.description,
                    bodyHtml: req.body.blogBody,
                    isPublished: true,
                    category: req.body.category,
                    author: req.user.fullName,
                    created: today,
                    lastModified: today
                }) // end new blog model

                let tags = (req.body.tags != undefined && req.body.tags != null && req.body.tags != '') ? req.body.tags.split(',') : []
                newBlog.tags = tags

                newBlog.save((err, result) => {
                    if (err) {
                        console.log('Error Occured.')
                        logger.error(`Error Occured : ${err}`, 'Database', 10)
                        let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                        reject(apiResponse)
                    } else {
                        console.log('Success in blog creation')
                        resolve(result)
                    }
                }) // end new blog save
            }
        }) // end new blog promise
    } // end create blog function

    // making promise call.
    blogCreationFunction()
        .then((result) => {
            let apiResponse = response.generate(false, 'Blog Created successfully', 200, result)
            res.send(apiResponse)
        })
        .catch((error) => {
            console.log(error)
            res.send(error)
        })
}

/**
 * function to increase views of a blog.
 */
let increaseBlogView = (req, res) => {
    
        if (check.isEmpty(req.params.blogId)) {
    
            console.log('blogId should be passed')
            let apiResponse = response.generate(true, 'blogId is missing', 403, null)
            res.send(apiResponse)
        } else {
    
            BlogModel.findOne({ 'blogId': req.params.blogId }, (err, result) => {
    
                if (err) {
    
                    console.log('Error Occured.')
                    logger.error(`Error Occured : ${err}`, 'Database', 10)
                    let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                    res.send(apiResponse)
                } else if (check.isEmpty(result)) {
    
                    console.log('Blog Not Found.')
                    let apiResponse = response.generate(true, 'Blog Not Found', 404, null)
                    res.send(apiResponse)
                } else {
                    result.views += 1;
                    result.save(function(err,result){
                        if(err){
                            console.log('Error Occured.')
                            logger.error(`Error Occured : ${err}`, 'Database', 10)
                            let apiResponse = response.generate(true, 'Error Occured While saving blog', 500, null)
                            res.send(apiResponse)
                        }
                        else{
                            console.log('Blog Updated Successfully')
                            let apiResponse = response.generate(false, 'Blog Updated Successfully.', 200, result)
                            res.send(apiResponse)
                        }
                    });// end result
                    
                }
            })
        }
    }

 
    



module.exports = {

    getAllBlog: getAllBlog,
    createBlog: createBlog,
    viewByBlogId: viewByBlogId,
    viewByCategory: viewByCategory,
    viewByAuthor: viewByAuthor,
    editBlog: editBlog,
    deleteBlog: deleteBlog,
    increaseBlogView : increaseBlogView
}// end exports
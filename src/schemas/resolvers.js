const Post = require('./post');
const resolvers = {
    Query: {
        //Get all posts
        posts: async (parent, args) => {
            const posts = await Post.find();
            console.log(posts);
            return posts;
        },

        //Get a post
        post: (parent, args) => {
            try {
                const post = Post.findById(args.id)
                console.log(post);
                return(post);
            } catch (err) {
                throw new Error("Can't find post!")
            }
        }
    },
    Mutation: {
        //Create a Draft
        createDraft: async (parent, args) => {
            const post = await new Post ({
                title: args.title,
                content: args.content,
                published: false,
            })
            try {
            const savedPost = await post.save()
            console.log(savedPost);
            return savedPost;
            } catch (err) {
                throw new Error("Can't save post!");
            }
        },

        //Delete a Post
        deletePost: async(parent, args) => {
            try {
                const post = Post.findByIdAndDelete(args.id)
                console.log(post);
                return(post);
            } catch (err) {
                throw new Error("Can't delete post!")
            }
        },

        //Update a Post
        updatePost: async(parent, args) => {
            try {
                const post = Post.findByIdAndUpdate(args.id, {$set:{title: args.title, content: args.content}})
                console.log(post);
                return(post);
            } catch (err) {
                throw new Error("Can't update post!")
            }
        },

        //Publish a Draft
        publish: async (parent, args) => {
            try {
                const post = await Post.findById(args.id)
                post.published = true
                return(post);
                
            } catch (err) {
                throw new Error("Can't publish draft!")
            }
        },
        
    },
}

module.exports = resolvers;
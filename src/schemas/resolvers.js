const Post = require('./post');
const resolvers = {
    Query: {
        //Get all posts
        posts: async (parent, args) => {
            const posts = await Post.find();
            return posts;
        },

        //Get a post
        post: async (parent, args) => {
            try {
                const post = await Post.findById(args.id)
                return post;
            } catch (err) {
                throw new Error("Can't find post!")
            }
        }
    },
    Mutation: {
        //Create a Draft
        createDraft: async (parent, args) => {
            const draft = await new Post ({
                title: args.title,
                content: args.content,
                published: false,
            })
            try {
            const savedDraft = await draft.save()
            return savedDraft;
            } catch (err) {
                throw new Error("Can't save post!");
            }
        },

        //Delete a Post
        deletePost: async (parent, args) => {
            try {
                const post = await Post.findByIdAndDelete(args.id)
                return post;
            } catch (err) {
                throw new Error("Can't delete post!")
            }
        },

        //Update a Post
        updatePost: async (parent, args) => {
            try {
                const post = await Post.findByIdAndUpdate(args.id, {$set:{title: args.title, content: args.content}})
                return post;
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
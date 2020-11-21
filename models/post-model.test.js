const Post = require('./post-models');
const db = require('../database/db-config');

beforeEach(async () => {
    await db('posts').truncate()
});

describe('post model', () => {
    describe('getAll()', () => {
        it('gets an empty array', async () => {
            const posts = await Post.getAll()
            expect(posts).toHaveLength(0)
        });
        it('gets all posts', async () => {
           await db('posts').insert({ user_id: 1, post: "testing" })
           let posts = await Post.getAll()
           expect(posts).toHaveLength(1)
           await db('posts').insert({ user_id: 2, post: "testing2" })
           posts = await Post.getAll()
           expect(posts).toHaveLength(2)
        });
    });

    describe('getById()', () => {
        it('gets post by id', async () =>{
            await db('posts').insert({ user_id: 1, post: "post1" })
            const testPostId1 = await Post.getById(1)
            expect(testPostId1).toMatchObject({ user_id: 1, post: "post1" })
            await db('posts').insert({ user_id: 2, post: "post2" })
            const testPostId2 = await Post.getById(2)
            expect(testPostId2).toMatchObject({ user_id: 2, post: "post2" })
        });
    });
        
    describe('addPost()', () => {
        it('gets addedPost', async () => {
            const post1 = await Post.addPost({ user_id: 1, post: "add post1" })
            expect(post1).toMatchObject({ user_id: 1, post: "add post1" })
            const post2 = await Post.addPost({ user_id: 2, post: "add post2" })
            expect(post2).toMatchObject({ user_id: 2, post: "add post2" })
        });
    });

    describe('update()', () => {
        it('gets updated post', async () => {
            await db('posts').insert({ user_id: 1, post: "org post1" })
            await Post.update(1, { user_id: 1, post: "updated post1" })
            const updatedPost1 = await db('posts').where('id', 1)
            expect(updatedPost1).toMatchObject([{ id: 1, user_id: 1, post: "updated post1" }])
            await db('posts').insert({ user_id: 2, post: "org post2" })
            await Post.update(2, { user_id: 2, post: "updated post2" })
            const updatedPost2 = await db('posts')
            expect(updatedPost2).toMatchObject([
                { id: 1, user_id: 1, post: "updated post1" },
                { id: 2, user_id: 2, post: "updated post2" }
            ]);
        });
    });

    describe('remove()', () => {
        it('removes post', async () => {
            await Post.addPost({ user_id: 1, post: "before remove1" })
            await Post.remove(1)
            const removedPost1 = await Post.getAll()
            expect(removedPost1).toHaveLength(0)
            await Post.addPost({ user_id: 1, post: "add post1" })
        });
    });
});

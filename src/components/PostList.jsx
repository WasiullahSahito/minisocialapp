// src/components/PostList.js
import Post from './Post';

function PostList({ posts, currentUserEmail, onUpdatePost, onDeletePost }) {
    return (
        <div className="post-list">
            {posts.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">📭</div>
                    <h3>No posts yet</h3>
                    <p>Be the first to share something with the community!</p>
                </div>
            ) : (
                posts.map(post => (
                    <Post
                        key={post.id}
                        post={post}
                        isOwner={post.userEmail === currentUserEmail}
                        onUpdatePost={onUpdatePost}
                        onDeletePost={onDeletePost}
                    />
                ))
            )}
        </div>
    );
}

export default PostList;
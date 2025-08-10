// src/pages/Home.js
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db, timestamp } from '../firebase';
import { collection, query, orderBy, onSnapshot, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';

function Home() {
    const { currentUser, logout } = useAuth();
    const [posts, setPosts] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const postsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setPosts(postsData);
            setIsLoading(false);
        });
        return unsubscribe;
    }, []);

    const addPost = async (content, imageUrl) => {
        await addDoc(collection(db, 'posts'), {
            content,
            imageUrl,
            userEmail: currentUser.email,
            createdAt: timestamp()
        });
    };

    const updatePost = async (postId, newContent, newImageUrl) => {
        const postRef = doc(db, 'posts', postId);
        await updateDoc(postRef, {
            content: newContent,
            imageUrl: newImageUrl,
            updatedAt: timestamp()
        });
    };

    const deletePost = async (postId) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            const postRef = doc(db, 'posts', postId);
            await deleteDoc(postRef);
        }
    };

    const filteredPosts = activeTab === 'mine'
        ? posts.filter(post => post.userEmail === currentUser.email)
        : posts;

    return (
        <div className="home-container">
            <header>
                <div className="logo">
                    <span>S</span>
                    <h1>SocialSphere</h1>
                </div>

                <div className="user-info">
                    <div className="user-avatar">
                        {currentUser.email.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-details">
                        <span className="username">{currentUser.email.split('@')[0]}</span>
                        <span className="user-email">{currentUser.email}</span>
                    </div>
                    <button onClick={logout} className="logout-btn">
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                </div>
            </header>

            <div className="content-container">
                <div className="sidebar">
                    <div className="sidebar-section">
                        <h3>Menu</h3>
                        <ul>
                            <li className="active">
                                <i className="fas fa-home"></i> Home Feed
                            </li>
                            <li>
                                <i className="fas fa-bell"></i> Notifications
                            </li>
                            <li>
                                <i className="fas fa-envelope"></i> Messages
                            </li>
                            <li>
                                <i className="fas fa-bookmark"></i> Bookmarks
                            </li>
                        </ul>
                    </div>

                    <div className="sidebar-section">
                        <h3>Trending Topics</h3>
                        <ul className="topics">
                            <li>#reactjs</li>
                            <li>#webdev</li>
                            <li>#design</li>
                            <li>#javascript</li>
                            <li>#firebase</li>
                        </ul>
                    </div>

                    <div className="sidebar-footer">
                        <p>© 2023 SocialSphere</p>
                    </div>
                </div>

                <div className="main-content">
                    <PostForm onPost={addPost} />

                    <div className="feed-tabs">
                        <button
                            className={activeTab === 'all' ? 'active' : ''}
                            onClick={() => setActiveTab('all')}
                        >
                            All Posts
                        </button>
                        <button
                            className={activeTab === 'mine' ? 'active' : ''}
                            onClick={() => setActiveTab('mine')}
                        >
                            My Posts
                        </button>
                    </div>

                    {isLoading ? (
                        <div className="loading-container">
                            <div className="spinner"></div>
                            <p>Loading posts...</p>
                        </div>
                    ) : (
                        <PostList
                            posts={filteredPosts}
                            currentUserEmail={currentUser.email}
                            onUpdatePost={updatePost}
                            onDeletePost={deletePost}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
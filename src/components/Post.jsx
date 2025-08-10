// src/components/Post.js
import { useState, useRef } from 'react';
import { format } from 'date-fns';
import { FaHeart, FaComment, FaShare, FaEdit, FaTrash, FaSave, FaTimes, FaSmile } from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react';

function Post({ post, isOwner, onUpdatePost, onDeletePost }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(post.content);
    const [editedImageUrl, setEditedImageUrl] = useState(post.imageUrl || '');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const textareaRef = useRef(null);

    const handleUpdate = () => {
        onUpdatePost(post.id, editedContent, editedImageUrl);
        setIsEditing(false);
    };

    const onEmojiClick = (emojiObject) => {
        const cursorPosition = textareaRef.current.selectionStart;
        const textBefore = editedContent.substring(0, cursorPosition);
        const textAfter = editedContent.substring(cursorPosition);

        setEditedContent(textBefore + emojiObject.emoji + textAfter);

        // Focus back on textarea after emoji selection
        setTimeout(() => {
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(
                cursorPosition + emojiObject.emoji.length,
                cursorPosition + emojiObject.emoji.length
            );
        }, 0);
    };

    return (
        <div className="post">
            <div className="post-header">
                <div className="user-info">
                    <div className="user-avatar">
                        {post.userEmail.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <span className="username">{post.userEmail.split('@')[0]}</span>
                        <span className="post-time">
                            {post.createdAt?.toDate && format(post.createdAt.toDate(), 'MMM d, yyyy · h:mm a')}
                            {post.updatedAt && ' (edited)'}
                        </span>
                    </div>
                </div>

                {isOwner && !isEditing && (
                    <div className="post-actions-menu">
                        <button
                            className="edit-btn"
                            onClick={() => {
                                setIsEditing(true);
                                setEditedContent(post.content);
                                setEditedImageUrl(post.imageUrl || '');
                            }}
                        >
                            <FaEdit />
                        </button>
                        <button
                            className="delete-btn"
                            onClick={() => onDeletePost(post.id)}
                        >
                            <FaTrash />
                        </button>
                    </div>
                )}
            </div>

            {isEditing ? (
                <div className="edit-form">
                    <textarea
                        ref={textareaRef}
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="edit-textarea"
                    />

                    <div className="edit-actions">
                        <button
                            type="button"
                            className="action-btn"
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        >
                            <FaSmile className="icon" />
                            <span>Emoji</span>
                        </button>

                        <input
                            type="url"
                            placeholder="Image URL (optional)"
                            value={editedImageUrl}
                            onChange={(e) => setEditedImageUrl(e.target.value)}
                            className="image-url-input"
                        />

                        {showEmojiPicker && (
                            <div className="emoji-picker-container">
                                <EmojiPicker onEmojiClick={onEmojiClick} />
                            </div>
                        )}

                        <div className="edit-buttons">
                            <button
                                className="cancel-btn"
                                onClick={() => setIsEditing(false)}
                            >
                                <FaTimes /> Cancel
                            </button>
                            <button
                                className="save-btn"
                                onClick={handleUpdate}
                                disabled={!editedContent.trim()}
                            >
                                <FaSave /> Save
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <p className="post-content">{post.content}</p>

                    {post.imageUrl && (
                        <div className="post-image">
                            <img src={post.imageUrl} alt="Post" />
                        </div>
                    )}
                </>
            )}

            <div className="post-stats">
                <div className="stat-item">
                    <FaHeart className="heart-icon" /> 42
                </div>
                <div className="stat-item">
                    <FaComment /> 8 comments
                </div>
                <div className="stat-item">
                    <FaShare /> 3 shares
                </div>
            </div>

            <div className="post-actions">
                <button className="action-btn">
                    <FaHeart /> Like
                </button>
                <button className="action-btn">
                    <FaComment /> Comment
                </button>
                <button className="action-btn">
                    <FaShare /> Share
                </button>
            </div>
        </div>
    );
}

export default Post;
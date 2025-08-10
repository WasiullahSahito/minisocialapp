// src/components/PostForm.js
import { useState, useRef } from 'react';
import { FaImage, FaSmile, FaPaperPlane } from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react';

function PostForm({ onPost }) {
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const textareaRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content.trim()) return;
        onPost(content, imageUrl);
        setContent('');
        setImageUrl('');
        setIsExpanded(false);
        setShowEmojiPicker(false);
    };

    const onEmojiClick = (emojiObject) => {
        const cursorPosition = textareaRef.current.selectionStart;
        const textBefore = content.substring(0, cursorPosition);
        const textAfter = content.substring(cursorPosition);

        setContent(textBefore + emojiObject.emoji + textAfter);

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
        <form
            className={`post-form ${isExpanded ? 'expanded' : ''}`}
            onSubmit={handleSubmit}
        >
            <div className="form-header">
                <h3>Create Post</h3>
            </div>

            <textarea
                ref={textareaRef}
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onClick={() => setIsExpanded(true)}
                required
            />

            {isExpanded && (
                <div className="form-actions">
                    <div className="action-buttons">
                        <button
                            type="button"
                            className="action-btn"
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        >
                            <FaSmile className="icon" />
                            <span>Emoji</span>
                        </button>
                        <button type="button" className="action-btn">
                            <FaImage className="icon" />
                            <span>Photo</span>
                        </button>
                    </div>

                    {showEmojiPicker && (
                        <div className="emoji-picker-container">
                            <EmojiPicker onEmojiClick={onEmojiClick} />
                        </div>
                    )}

                    <input
                        type="url"
                        placeholder="Image URL (optional)"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />

                    <button type="submit" className="primary-btn">
                        <FaPaperPlane /> Post
                    </button>
                </div>
            )}
        </form>
    );
}

export default PostForm;
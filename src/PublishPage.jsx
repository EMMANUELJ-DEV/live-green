import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faImage, 
  faTags, 
  faGlobe, 
  faSpinner,
  faExclamationCircle,
  faCheck,
  faWallet
} from '@fortawesome/free-solid-svg-icons';
import "./PublishPage.css";

const PublishPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [hiveUsername, setHiveUsername] = useState('');
  const [hasKeychain, setHasKeychain] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [permlink, setPermlink] = useState('');

  useEffect(() => {
    // Check if Hive Keychain is installed
    const checkKeychain = () => {
      if (window.hive_keychain) {
        setHasKeychain(true);
      } else {
        setErrorMessage('Please install Hive Keychain to publish content');
      }
    };

    // Wait for window to load completely
    if (document.readyState === 'complete') {
      checkKeychain();
    } else {
      window.addEventListener('load', checkKeychain);
      return () => window.removeEventListener('load', checkKeychain);
    }
  }, []);

  // Generate permlink from title
  useEffect(() => {
    if (title) {
      const generated = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setPermlink(generated + '-' + Date.now());
    }
  }, [title]);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image', 'blockquote', 'code-block'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link', 'image', 'blockquote', 'code-block',
    'color', 'background',
    'align'
  ];

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      setErrorMessage('Please fill in both title and content');
      return;
    }

    if (!hasKeychain) {
      setErrorMessage('Please install Hive Keychain to publish content');
      return;
    }

    if (!hiveUsername.trim()) {
      setErrorMessage('Please enter your Hive username');
      return;
    }

    setIsPublishing(true);
    setErrorMessage('');

    try {
      const operations = [
        ['comment',
          {
            parent_author: '',
            parent_permlink: 'hive-123456', // Your community tag
            author: hiveUsername,
            permlink: permlink,
            title: title,
            body: content,
            json_metadata: JSON.stringify({
              tags: tags.split(',').map(tag => tag.trim()),
              image: [coverImage],
              app: 'live-green'
            })
          }
        ]
      ];

      window.hive_keychain.requestBroadcast(
        hiveUsername,
        operations,
        'posting',
        response => {
          if (response.success) {
            setShowSuccess(true);
            setTimeout(() => {
              setShowSuccess(false);
              // Reset form
              setTitle('');
              setContent('');
              setTags('');
              setCoverImage('');
              setPermlink('');
            }, 3000);
          } else {
            setErrorMessage('Publishing failed: ' + response.message);
          }
          setIsPublishing(false);
        }
      );
    } catch (error) {
      console.error('Error publishing content:', error);
      setErrorMessage('Failed to publish content. Please try again.');
      setIsPublishing(false);
    }
  };

  return (
    <div className="publish-page">
      <div className="container">
        <motion.div 
          className="publish-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title">Share Your Environmental Story</h1>
          
          {/* Hive Username Input */}
          <div className="username-input-container">
            <FontAwesomeIcon icon={faWallet} className="input-icon" />
            <input
              type="text"
              placeholder="Enter your Hive username"
              value={hiveUsername}
              onChange={(e) => setHiveUsername(e.target.value)}
              className="username-input"
            />
          </div>

          {/* Cover Image Input */}
          <div className="cover-image-section">
            <div className="image-input-container">
              <FontAwesomeIcon icon={faImage} className="input-icon" />
              <input
                type="text"
                placeholder="Add cover image URL"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="cover-image-input"
              />
            </div>
            {coverImage && (
              <div className="image-preview">
                <img src={coverImage} alt="Cover preview" />
              </div>
            )}
          </div>

          {/* Title Input */}
          <div className="title-input-container">
            <input
              type="text"
              placeholder="Enter your title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="title-input"
            />
          </div>

          {/* Rich Text Editor */}
          <div className="editor-container">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
              placeholder="Share your story..."
              className="content-editor"
            />
          </div>

          {/* Tags Input */}
          <div className="tags-section">
            <div className="tags-input-container">
              <FontAwesomeIcon icon={faTags} className="input-icon" />
              <input
                type="text"
                placeholder="Add tags (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="tags-input"
              />
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <motion.div 
              className="error-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <FontAwesomeIcon icon={faExclamationCircle} />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          {/* Publishing Options */}
          <div className="publishing-options">
            <div className="visibility-option">
              <FontAwesomeIcon icon={faGlobe} className="option-icon" />
              <span>Public</span>
            </div>
            <AnimatePresence>
              {showSuccess ? (
                <motion.div
                  className="success-message"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <FontAwesomeIcon icon={faCheck} />
                  <span>Successfully published!</span>
                </motion.div>
              ) : (
                <motion.button
                  className="publish-button"
                  onClick={handlePublish}
                  disabled={isPublishing || !hasKeychain || !hiveUsername.trim()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isPublishing ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} spin /> Publishing...
                    </>
                  ) : (
                    'Publish Story'
                  )}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PublishPage;

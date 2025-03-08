import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faHeart, faGlobe, faUsers, faClock, faUser } from '@fortawesome/free-solid-svg-icons';
import './HomePage.css';

const HomePage = () => {
  const [recentPosts, setRecentPosts] = useState([]);
  const navigate = useNavigate();
  const imageRegex = /\((https?:\/\/.*?\.(?:png|jpg|jpeg|gif))\)/;

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  useEffect(() => {
    fetchRecentPosts();
  }, []);

  const fetchRecentPosts = async () => {
    const users = ['princekham', 'niznov', 'ak08', 'tommyl33'];
    const postPromises = users.map(user => 
      fetch('https://api.hive.blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'condenser_api.get_discussions_by_blog',
          params: [{ tag: user, limit: 5 }],
          id: 1,
        }),
      })
      .then(response => response.json())
      .then(data => data.result)
      .catch(error => {
        console.error(`Error fetching posts for ${user}:`, error);
        return [];
      })
    );

    try {
      const postsFromAllUsers = await Promise.all(postPromises);
      const mergedPosts = postsFromAllUsers.flat();
      const sortedPosts = mergedPosts.sort((a, b) => new Date(b.created) - new Date(a.created));
      const latestPosts = sortedPosts.slice(0, 8);
      setRecentPosts(latestPosts);
    } catch (error) {
      console.error('Error fetching recent posts:', error);
    }
  };

  const handlePostClick = (post) => {
    navigate(`/post/${post.author}/${post.permlink}`, { state: { post } });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const features = [
    {
      icon: faLeaf,
      title: "Eco-Friendly Solutions",
      description: "Discover sustainable practices and green technologies that help protect our environment."
    },
    {
      icon: faHeart,
      title: "Community Impact",
      description: "Join a community of environmentally conscious individuals making a difference."
    },
    {
      icon: faGlobe,
      title: "Global Reach",
      description: "Connect with environmental initiatives and supporters from around the world."
    },
    {
      icon: faUsers,
      title: "Collaborative Action",
      description: "Work together with others to create meaningful environmental change."
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section content-section">
        <div className="container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Transform Our Planet,<br />One Action at a Time</h1>
            <p className="hero-subtitle">Join the movement towards a sustainable future. Share ideas, inspire change, and make a difference.</p>
            <div className="hero-buttons">
              <motion.button 
                className="primary-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
              <motion.button 
                className="secondary-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
        <div className="hero-background"></div>
      </section>

      {/* Blog Posts Section */}
      <section className="blog-section content-section">
        <div className="container">
          <motion.h2 
            className="section-title text-center"
            {...fadeInUp}
          >
            Latest Environmental Stories
          </motion.h2>
          <div className="blog-grid">
            {recentPosts.map((post, index) => (
              <motion.div 
                className="blog-card"
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => handlePostClick(post)}
              >
                <div className="blog-image">
                  <img 
                    src={imageRegex.exec(post.body)?.[1] || 'https://via.placeholder.com/400x250'} 
                    alt={post.title}
                  />
                </div>
                <div className="blog-content">
                  <h3>{post.title}</h3>
                  <p className="blog-excerpt">{post.body.replace(/!\[.*?\]\(.*?\)/g, '').slice(0, 120)}...</p>
                  <div className="blog-meta">
                    <span>
                      <FontAwesomeIcon icon={faUser} /> {post.author}
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faClock} /> {formatDate(post.created)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section content-section">
        <div className="container">
          <motion.h2 
            className="section-title text-center"
            {...fadeInUp}
          >
            Why Choose Live Green?
          </motion.h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div 
                className="feature-card"
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="feature-icon">
                  <FontAwesomeIcon icon={feature.icon} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section content-section">
        <div className="container">
          <div className="stats-grid">
            <motion.div 
              className="stat-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3>10K+</h3>
              <p>Active Members</p>
            </motion.div>
            <motion.div 
              className="stat-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3>5M+</h3>
              <p>Trees Planted</p>
            </motion.div>
            <motion.div 
              className="stat-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3>100+</h3>
              <p>Countries Reached</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section content-section">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Ready to Make a Difference?</h2>
            <p>Join our community today and start contributing to a greener tomorrow.</p>
            <motion.button 
              className="cta-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
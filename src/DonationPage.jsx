import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTree, 
  faWater, 
  faSeedling, 
  faSun,
  faLeaf,
  faHeart,
  faWallet,
  faCheck,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';
import './DonationPage.css';

const DonationPage = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hiveUsername, setHiveUsername] = useState('');
  const [hasKeychain, setHasKeychain] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Check if Hive Keychain is installed
    const checkKeychain = () => {
      if (window.hive_keychain) {
        setHasKeychain(true);
      } else {
        setErrorMessage('Please install Hive Keychain to make donations');
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

  const donationAmounts = [10, 25, 50, 100];
  
  const projects = [
    {
      id: 1,
      icon: faTree,
      title: "Forest Conservation",
      description: "Help protect and restore forest ecosystems worldwide",
      impact: "1 tree planted per $1 donated",
      hiveAccount: "forest-conservation"
    },
    {
      id: 2,
      icon: faWater,
      title: "Ocean Cleanup",
      description: "Support initiatives to clean our oceans from plastic waste",
      impact: "Remove 1lb of ocean plastic per $2 donated",
      hiveAccount: "ocean-cleanup"
    },
    {
      id: 3,
      icon: faSeedling,
      title: "Sustainable Agriculture",
      description: "Support local farmers in adopting sustainable practices",
      impact: "Train one farmer per $50 donated",
      hiveAccount: "sustainable-farming"
    },
    {
      id: 4,
      icon: faSun,
      title: "Renewable Energy",
      description: "Help communities transition to clean energy solutions",
      impact: "Power one home for a month per $30 donated",
      hiveAccount: "renewable-energy"
    }
  ];

  const handleDonate = async () => {
    if (!selectedProject || (!selectedAmount && !customAmount)) {
      setErrorMessage('Please select a project and donation amount');
      return;
    }

    if (!hasKeychain) {
      setErrorMessage('Please install Hive Keychain to make donations');
      return;
    }

    if (!hiveUsername.trim()) {
      setErrorMessage('Please enter your Hive username');
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');

    try {
      const amount = (selectedAmount || parseFloat(customAmount)).toFixed(3);
      const selectedProjectData = projects.find(p => p.id === selectedProject);
      const memo = `Donation to ${selectedProjectData.title}`;

      // Hive Keychain transfer
      window.hive_keychain.requestTransfer(
        hiveUsername,
        selectedProjectData.hiveAccount,
        amount,
        memo,
        'HIVE',
        response => {
          if (response.success) {
            setShowSuccess(true);
            setTimeout(() => {
              setShowSuccess(false);
              // Reset form
              setSelectedAmount(null);
              setCustomAmount('');
              setSelectedProject(null);
              setHiveUsername('');
            }, 3000);
          } else {
            setErrorMessage('Transaction failed: ' + response.message);
          }
          setIsProcessing(false);
        }
      );
    } catch (error) {
      console.error('Error processing donation:', error);
      setErrorMessage('Failed to process donation. Please try again.');
      setIsProcessing(false);
    }
  };

  const getCurrentAmount = () => {
    if (selectedAmount) return selectedAmount;
    if (customAmount) return parseFloat(customAmount);
    return null;
  };

  return (
    <div className="donation-page">
      <div className="container">
        <motion.div 
          className="donation-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title">Make a Difference Today</h1>
          <p className="page-subtitle">Your contribution helps create a sustainable future for all</p>

          {/* Impact Stats */}
          <div className="impact-stats">
            <motion.div 
              className="impact-card"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FontAwesomeIcon icon={faLeaf} className="impact-icon" />
              <h3>1M+</h3>
              <p>Trees Planted</p>
            </motion.div>
            <motion.div 
              className="impact-card"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FontAwesomeIcon icon={faHeart} className="impact-icon" />
              <h3>50K+</h3>
              <p>Donors</p>
            </motion.div>
          </div>

          {/* Projects Section */}
          <section className="projects-section">
            <h2>Choose Your Impact</h2>
            <div className="projects-grid">
              {projects.map((project) => (
                <motion.div 
                  key={project.id}
                  className={`project-card ${selectedProject === project.id ? 'selected' : ''}`}
                  onClick={() => setSelectedProject(project.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <FontAwesomeIcon icon={project.icon} className="project-icon" />
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="impact-label">
                    <small>{project.impact}</small>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Donation Amount Section */}
          <section className="amount-section">
            <h2>Select Amount</h2>
            <div className="amount-options">
              {donationAmounts.map((amount) => (
                <motion.button
                  key={amount}
                  className={`amount-button ${selectedAmount === amount ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount('');
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {amount} HIVE
                </motion.button>
              ))}
              <div className="custom-amount">
                <span>HIVE</span>
                <input
                  type="number"
                  placeholder="Custom amount"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  min="0.001"
                  step="0.001"
                />
              </div>
            </div>
          </section>

          {/* Hive Username Input */}
          <section className="hive-username-section">
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
          </section>

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

          {/* Donation Button */}
          <section className="payment-section">
            <AnimatePresence>
              {showSuccess ? (
                <motion.div
                  className="success-message"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <FontAwesomeIcon icon={faCheck} />
                  <span>Thank you for your donation!</span>
                </motion.div>
              ) : (
                <motion.button
                  className="donate-button"
                  onClick={handleDonate}
                  disabled={isProcessing || !selectedProject || (!selectedAmount && !customAmount) || !hasKeychain || !hiveUsername.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {isProcessing ? 'Processing...' : `Donate ${getCurrentAmount() ? `${getCurrentAmount()} HIVE` : ''}`}
                </motion.button>
              )}
            </AnimatePresence>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default DonationPage;
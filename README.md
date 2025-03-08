# Live Green - Environmental Sustainability Platform

Live Green is a modern web platform that connects environmentally conscious individuals with sustainability projects and enables content sharing about environmental initiatives. Built with React and integrated with the Hive blockchain for decentralized content publishing and donations.

## 🌿 Features

### Content Publishing
- Rich text editor for creating environmental stories and articles
- Cover image support
- Tag-based categorization
- Decentralized content storage on Hive blockchain
- Real-time preview
- Markdown support

### Donations
- Direct HIVE cryptocurrency donations
- Multiple environmental project categories:
  - Forest Conservation
  - Ocean Cleanup
  - Sustainable Agriculture
  - Renewable Energy
- Real-time impact tracking
- Transparent fund allocation

### User Interface
- Modern, responsive design
- Dark mode support
- Smooth animations and transitions
- Glass-morphism effects
- Mobile-friendly layout

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- [Hive Keychain](https://hive-keychain.com/) browser extension

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/live-green.git
cd live-green
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 💻 Technology Stack

- **Frontend Framework**: React
- **State Management**: React Hooks
- **Styling**: CSS with CSS Variables
- **Animations**: Framer Motion
- **Rich Text Editor**: React Quill
- **Icons**: Font Awesome
- **Blockchain Integration**: Hive Keychain

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_HIVE_NODE=https://api.hive.blog
REACT_APP_DEFAULT_COMMUNITY=hive-123456
```

## 📝 Usage

### Publishing Content
1. Install the Hive Keychain browser extension
2. Enter your Hive username
3. Fill in the story details:
   - Title
   - Cover image URL
   - Content using the rich text editor
   - Relevant tags
4. Click "Publish Story"
5. Approve the transaction in Hive Keychain

### Making Donations
1. Install the Hive Keychain browser extension
2. Select a project to support
3. Choose or enter donation amount in HIVE
4. Enter your Hive username
5. Click "Donate"
6. Approve the transaction in Hive Keychain

## 🎨 Customization

### Theme Variables
The app uses CSS variables for easy theme customization. Main variables are defined in `src/index.css`:

```css
:root {
  --primary-gradient: linear-gradient(135deg, #7928ca, #ff0080);
  --background-light: #ffffff;
  --background-dark: #1a1a1a;
  --text-primary: #333333;
  --text-secondary: #666666;
  --card-light: rgba(255, 255, 255, 0.9);
  --card-dark: rgba(30, 30, 30, 0.9);
  --transition-speed: 0.3s;
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Hive Blockchain](https://hive.io/)
- [Hive Keychain](https://hive-keychain.com/)
- [React](https://reactjs.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Quill](https://github.com/zenoamaro/react-quill)
- [Font Awesome](https://fontawesome.com/)

## 📞 Support

For support, please open an issue in the GitHub repository or contact the team at support@livegreen.com

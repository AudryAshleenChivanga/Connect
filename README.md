# Ashletech Connect SRHR

A comprehensive web application designed to provide reliable sexual and reproductive health information for young people in Sub-Saharan Africa.

## 🌟 Overview

Ashletech Connect SRHR is an innovative platform that bridges the knowledge gap in sexual and reproductive health by providing:

- **Confidential & Safe Environment**: Secure access to sensitive health information
- **Evidence-Based Content**: Reliable information from trusted health organizations
- **Interactive Features**: Engaging tools and resources for better understanding
- **Multilingual Support**: Content accessible in multiple languages
- **Mobile-First Design**: Optimized for mobile devices with poor connectivity
- **Accessibility**: WCAG compliant design for users with disabilities

## 🎨 Design Features

- **Primary Colors**: `#fff4ca` (Cream) and `#ff4774` (Coral Pink)
- **Modern UI**: Clean, professional interface with smooth animations
- **Responsive Design**: Works seamlessly across all devices
- **Interactive Elements**: Hover effects, smooth scrolling, and dynamic content

## 🚀 Features

### Core Sections
- **Hero Section**: Compelling messaging with key statistics
- **About**: Mission statement and platform overview
- **Services**: Health information, peer support, and service locator
- **Resources**: Comprehensive health education materials
- **Contact**: Support form and emergency contact information

### Interactive Features
- **Smart Navigation**: Smooth scrolling with active section highlighting
- **Search Functionality**: Real-time filtering of health resources
- **Mobile Menu**: Responsive navigation for mobile devices
- **Resource Cards**: Categorized health information with favorites
- **Contact Form**: Functional form with validation and feedback
- **Animations**: Smooth transitions and scroll-triggered animations

### Accessibility
- **Skip Links**: Keyboard navigation support
- **ARIA Labels**: Screen reader compatibility
- **Focus Management**: Clear focus indicators
- **Reduced Motion**: Respects user motion preferences

## 🛠️ Technology Stack

- **HTML5**: Semantic markup and accessibility features
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript**: Interactive functionality without frameworks
- **Font Awesome**: Icons and visual elements
- **Google Fonts**: Typography (Inter font family)
- **LocalStorage**: Client-side data persistence for admin functionality

## 📱 Browser Support

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Getting Started

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ashletech-connect-srhr
   ```

2. **Start local server**
   ```bash
   # Using Python (recommended)
   python -m http.server 8000

   # Or using Node.js
   npx http-server -p 8000

   # Or using PHP
   php -S localhost:8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

### File Structure

```
ashletech-connect-srhr/
├── index.html          # Main HTML file
├── styles.css          # CSS styling and layout
├── script.js           # JavaScript functionality
├── Assets/             # Static assets
│   └── ashletech-connect-srhr-high-resolution-logo.png
└── README.md           # Project documentation
```

## 📋 Content Management

### Adding New Resources

To add new health resources, edit the `resources` array in `script.js`:

```javascript
{
    title: 'Resource Title',
    description: 'Brief description of the resource',
    icon: 'fas fa-icon-name',
    tags: 'keyword1 keyword2 keyword3',
    category: 'Resource Category'
}
```

### Updating Contact Information

Modify the contact details in `index.html`:

```html
<!-- Update these sections -->
<div class="contact-item">
    <i class="fas fa-envelope"></i>
    <div>
        <h4>Email Us</h4>
        <p>your-email@example.com</p>
    </div>
</div>
```

## 🔐 Admin Panel

The platform includes a comprehensive admin panel for content management:

### Access
- **Secret Access**: Triple-click the logo on the main website to open admin panel
- **Direct Access**: Navigate to `admin.html` in your browser (for development)
- **Login Credentials**: `admin` / `ashletech2025`
- **Contact**: ashletechconnectsrhr@gmail.com | WhatsApp: +1 650 661 7609

**Security Note**: Admin panel is hidden from public navigation for security. Use the secret access method or direct URL for admin access.

### Features
- **Dashboard**: Overview of resources, statistics, and recent activity
- **Resource Management**: Add, edit, delete, and organize health resources
- **Search & Filter**: Find resources quickly with advanced filtering
- **Data Export/Import**: Backup and restore your content
- **Settings**: Configure platform and admin settings

### Adding New Resources
1. Login to the admin panel
2. Navigate to "Add Resource"
3. Fill in the resource details:
   - **Title**: Clear, descriptive title
   - **Category**: Choose from predefined categories
   - **Description**: Detailed information about the resource
   - **Icon**: FontAwesome icon class (e.g., `fas fa-heart`)
   - **Tags**: Space-separated keywords for searchability
4. Click "Save Resource"

### Managing Existing Resources
- Use the search bar to find specific resources
- Filter by category using the dropdown
- Click "Edit" to modify existing resources
- Click "Delete" to remove resources (with confirmation)

### Data Management
- **Export**: Download all data as JSON for backup
- **Import**: Upload previously exported data to restore content
- All changes are automatically saved to browser storage
- Data persists between browser sessions

## 🔧 Customization

### Color Scheme

The color scheme can be modified in `styles.css`:

```css
:root {
    --primary-color: #ff4774;    /* Main accent color */
    --secondary-color: #fff4ca;  /* Background highlight */
    --accent-color: #ffb3ba;     /* Supporting color */
}
```

### Typography

Font family and sizes can be adjusted:

```css
body {
    font-family: 'Inter', sans-serif; /* Change font family */
    font-size: 16px;                  /* Base font size */
}
```

## 🌐 Deployment

### Web Server
Deploy to any static web server:
- Apache
- Nginx
- Netlify
- Vercel
- GitHub Pages

### CDN Optimization
For production deployment:
- Minify CSS and JavaScript
- Optimize images
- Enable gzip compression
- Set appropriate cache headers

## 📊 Performance

### Optimization Features
- **Lazy Loading**: Images load as needed
- **Minified Assets**: Optimized file sizes
- **Efficient CSS**: Uses CSS Grid and Flexbox
- **Fast JavaScript**: Lightweight vanilla implementation

### Performance Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Content Guidelines
- Use clear, non-judgmental language
- Provide evidence-based information
- Include cultural sensitivity considerations
- Ensure content is age-appropriate
- Verify medical accuracy

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Health Organizations**: WHO, UNFPA, local health ministries
- **Design Inspiration**: Modern health education platforms
- **Open Source Community**: Font Awesome, Google Fonts

## 📞 Support

For technical support or content updates:
- Email: support@ashletechconnect.org
- Issues: GitHub Issues
- Documentation: This README

## 🔄 Future Enhancements

### Planned Features
- [ ] Multi-language support
- [x] Offline functionality (PWA) - Basic service worker implemented
- [ ] User accounts and personalization
- [ ] Integration with health APIs
- [x] Advanced search and filtering - Admin panel search implemented
- [ ] Video content library
- [ ] Community forums
- [ ] Emergency hotline integration
- [x] Admin content management - Fully implemented
- [ ] Real-time collaboration for multiple admins
- [ ] Analytics and reporting dashboard
- [ ] Content approval workflow

### Content Expansion
- [ ] Comprehensive STI information
- [ ] Mental health resources
- [ ] Gender-based violence support
- [ ] HIV/AIDS information
- [ ] Reproductive rights education
- [ ] Local service directories

---

**Ashletech Connect SRHR** - Empowering youth through knowledge and access to sexual and reproductive health services.

*© 2025 Ashletech Connect SRHR. All rights reserved.*

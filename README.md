# AI-Powered Portfolio Website

A modern, responsive portfolio website with AI features, dark theme, and interactive animations. Built with HTML, CSS, JavaScript, and Python (Flask).

## Features

- Responsive design with dark theme
- Interactive spider web background animation
- Smooth scrolling and section animations
- AI-powered chat interface
- Code analysis feature
- Contact form with email integration
- Skills showcase with progress bars
- Project portfolio section
- Social media integration

## Prerequisites

- Python 3.7+
- Node.js (for development)
- OpenAI API key
- SMTP server credentials (for contact form)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio-website
```

2. Create a virtual environment and activate it:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file in the root directory with the following variables:
```
OPENAI_API_KEY=your_openai_api_key
SMTP_SERVER=your_smtp_server
SMTP_PORT=587
SMTP_USERNAME=your_email
SMTP_PASSWORD=your_password
RECIPIENT_EMAIL=your_email
```

5. Run the Flask application:
```bash
python app.py
```

The website will be available at `http://localhost:5000`

## Project Structure

```
portfolio-website/
├── app.py              # Flask backend
├── index.html          # Main HTML file
├── css/
│   └── style.css      # Styles and animations
├── js/
│   └── main.js        # Frontend JavaScript
├── requirements.txt    # Python dependencies
└── .env               # Environment variables
```

## Customization

1. Update personal information in `index.html`
2. Modify the color scheme in `css/style.css`
3. Add your own projects to the projects section
4. Update social media links
5. Customize the AI chat responses in `app.py`

## Technologies Used

- Frontend:
  - HTML5
  - CSS3 (with CSS Variables and Flexbox/Grid)
  - JavaScript (ES6+)
  - Font Awesome Icons
  - Google Fonts

- Backend:
  - Python
  - Flask
  - OpenAI API
  - SMTP for email

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
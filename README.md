# UMT Grading System

A professional academic management and grading platform designed for educational institutions. This system provides comprehensive tools for managing student records, course sections, and automated grading processes.

## 🎓 Features

- **Academic Course Management**: Create and manage multiple course sections
- **Student Records**: Add, view, and manage student information
- **Automated Grading**: Professional grading system with customizable weightage
- **Marks Management**: Bulk entry and individual student mark management
- **Professional UI**: Modern, responsive design with UMT branding
- **Real-time Updates**: Instant feedback and data synchronization

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd student-grading-system
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🔐 Demo Credentials

For testing purposes, use the following credentials (also shown as hints on the login page):

- **Email**: murtaza@gmail.com
- **Password**: Murtaza123

## 📱 Features Overview

### Dashboard
- Overview of all academic courses
- Quick statistics and insights
- Easy navigation to course sections

### Course Management
- Create new course sections
- View course details and student counts
- Professional course cards with hover effects

### Student Management
- Add new students with roll numbers
- View comprehensive student lists
- Delete student records with confirmation

### Grading System
- Automated grade calculation
- Customizable weightage for different components
- Professional grade display with color coding

### Marks Entry
- Bulk marks entry for multiple students
- Individual student mark management
- Real-time grade updates

## 🎨 Design System

The application uses a professional design system with:

- **Color Palette**: UMT brand colors with professional gradients
- **Typography**: Inter font family for optimal readability
- **Spacing**: Consistent spacing system using CSS custom properties
- **Components**: Reusable, modular components with consistent styling
- **Responsive Design**: Mobile-first approach with breakpoint optimization

## 🛠️ Technology Stack

- **Frontend**: React 18 with Vite
- **Styling**: CSS Modules with custom properties
- **Icons**: React Icons (Font Awesome)
- **Routing**: React Router v6
- **State Management**: React Hooks
- **Build Tool**: Vite

## 📁 Project Structure

```
src/
├── assets/          # Images and static assets
├── components/      # Reusable UI components
├── pages/          # Page components
├── services/       # API and data services
├── styles/         # Global styles and CSS modules
└── main.jsx        # Application entry point
```

## 🎯 Key Components

- **Header**: Navigation and branding
- **CourseCard**: Course display with hover effects
- **StudentList**: Professional student table with actions
- **AddStudentForm**: Form for adding new students
- **Dialogs**: Modal components for various operations

## 🔧 Customization

### Colors
The application uses CSS custom properties for easy color customization:

```css
:root {
  --primary-color: #1e3a8a;
  --primary-light: #3b82f6;
  --primary-dark: #1e40af;
  --accent-color: #059669;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --error-color: #ef4444;
}
```

### Styling
All components use CSS Modules for scoped styling and maintainability.

## 📱 Responsive Design

The application is fully responsive with breakpoints at:
- **Mobile**: 480px and below
- **Tablet**: 768px and below
- **Desktop**: 1024px and above

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is developed for UMT University and is proprietary software.

## 🏫 About UMT

University of Management and Technology (UMT) is a leading educational institution committed to providing quality education and innovative learning solutions.

---

**Developed with ❤️ for UMT University**

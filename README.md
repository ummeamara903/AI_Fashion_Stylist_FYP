# AI Fashion Stylist

## Overview

AI Fashion Stylist is a full-stack fashion recommendation platform that provides personalized outfit suggestions based on user preferences such as gender, season, occasion, dress type, and budget.

The system combines machine learning, a FastAPI backend, a PostgreSQL database, and a Next.js frontend to deliver customized fashion recommendations and trend exploration features.

This project was developed as a Final Year Project (FYP).

---

## Features

### Personalized Recommendations

Users can generate outfit recommendations by providing:

* Gender
* Season
* Occasion
* Dress Type (Eastern or Western)
* Budget

The recommendation engine suggests:

* Clothing items
* Shoes
* Accessories
* Color combinations

### Fashion Trends

Users can explore trending fashion styles and inspiration images through the Trends section.

### User Authentication

The platform includes secure authentication functionality:

* User Registration
* User Login
* Protected User Actions

### Save Recommendations

Authenticated users can save generated recommendations and access them later.

### Save Trend Images

Users can save fashion inspiration images and manage their saved collection.

### Responsive Design

The application is designed to work across desktop, tablet, and mobile devices.

---

## Technology Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* FastAPI
* Python

### Database

* PostgreSQL

### Machine Learning

* Python
* Pandas
* Scikit-learn

---

## Project Structure

AI_Fashion_Stylist_FYP/

├── fashionfrontend/

│   ├── Next.js Application

│   ├── Authentication UI

│   ├── Recommendation Pages

│   └── Trends Module

│

├── fashionbackend/

│   ├── FastAPI APIs

│   ├── Authentication

│   ├── Recommendation Services

│   └── Saved Data Management

│

└── fashionscience/

```
├── Data Processing

├── Recommendation Logic

└── Machine Learning Components
```

---

## Key Functionalities

### Recommendation Engine

The recommendation engine analyzes user preferences and generates personalized fashion suggestions using predefined fashion data and machine learning techniques.

### Saved Collections

Users can maintain personal collections of:

* Saved Recommendations
* Saved Fashion Images

### Trend Discovery

The Trends section helps users discover fashion inspiration and current styling ideas.

---

## Future Improvements

Potential future enhancements include:

* AI-powered image-based outfit recommendations
* Virtual try-on functionality
* Personalized recommendation history
* Advanced user profiling
* Fashion trend analytics
* Integration with e-commerce platforms

---

## Author

Umme Amara
BS Computer Science
Final Year Project
---

## License
This project is developed for educational and learning purposes.

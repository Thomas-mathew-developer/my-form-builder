# Dynamic Form Builder Application

A coding challenge project built with Angular, featuring a dynamic form builder with permission controls and mock API interactions.

## 📖 Overview

This application allows users to create, manage, and fill dynamic forms with various input types. It supports role-based authorization, form validation, and submission to a mock API.  

This repository was created as a part of a coding challenge. If any requirement wasn't fully implemented due to time constraints, my approach and reasoning are documented below.

---

## 🚀 Features

### 1️⃣ Form Builder Interface (Drag & Drop)
- Text Input (single-line & multi-line)
- Dropdown Select (with configurable options)
- Checkbox Groups
- Date Picker
- Radio Button Groups

**Each field includes configurable properties:**
- Field Label  
- Required/Optional Setting  
- Help Text  
- Validation Rules (min/max length, pattern, etc.)

---

### 2️⃣ Form Management
- List view of created form templates  
- Edit and update existing form templates  
- Preview mode to test forms before publishing  

---

### 3️⃣ Form Submission
- Form filling interface for end-users  
- Validation based on configured rules  
- Submit to a mock API (handled via an in-app mock service)  
- Success and error feedback  
- View submitted form data  

---

### 4️⃣ Authorization
- **Admin**: Can create, edit, delete form templates  
- **User**: Can view and fill out forms only  
- Role-based access control on all actions  
- Simple login screen with role selection  

---

## 🛠️ Technical Stack

- **Angular 20+**
- **TypeScript**
- **Reactive Forms**
- **Angular Material** for responsive UI components
- **RxJS**
- **Jasmine & Karma** for unit testing

---

## 🧪 Unit Tests

Unit tests written for:
- Form Builder Component
- Form Submission Component

To run tests:
```bash
ng test

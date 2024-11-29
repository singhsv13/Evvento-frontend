
# Evvento

Evvento is a feature-rich event management application developed using Angular. It enables users to explore, register for, and manage events with various functionalities such as authentication, event filtering, sorting, pagination, and more. The app is designed to offer a seamless user experience for both event organizers and attendees.

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Folder Structure](#folder-structure)
6. [Known Issues](#known-issues)
7. [Future Enhancements](#future-enhancements)

## Features

- **User Authentication**: Login and registration functionalities.
- **Event Registration and Unregistration**: Users can register or unregister from events.
- **Event Filtering and Sorting**: Filter and sort events by various criteria for ease of browsing.
- **Pagination**: Display a limited number of events per page in both the home and "My Events" components.
- **Event Editing**: Allows users to edit event details with pre-populated data when in edit mode.
- **Responsive UI**: Fully responsive UI designed for an optimized experience across devices.
- **Event Details**: Detailed view of each event with information fetched dynamically by ID.

## Tech Stack

- **Frontend**: Angular, Typescript
- **Styling**: Bootstrap

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/evvento.git
   cd evvento
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the app**:
   ```bash
   ng serve
   ```
   The app should now be running on `http://localhost:4200/`.

## Usage

1. **User Registration**: Users can register through the app's registration form.
2. **Login and Logout**: Login functionality updates the navbar, hiding the login button post-login and displaying a logout option. Logout redirects to the login form.
3. **Event Browsing**: Navigate to the home component to see a list of events with options for filtering, sorting, and pagination.
4. **Event Registration**: Select an event and register for it through the event details component. Registered events appear in the "My Events" section.
5. **Event Editing**: When editing an event, the form is pre-filled with current details, simplifying updates.
6. **Unregister Event**: Users can also unregister from events within the event details view.

## Folder Structure

```
src/
├── app/
│   ├── components/
│   │   ├── navbar/
│   │   ├── home/
│   │   ├── my-events/
│   │   ├── event-details/
│   │   ├── event-form/
│   ├── services/
│   │   ├── event.service.ts
│   │   ├── httpuser.service.ts
│   ├── models/
│   ├── guards/
│   ├── interceptors/
└── assets/
```

- **components**: Contains various components for different parts of the app (home, navbar, event form, etc.).
- **services**: Contains service files like `event.service.ts` for data management.
- **models**: Stores TypeScript interfaces and models for strong typing.
- **guards**: Contains route guards for authentication and authorization.
- **interceptors**: Includes HTTP interceptors for handling tokens and responses.

## Known Issues

- **Form Pre-filling Bug**: Occasionally, event details fail to prepopulate in the form during edit mode. Currently investigating code improvements to fix this without affecting other functionalities.

## Future Enhancements

- **Backend Integration**: Add a backend API for data persistence.
- **Advanced Filtering**: Add date range and location-based filters.
- **Email Notifications**: Send email notifications upon successful event registration.
- **Improved Search Functionality**: Implement fuzzy search for better event discovery.
- **Performance Optimization**: Add lazy loading for components and optimize data handling.

## Contributing

Contributions are welcome! Feel free to submit a pull request with enhancements or bug fixes.

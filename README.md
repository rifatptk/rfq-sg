# Source Global Admin

## About this product

Source Global is an employee tracking application using Express.js, React, Tailwind
CSS, and the Google Maps platform. The application allows administrators to add,
remove, update, and manage employees, as well as set and update geofences
for each employee. An administrator can see employees' real-time location. The
geofence feature enables the administrator to receive real-time notifications
whenever an employee enters or exits the designated area. Additionally, the
application notifies the administrator if an employee has not responded within a
certain time period. The administrator can also assign admin or manager
permissions to employees. Overall, the application streamlines employee
management and increases workplace safety by providing a simple and efficient
way to track employee location and activity.

## Getting started

Add Google Maps API key to the environment:

```javascript
REACT_APP_GMAPS_API_KEY=API_key_here
```

Add Backend API URL to the `./src/apiConfigs.js:

```javascript
export const BASE_URL = 'Backend API base URL here';
```

**Installing dependencies:**

If you are using yarn

```bash
yarn
```
If you are using npm

```bash
npm install
```

**Running development server:**

If you are using yarn

```bash
yarn dev
```
If you are using npm

```bash
npm run dev
```

**Building for production:**

If you are using yarn

```bash
yarn build
```
If you are using npm

```bash
npm run build
```

Thank you!

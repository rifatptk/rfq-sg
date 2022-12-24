/**
 * Shows notification using web Notification API. At first it checks if the browser supports Notification. If not it alerts user about that. Then it checks if notification permission is granted or not. If granted it shows the notification, if denied it asks for permission to show notification and then shows the notification.
 * @param {string} title - Title of the notification.
 * @param {object} options - Options of the notification.
 */

export function notify(
  title = 'New Notification!',
  options = { body: 'This is the notification message.' }
) {
  if (!('Notification' in window)) {
    // Check if the browser supports notifications
    alert('This browser does not support desktop notification');
  } else if (Notification.permission === 'granted') {
    // Check whether notification permissions have already been granted;
    // if so, create a notification
    new Notification(title, options);
    // …
  } else if (Notification.permission !== 'denied') {
    // We need to ask the user for permission
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === 'granted') {
        new Notification(title, options);
        // …
      }
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them anymore.
}

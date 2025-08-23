const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// This is a placeholder for a Cloud Function that sends a push notification
// when a new order is created.
//
// To deploy this function, you need to:
// 1. Set up the Firebase CLI: https://firebase.google.com/docs/cli
// 2. Initialize Firebase in your project directory: `firebase init functions`
// 3. Deploy the function: `firebase deploy --only functions`

exports.sendOrderNotification = functions.firestore
  .document('orders/{orderId}')
  .onCreate(async (snap, context) => {
    const order = snap.data();
    const userId = order.userId;

    // Get the user's FCM token from Firestore
    const userDoc = await admin.firestore().collection('users').doc(userId).get();
    const fcmToken = userDoc.data().fcmToken;

    if (fcmToken) {
      const payload = {
        notification: {
          title: 'Order Successful!',
          body: `Your order for ${order.itemName} has been placed.`,
        },
      };

      try {
        await admin.messaging().sendToDevice(fcmToken, payload);
        console.log('Notification sent successfully');
      } catch (error) {
        console.error('Error sending notification:', error);
      }
    }
  });
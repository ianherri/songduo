const functions = require('firebase-functions')

const admin = require('firebase-admin')

admin.initializeApp()

// sample endpoint at http://127.0.0.1:5001/songduo-5425e/us-central1/addMessage?text=sometext
// where text is query param
exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await admin
    .firestore()
    .collection('test-admin')
    .add({ original: original })
  // Send back a message that we've successfully written the message
  res.json({ result: `Message with ID: ${writeResult.id} added.` })
})

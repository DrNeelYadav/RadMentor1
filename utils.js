// =================================================================
// RadMentor Shared Utilities (utils.js)
// =================================================================

// --- Firebase Configuration (Shared) ---
const firebaseConfig = {
    apiKey: "AIzaSyD-OTIwv6P88eT2PCPJXiHgZEDgFV8ZcSw",
    authDomain: "radiology-mcqs.firebaseapp.com",
    projectId: "radiology-mcqs",
    storageBucket: "radiology-mcqs.appspot.com",
    messagingSenderId: "862300415358",
    appId: "1:862300415358:web:097d5e413f388e30587f2f",
    measurementId: "G-0V1SD1H95V"
};

// --- Initialize Firebase (if not already initialized) ---
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = firebase.firestore();

// --- Shared Utility Functions ---

/**
 * Initialize and replace Feather icons
 */
function initFeatherIcons() {
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}

/**
 * Show/hide loading state for buttons
 */
function setButtonLoading(button, isLoading, originalText = null) {
    if (isLoading) {
        button.disabled = true;
        button.dataset.originalText = button.textContent;
        button.textContent = 'Loading...';
    } else {
        button.disabled = false;
        button.textContent = originalText || button.dataset.originalText || button.textContent;
    }
}

/**
 * Show success/error messages
 */
function showMessage(elementId, message, type = 'error') {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.className = type === 'error' ? 'text-red-500 text-center mt-4 font-medium' : 'text-green-500 text-center mt-4 font-medium';
    }
}

/**
 * Clear message
 */
function clearMessage(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = '';
    }
}

/**
 * Log user activity to Firestore
 */
function logUserActivity(userEmail, action, details = {}) {
    return db.collection('activityLogs').add({
        userEmail: userEmail,
        action: action,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        details: details
    }).catch(error => console.error("Error logging activity:", error));
}

/**
 * Format timestamp for display
 */
function formatTimestamp(timestamp) {
    if (!timestamp) return 'N/A';
    return timestamp.toDate ? timestamp.toDate().toLocaleString() : new Date(timestamp).toLocaleString();
}

// Initialize Feather icons when DOM is loaded
document.addEventListener('DOMContentLoaded', initFeatherIcons);
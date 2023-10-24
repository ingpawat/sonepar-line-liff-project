import "./style.css";
import liff from "@line/liff";

// Elements
const body = document.getElementById("body");
const pictureUrl = document.getElementById("pictureUrl");
const userId = document.getElementById("userId");
const displayName = document.getElementById("displayName");
const statusMessage = document.getElementById("statusMessage");
const email = document.getElementById("email");
const btnShare = document.getElementById("btnShare");

// Main function
async function main() {
  await liff.init({ liffId: "2001229695-36dGgnnD" });

  // Check OS and set background color
  if (liff.getOS() === "android") {
    body.style.backgroundColor = "#888888";
  }

  // Check if LIFF is opened in the client
  if (liff.isInClient()) {
    getUserProfile();
  }
}

// Get user profile
async function getUserProfile() {
  const profile = await liff.getProfile();
  pictureUrl.src = profile.pictureUrl;
  userId.innerHTML = "<b>userId: </b>" + profile.userId;
  displayName.innerHTML = "<b>displayName: </b>" + profile.displayName;
  statusMessage.innerHTML = "<b>statusMessage: </b>" + profile.statusMessage;
  email.innerHTML = "<b>email: </b>" + liff.getDecodedIDToken().email;
}

// Share a message
async function shareMsg() {
  const result = await liff.shareTargetPicker([
    {
      type: "text",
      text: "This message was shared by LIFF",
    }
  ]);

  if (result) {
    alert("Message was shared!");
  } else {
    alert("ShareTargetPicker was cancelled by the user");
  }
}

// Initialize LIFF and call the main function
liff.ready.then(main);

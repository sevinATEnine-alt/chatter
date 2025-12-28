// ======================
// Service Worker
// ======================
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js")
    .then(() => console.log("Service Worker registered"))
    .catch(err => console.error("SW registration failed:", err));
}

if ("Notification" in window) {
  if (Notification.permission === "default") {
    Notification.requestPermission().then(permission => {
      console.log("Notification permission:", permission);
    });
  }
}

function showNotification(title, body) {
  if (Notification.permission === "granted") {
    new Notification(title, {
      body: body,
      icon: "icon-192.png", // optional, shows small icon
    });
  }
}

function beep() {
    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
    snd.play();
}

// ======================
// Variables
// ======================
let conn;
let peer;
let currentPeerId = null;
let myDisplayName = localStorage.getItem("myDisplayName") || "";
let typingTimeout;
const chatDiv = document.getElementById("chat");
const typingIndicator = document.getElementById("typingIndicator");
const peerIdSpan = document.getElementById("peerId");
const displayNameSpan = document.getElementById("displayName");
const peerIdInputField = document.getElementById("myPeerInput");
const nameInputField = document.getElementById("myNameInput");
const peerIdSetDiv = document.getElementById("peerIdSet");
const peerIdDisplayDiv = document.getElementById("peerIdDisplay");
const peerControlsDiv = document.getElementById("peerControls");
const knownPeersListEl = document.getElementById("knownPeersList");
const peerInput = document.getElementById("peerIdInput");
const statusDiv = document.getElementById("status");

var msgInput = document.getElementById("msgInput");
var sendBtn = document.getElementById("sendBtn");

const disconnectBtn = document.getElementById("disconnectBtn");

// ======================
// Disable input initially
// ======================
// msgInput.disabled = true;
// sendBtn.disabled = true;

// ======================
// Enable/disable input
// ======================
function setConnected(isConnected) {
}

// ======================
// Disconnect button
// ======================
disconnectBtn.onclick = () => {
  if (!conn) return alert("No active connection to disconnect.");
  conn.close();
  conn = null;
  currentPeerId = null;
  statusDiv.textContent = "Not connected";
  setConnected(false);
  addMessage("You disconnected from peer.");
};

// ======================
// Load Peer ID
// ======================
let myPeerId = localStorage.getItem("myPeerId") || "";
if (myPeerId && myDisplayName) {
  initializePeer(myPeerId, myDisplayName);
}

// ======================
// Load known peers
// ======================
let knownPeers = JSON.parse(localStorage.getItem("knownPeers") || "[]");
function updateKnownPeersList() {
  knownPeersListEl.innerHTML = "";
  knownPeers.forEach(p => {
    const li = document.createElement("li");
    li.textContent = p;
    const connectBtn = document.createElement("button");
    connectBtn.textContent = "Connect";
    connectBtn.onclick = () => connectToPeer(p);

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.onclick = () => {
      knownPeers = knownPeers.filter(x => x !== p);
      localStorage.setItem("knownPeers", JSON.stringify(knownPeers));
      updateKnownPeersList();
    };

    li.appendChild(connectBtn);
    li.appendChild(removeBtn);
    knownPeersListEl.appendChild(li);
  });
}
updateKnownPeersList();

// ======================
// Set Peer ID button
// ======================
document.getElementById("setPeerBtn").onclick = () => {
  const id = peerIdInputField.value.trim();
  const name = nameInputField.value.trim();
  if (!id || !name) return alert("Enter a Peer ID and display name!");
  initializePeer(id, name);
};

// Edit Peer ID button
document.getElementById("editPeerBtn").onclick = () => {
  peerIdSetDiv.style.display = "block";
  peerIdDisplayDiv.style.display = "none";
  if (peer) peer.destroy();
};

// Add new peer manually
document.getElementById("addPeerBtn").onclick = () => {
  const newPeer = peerInput.value.trim();
  if (!newPeer) return alert("Enter a peer ID to add!");
  if (!knownPeers.includes(newPeer)) {
    knownPeers.push(newPeer);
    localStorage.setItem("knownPeers", JSON.stringify(knownPeers));
    updateKnownPeersList();
    peerInput.value = "";
  } else {
    alert("Peer ID already saved!");
  }
};

// Connect button
document.getElementById("connectBtn").onclick = () => {
  const id = peerInput.value.trim();
  if (!id) return alert("Enter a peer ID to connect!");
  connectToPeer(id);
};

// ======================
// Initialize PeerJS
// ======================
function initializePeer(id, displayName) {
  myPeerId = id;
  myDisplayName = displayName;
  localStorage.setItem("myPeerId", id);
  localStorage.setItem("myDisplayName", displayName);

  peer = new Peer(id);

  peer.on("open", id => {
    peerIdSpan.textContent = id;
    displayNameSpan.textContent = " (" + displayName + ")";
    peerIdSetDiv.style.display = "none";
    peerIdDisplayDiv.style.display = "block";
    peerControlsDiv.style.display = "block";
    statusDiv.textContent = "Not connected";
    console.log("My Peer ID:", id);
  });

  peer.on("connection", connection => {
    conn = connection;
    currentPeerId = conn.peer;

    // Notify when someone else connects
    addMessage(`${conn.peer} has connected to you`);
    statusDiv.textContent = "Connected to " + conn.peer;

    setupConnection(conn);
  });
}

// ======================
// Connect to peer
// ======================
function connectToPeer(remoteId) {
  if (!peer) return alert("Set your Peer ID first!");
  if (!remoteId) return alert("Enter a peer ID!");

  conn = peer.connect(remoteId);
  currentPeerId = remoteId;

  conn.on("open", () => {
    addMessage(`Connected to ${remoteId}`);
    statusDiv.textContent = "Connected to " + remoteId;
    setConnected(true);

    if (!knownPeers.includes(remoteId)) {
      knownPeers.push(remoteId);
      localStorage.setItem("knownPeers", JSON.stringify(knownPeers));
      updateKnownPeersList();
    }
  });

  conn.on("close", () => {
    setConnected(false);
    addMessage(`Disconnected from ${remoteId}`);
    statusDiv.textContent = "Not connected";
  });

  setupConnection(conn);
}

// ======================
// Setup connection
// ======================
function setupConnection(connection) {
  connection.on("data", data => {
    if (data.type === "message") {
      addMessage(`${data.name}: ${data.message}`);
      showNotification(`${data.name}`, data.message);
      beep();
    } else if (data.type === "typing") {
      showTypingIndicator(data.name);
    } else if (data.type === "status") {
      addMessage(data.text);
      beep();
    }
  });

  connection.on("close", () => {
    addMessage(`Disconnected from ${connection.peer}`);
    statusDiv.textContent = "Not connected";
  });

  connection.on("error", err => console.error("Peer connection error:", err));
}

// ======================
// Send messages
// ======================

sendBtn.onclick = sendMessage;
msgInput.addEventListener("keypress", e => { if (e.key === "Enter") sendMessage(); });

// Typing detection
msgInput.addEventListener("input", () => {
  if (conn && conn.open) {
    conn.send({ type: "typing", name: myDisplayName });
  }
});


// ======================
// Typing indicator
// ======================
function showTypingIndicator(name) {
  typingIndicator.textContent = `${name} is typing...`;
  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    typingIndicator.textContent = "";
  }, 1500);
}

function clearTypingIndicator() {
  typingIndicator.textContent = "";
}

// ======================
// Load saved messages
// ======================
let messages = JSON.parse(localStorage.getItem("messages") || "[]");
messages.forEach(msg => addMessage(msg, false));

// ======================
// Add message
// ======================
function addMessage(msg, save = true) {
  const p = document.createElement("p");
  p.textContent = msg;
  chatDiv.appendChild(p);
  chatDiv.scrollTop = chatDiv.scrollHeight;

  if (save) {
    messages.push(msg);
    localStorage.setItem("messages", JSON.stringify(messages));
  }
}

// ======================
// Clear messages
// ======================
document.getElementById("clearMessagesBtn").onclick = () => {
  if (!confirm("Are you sure you want to clear all messages?")) return;
  messages = [];
  localStorage.removeItem("messages");
  chatDiv.innerHTML = "";
};

// ======================
// Send messages
// ======================
function sendMessage() {
  const msg = msgInput.value.trim();
  if (!msg) return;

  addMessage(`${myDisplayName}: ${msg}`);

  if (conn && conn.open) {
    conn.send({ type: "message", name: myDisplayName, message: msg });
  }

  msgInput.value = "";
  clearTypingIndicator();
}


const installBtn = document.getElementById("installBtn");
let deferredPrompt;

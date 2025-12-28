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
    } else if (data.type === "typing") {
      showTypingIndicator(data.name);
    } else if (data.type === "status") {
      addMessage(data.text);
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

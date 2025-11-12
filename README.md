🧠 React Flow Diagram Builder

A visual node-based diagram builder built with React.js and React Flow, allowing users to create, connect, edit, and export diagrams as PDF or JSON files.
This project supports real-time editing, custom nodes, and responsive UI for both desktop and mobile.

🚀 Live Features

✅ Create and connect nodes easily
✅ Edit node labels directly
✅ Delete nodes dynamically
✅ Save diagram as PDF
✅ Export diagram data as JSON
✅ Load sample diagram
✅ Responsive layout for mobile screens
✅ Fully modular and extendable architecture

📂 Project Structure
react-flow-diagram/
│
├── public/
│   ├── index.html
│   └── favicon.ico
│
├── src/
│   ├── components/
│   │   ├── DiagramCanvas.jsx      # React Flow canvas logic (nodes, edges, PDF, JSON)
│   │   ├── Sidebar.jsx            # UI for node management and settings
│   │   └── Navbar.jsx             # Top navigation bar
│   │
│   ├── context/
│   │   └── DiagramContext.jsx     # Manages global state for nodes/edges
│   │
│   ├── pages/
│   │   └── EditorPage.jsx         # Main page (Canvas + Sidebar responsive layout)
│   │
│   ├── App.js                     # Root app component with routes
│   ├── index.js                   # React entry point
│   ├── styles.css                 # Optional global styles
│   └── utils/
│       └── sampleData.js          # Predefined diagram sample
│
├── .gitignore
├── package.json
├── README.md
└── yarn.lock / package-lock.json


⚙️ Tech Stack
Tool	Purpose
React.js	Frontend framework
React Flow	Diagram visualization
html2canvas	Convert diagram to image for PDF
jsPDF	Export diagram as PDF
Context API	Global state management
CSS Flexbox	Layout and responsiveness
🧩 Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/ramesh-46/react-flow-diagram.git
cd react-flow-diagram

2️⃣ Install Dependencies
npm install

3️⃣ Start the Development Server
npm start


Then open 👉 http://localhost:3000

🧱 Usage Guide
➕ Add a Node

Go to the Sidebar → "Add Node", set a Label, and click Add.

🔗 Connect Nodes

Click and drag between nodes to create an edge (arrow connection).

🖊️ Edit Node

Click a node → Edit (✏️) button → type new label → press OK.

❌ Delete Node

Click a node → Delete (🗑️) button → removes it instantly.

📄 Export Diagram

PDF Export: Click “Download Diagram as PDF”

JSON Export: Click “Download Node Data as JSON”

🧩 Load Sample Data

Click “Load Sample” in the top toolbar to load demo nodes and edges.

📱 Responsive Design

On desktop → Sidebar appears to the right of the canvas.

On mobile (<768px) → Sidebar moves below the canvas.

Canvas and controls auto-resize to fit screen width.

🧠 Future Enhancements

🔁 Drag-and-drop node types in Sidebar

💾 Save diagrams in browser localStorage

🌐 Share diagrams online (via links)

🎨 Custom node colors and icons

🧩 Edge label editing

📸 Preview

(Add a screenshot of your diagram once built)

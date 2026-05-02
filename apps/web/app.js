require.config({ paths:{ vs:"https://unpkg.com/monaco-editor/min/vs"} });

require(["vs/editor/editor.main"], ()=>{
  window.editor = monaco.editor.create(
    document.getElementById("editor"),
    {
      value: "// Welcome to CodeXHub",
      language: "javascript",
      theme: "vs-dark"
    }
  );
});

// Terminal
const ws = new WebSocket("ws://localhost:5000");
ws.onmessage = e => console.log(e.data);

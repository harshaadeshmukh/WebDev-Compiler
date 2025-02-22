import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CompilerSliceStateType {
  fullCode: {
    html: string;
    css: string;
    javascript: string;
  },

  currentLanguage: "html" | "css" | "javascript";
  //  currentCode: string
}

const initialState: CompilerSliceStateType = {
  fullCode: {
    html:
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>Hello, World!</h1>
    <p>This is a basic HTML, CSS, and JS template.</p>

    <button id="clickMeBtn">Click Me</button>
  </div>

  <script src="script.js"></script>
</body>
</html>
     `,
    css:
      `/* General Styles */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #D4F6FF;
  color: #333;
}

.container {
  text-align: center;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

h1 {
  font-size: 2rem;
  color: #007bff;
  margin-bottom: 10px;
}

p {
  font-size: 1rem;
  margin-bottom: 20px;
}

button {
  background-color: #007bff;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background-color: #0056b3;
}
        `,
    javascript:
      `// Select the button
const button = document.getElementById("clickMeBtn");

// Add a click event listener
button.addEventListener("click", () => {
  // Show an alert message when the button is clicked
  alert("You clicked the button!");
});        `,
  },
  currentLanguage: "html",
  //   currentCode: ""

}
const compilerSlice = createSlice({
  name: "compilerSlice",
  initialState,
  reducers: {
    updateCurrentLanguage: (state, action: PayloadAction<CompilerSliceStateType["currentLanguage"]>) => {
      state.currentLanguage = action.payload;
    },
    // updateHTML: (state, action: PayloadAction<string>) => {
    //     state.fullCode.html = action.payload;
    // },
    // updateCSS: (state, action: PayloadAction<string>) => {
    //     state.fullCode.css = action.payload;
    // },
    // updateJS: (state, action: PayloadAction<string>) => {
    //     state.fullCode.javascript = action.payload;
    // },

    updateCodeValue: (state, action: PayloadAction<string>) => {

      state.fullCode[state.currentLanguage] = action.payload;
    },
    updateFullCode: (state, action: PayloadAction<CompilerSliceStateType["fullCode"]>) => {
      state.fullCode = action.payload;
    },

  },
})

export default compilerSlice.reducer;
export const { updateCurrentLanguage, updateCodeValue,updateFullCode } = compilerSlice.actions;
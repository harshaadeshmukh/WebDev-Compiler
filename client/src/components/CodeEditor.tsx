import React from "react";
import ReactCodeMirror from "@uiw/react-codemirror";

import { tags as t } from "@lezer/highlight";

import { draculaInit } from "@uiw/codemirror-theme-dracula";

import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { updateCodeValue } from "@/redux/slices/compilerSlice";

export default function CodeEditor() {
  // console.log("langNames:", langNames); // => "jsx" | "typescript" | "javascript" | "tsx"

  const currentLangauge = useSelector(
    (state: RootState) => state.compilerSlice.currentLanguage
  );
  // const htmlcode = useSelector((state: RootState) => state.compilerSlice.html);
  // const csscode = useSelector((state: RootState) => state.compilerSlice.css);
  // const javascriptcode = useSelector(
  //   (state: RootState) => state.compilerSlice.javascript
  // );

  const fullCode = useSelector(
    (state: RootState) => state.compilerSlice.fullCode
  );

  const dispatch = useDispatch();
  //const [value, setValue] = React.useState("");

  const onChange = React.useCallback(
    (value: string) => dispatch(updateCodeValue(value)),
    []
  );
  return (
    <ReactCodeMirror
      value={fullCode[currentLangauge]}
      height="calc(100vh - 60px - 50px)"
      className=" code-editor"
      extensions={[loadLanguage(currentLangauge)!]}
      onChange={onChange}
      theme={draculaInit({
        settings: {
          caret: "#c6c6c6",
          fontFamily: "monospace",
        },
        styles: [{ tag: t.comment, color: "#6272a4" }],
      })}
    />
  );
}

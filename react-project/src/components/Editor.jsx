import React, { useState } from 'react';
import CodeMirror from "@uiw/react-codemirror";
import { StreamLanguage } from "@codemirror/language";

import bitwise_add from './bitwise-add.txt';
import dutch from './dutch.txt';
import loopyfactorial from './loopyfactorial.txt';
import mul from './mul.txt';
import power from './power.txt';

const dafnyArray = [];

fetch(bitwise_add)
  .then(b => b.text())
  .then(text => {
    dafnyArray.push(text);
  });

fetch(dutch)
  .then(d => d.text())
  .then(text => {
    dafnyArray.push(text);
  });

fetch(loopyfactorial)
  .then(l => l.text())
  .then(text => {
    dafnyArray.push(text);
  });

fetch(mul)
  .then(mul => mul.text())
  .then(text => {
    dafnyArray.push(text);
  });

fetch(power)
  .then(p => p.text())
  .then(text => {
    dafnyArray.push(text);
  });

export default function Editor() {
    return (
     <CodeMirror
      value={dafnyArray[Math.floor(Math.random() * 5)]}
      height="200px"
      readOnly={false}
      onChange={(value, viewUpdate) => {
      }}
    />
  );
}
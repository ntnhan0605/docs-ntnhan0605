const muiColors = require('@mui/material/colors');
const fs = require('fs');

const { common, ...colors } = muiColors;

let cssTheme = '@theme {\n';
Object.keys(colors).map((k) => {
  const color = k;
  const colorsByName = colors[color];
  Object.keys(colorsByName).map((n) => {
    const number = n;
    const colorValue = colorsByName[number];
    cssTheme += `\t--color-${color}-${number}: ${colorValue};\n`;
  });
});
cssTheme += '}';

fs.writeFileSync('./app/tailwind.css', cssTheme);

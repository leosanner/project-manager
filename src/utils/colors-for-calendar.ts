import colors from "tailwindcss/colors";

const colorOptions = [
  colors.red,
  colors.orange,
  colors.amber,
  colors.yellow,
  colors.lime,
  colors.green,
  colors.emerald,
  colors.teal,
  colors.cyan,
  colors.sky,
  colors.blue,
  colors.indigo,
  colors.violet,
  colors.purple,
  colors.fuchsia,
  colors.pink,
  colors.rose,
];

const colorShades = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"] as const;

export function getRandomColor() {
  const randomLight = colorShades[Math.floor(Math.random() * colorShades.length)];
  const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];

  return color[randomLight] ?? colors.cyan[500];
}

const projectPalette = [
  colors.cyan[500],
  colors.blue[500],
  colors.violet[500],
  colors.pink[500],
  colors.emerald[500],
  colors.orange[500],
  colors.lime[500],
  colors.fuchsia[500],
  colors.sky[500],
  colors.indigo[500],
  colors.teal[500],
  colors.rose[500],
];

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getProjectColor(projectId: string) {
  const index = hashString(projectId) % projectPalette.length;
  return projectPalette[index] ?? colors.cyan[500];
}

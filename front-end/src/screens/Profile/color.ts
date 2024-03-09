export const theme = (theme: "dark" | "light") => {
  return theme == "dark" ? { ...darkTheme } : { ...lightTheme };
};

const lightTheme = {
  backgroundColor: "bg-white",
  textColor: "text-black",
  primary: "bg-blue-500 text-white",
  secondary: "bg-yellow-300 text-black",
  btnColor: "black",
  btnTextColor: "text-white",
  iconColor: "black",
};

const darkTheme = {
  backgroundColor: "bg-black",
  textColor: "text-white",
  primary: "bg-blue-800 text-white",
  secondary: "bg-yellow-500 text-black",
  btnColor: "white",
  btnTextColor: "text-black",
  iconColor: "white",
};

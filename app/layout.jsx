import "./globals.css";
import { Appwrapper } from "./context/Index";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Appwrapper>
          {children}
        </Appwrapper>
      </body>
    </html>
  );
}


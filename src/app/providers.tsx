"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";
import { SidebarProvider } from "@/components/Layouts/sidebar/sidebar-context";
import { store } from "./store/store";


interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" attribute="class">
        <SidebarProvider>
          {children}
        </SidebarProvider>
      </ThemeProvider>
    </Provider>
  );
}


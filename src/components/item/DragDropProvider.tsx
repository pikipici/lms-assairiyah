"use client";
import { FC } from "react";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import ProgressLoading from "./ProgressLoading";

// import WatchlistLoading from "@/app/(site)/watchlist/loading";

interface DragDropProviderProps {
  children: React.ReactNode;
}

const DragDropProvider: FC<DragDropProviderProps> = ({ children }) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [loading, setLoading] = useState(true);

  const getBackend = () => {
    const html5Backend = HTML5Backend;
    const touchBackend = TouchBackend;

    return isTouchDevice ? touchBackend : html5Backend;
  };

  const backend = getBackend();

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    setIsTouchDevice(isTouchDevice);
    setLoading(false);
  }, []);

  if (loading) return <ProgressLoading />;

  return <DndProvider backend={backend}>{children}</DndProvider>;
};

export default DragDropProvider;

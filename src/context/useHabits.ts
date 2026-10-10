import { createContext, useContext } from "react";

type Habit = {
  id: string;
  name: string;
  completions: Date[];
};

type Context = {
  habits: Habit[];
  addHabit: (name: string) => void;
  deleteHabit: (id: string) => void;
  toggleDate: (id: string, date: Date) => void;
};

export const HabitContext = createContext<null | Context>(null);

export const useHabit = () => {
  const habitContext = useContext(HabitContext);

  if (!habitContext) throw new Error("No Context");
  return habitContext;
};

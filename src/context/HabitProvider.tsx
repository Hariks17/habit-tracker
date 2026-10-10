import { isSameDay } from "date-fns";
import { type ReactNode } from "react";
import type { Habit } from "../Components/HabitList";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { HabitContext } from "./useHabits";

export const HabitProvider = ({ children }: { children: ReactNode }) => {
  const [habits, setHabits] = useLocalStorage<Habit[]>("Habits", []);

  const addHabit = (name: string) => {
    // const temp: Habit[] = [...habits];
    // temp.push({ id: crypto.randomUUID(), name });
    // setHabits(temp);

    setHabits((curr) => [
      ...curr,
      { id: crypto.randomUUID(), name, completions: [new Date()] },
    ]);
  };

  const deleteHabit = (id: string) => {
    // var temp: Habit[] = habits;

    // temp = temp.filter((habit) => habit.id != id);

    // setHabits(temp);

    setHabits((curr) => curr.filter((habit) => habit.id != id));
  };

  const toggleDate = (id: string, date: Date) => {
    setHabits((curr) =>
      curr.map((h) => {
        if (h.id != id) return h;

        const alreadyDone = h.completions.some((c) => isSameDay(c, date));

        const completions = alreadyDone
          ? h.completions.filter((c) => !isSameDay(c, date))
          : [...h.completions, date];

        return { ...h, completions };
      })
    );
  };

  return (
    <HabitContext value={{ habits, addHabit, deleteHabit, toggleDate }}>
      {children}
    </HabitContext>
  );
};

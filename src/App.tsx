import { useState } from "react";
import HabitForm from "./Components/HabitForm";
import HabitList from "./Components/HabitList";
import Header from "./Components/Header";
import { HabitProvider } from "./context/HabitProvider";
import { addWeeks, eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";
const App = () => {
  const [weekOffset, setWeekOffSet] = useState(0);

  const week = addWeeks(new Date(), weekOffset);

  const visibleDates = eachDayOfInterval({
    start: startOfWeek(week, { weekStartsOn: 1 }),
    end: endOfWeek(week, { weekStartsOn: 1 }),
  });

  const prev = () => {
    setWeekOffSet((curr) => curr - 1);
  };

  const next = () => {
    setWeekOffSet((curr) => curr + 1);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
      <HabitProvider>
        <Header visibleDates={visibleDates} prev={prev} next={next} />
        <HabitForm />
        <HabitList visibleDates={visibleDates} />
      </HabitProvider>
    </div>
  );
};

export default App;

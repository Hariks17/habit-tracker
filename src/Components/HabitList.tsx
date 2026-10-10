import {
  eachDayOfInterval,
  endOfWeek,
  format,
  isFuture,
  isSameDay,
  startOfWeek,
  subDays,
} from "date-fns";
import Button from "./Button";
import { useHabit } from "../context/useHabits";

export type Habit = {
  id: string;
  name: string;
  completions: Date[];
};

type HabitListProp = {
  habits: Habit[];
};

const HabitList = ({ visibleDates }) => {
  const { habits } = useHabit();

  if (habits.length == 0) {
    return (
      <p className="text-center text-zinc-500 py-12">
        No Habits yet. Add one above to get started!
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {habits.map((habit) => (
        <HabitItem habit={habit} visibleDates={visibleDates} />
      ))}
    </div>
  );
};

type HabitItemProp = {
  habit: Habit;
  visibleDates: Date[];
};

const getStreak = (completions: Date[]) => {
  let streak = 0;

  let date = new Date();

  while (completions.some((d) => isSameDay(d, date))) {
    streak++;
    date = subDays(date, 1);
  }

  return streak;
};

function HabitItem({ habit, visibleDates }: HabitItemProp) {
  const { deleteHabit, toggleDate } = useHabit();

  const streak = getStreak(habit.completions);
  return (
    <div className="bg-zinc-800 p-4 rounded-xl flex flex-col gap-3">
      <div key={habit.id} className="flex items-center justify-between ">
        <div className="flex gap-3 items-center">
          <span className="font-medium">{habit.name}</span>

          {streak !== 0 && (
            <span className="text-sm text-amber-400">🔥 {streak}</span>
          )}
        </div>

        <Button
          className="text-sm"
          variant="ghost-destructive"
          onClick={() => deleteHabit(habit.id)}
        >
          Delete
        </Button>
      </div>
      <div className="flex gap-1.5">
        {visibleDates.map((date) => (
          <Button
            key={date.toISOString()}
            className="flex flex-1 flex-col items-center gap-0.5 rounded-lg text-xs"
            onClick={() => toggleDate(habit.id, date)}
            disabled={isFuture(date)}
            variant={
              habit.completions.some((d) => isSameDay(date, d))
                ? "primary"
                : "secondary"
            }
          >
            <span className="font-medium">{format(date, "EEE")}</span>
            <span>{format(date, "d")}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}

export default HabitList;

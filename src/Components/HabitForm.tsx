import { useState, type SubmitEvent } from "react";
import Button from "./Button";
import { useHabit } from "../context/useHabits";

const HabitForm = () => {
  const [name, setName] = useState("");

  const { addHabit } = useHabit();

  function handleSubmit(event: SubmitEvent): void {
    event.preventDefault();
    addHabit(name);
    setName("");
  }

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        className="flex-1 rounded-lg bg-zinc-800 px-4 py-2 outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
        placeholder="New habit..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button
        disabled={name.trim() === ""}
        className="rounded-lg px-4 py-2 font-medium"
      >
        Add Habit
      </Button>
    </form>
  );
};

export default HabitForm;

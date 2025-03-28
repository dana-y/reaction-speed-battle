import { Button, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";

interface PlayProps {
  playerNum: number;
  playerKeyMap: Record<number, string>;
}

const Play = ({ playerNum, playerKeyMap }: PlayProps) => {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const startTime = useRef<number>(0);

  const [result, setResult] = useState<Record<number, number>>({});
  const [background, setBackground] = useState("tomato");
  const [changedTime, setChangedTime] = useState(
    Math.floor(Math.random() * 5) + 1
  ); // Example time in seconds
  const isDone = Object.values(result).length === playerNum;

  useEffect(() => {
    timer.current = setTimeout(() => {
      setBackground((prev) => (prev === "tomato" ? "teal" : "tomato"));
      startTime.current = Date.now();
    }, changedTime * 1000);

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [changedTime, isDone]); // Add `background` to the dependency array

  useEffect(() => {
    if (isDone && timer.current) {
      clearTimeout(timer.current);
    }
  }, [isDone]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isDone) return;

      const playerIndex = Number(
        Object.keys(playerKeyMap).find((key) => playerKeyMap[key] === e.key)
      );

      if (playerIndex !== undefined && playerKeyMap[playerIndex] !== 0) {
        if (background === "tomato") {
          setResult((prev) => ({ ...prev, [playerIndex]: 0 }));
        } else {
          setResult((prev) => ({
            ...prev,
            [playerIndex]: Date.now() - startTime.current,
          }));
        }
      }
    },
    [background, isDone, playerKeyMap]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <Stack height="100%" gap={5}>
      <Stack flexDirection="row" justifyContent="space-between">
        <Typography variant="h4" color="textPrimary">
          {isDone
            ? "Congratulations! You've completed the game!"
            : "Press your key when background color is changed 👇"}
        </Typography>
        {isDone && (
          <Button
            variant="contained"
            onClick={() => {
              setResult({});
              setBackground("tomato");
              setChangedTime(Math.floor(Math.random() * 5) + 1);
            }}
          >
            Play Again
          </Button>
        )}
      </Stack>
      <Stack display="grid" flexGrow={1} gridTemplateColumns="1fr 1fr" gap={2}>
        {Array.from({ length: playerNum }).map((_, index) => (
          <Stack
            key={index}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: background,
              padding: 3,
              borderRadius: 2,
            }}
          >
            <Typography variant="h5" color="textSecondary">
              Player {index + 1}
            </Typography>
            <Typography variant="h4" color="textPrimary">
              selected key: {playerKeyMap[index]}
            </Typography>
            {isDone && (
              <Typography variant="h4" fontWeight="bold" color="textPrimary">
                {getResult(result[index])}
              </Typography>
            )}
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

const getResult = (result: number) => {
  if (result === 0) {
    return "Failed! Try again!";
  }

  return `${result / 1000} seconds`;
};

export default Play;

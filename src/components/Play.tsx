import { Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";

interface PlayProps {
  playerNum: number;
  playerKeyMap: Record<number, string>;
}

const Play = ({ playerNum, playerKeyMap }: PlayProps) => {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [background, setBackground] = useState<string>("tomato");
  const [result, setResult] = useState<Record<number, number>>({});

  const isDone = Object.values(result).length === playerNum;

  const startTime = useRef<number>(0);

  const changedTime = Math.floor(Math.random() * 5) + 1;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const playerIndex = Number(
        Object.keys(playerKeyMap).find((key) => playerKeyMap[key] === e.key)
      );

      console.log(playerIndex);

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
    [background, playerKeyMap]
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
                {result[index] / 1000} seconds
              </Typography>
            )}
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default Play;

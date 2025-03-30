import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface SelectKeyProps {
  playerNum: number;
  playerKeyMap: Record<number, string>;
  updatePlayerKeyMap: React.Dispatch<
    React.SetStateAction<Record<number, string>>
  >;
  updateStep: React.Dispatch<React.SetStateAction<number>>;
}

const SelectKey = ({
  playerNum,
  playerKeyMap,
  updatePlayerKeyMap,
  updateStep,
}: SelectKeyProps) => {
  const [selectingPlayer, setSelectingPlayer] = useState<null | number>(0);
  const isDone = Object.keys(playerKeyMap).length === playerNum;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isDone) return;

      if (selectingPlayer !== null && event.key) {
        updatePlayerKeyMap((prev) => ({
          ...prev,
          [selectingPlayer]: event.key,
        }));

        // 다음 플레이어 설정
        const nextPlayer = selectingPlayer + 1;
        if (nextPlayer < playerNum) {
          setSelectingPlayer(nextPlayer);
        } else {
          setSelectingPlayer(null);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDone, playerNum, selectingPlayer, updatePlayerKeyMap]);

  return (
    <Stack height="100%" gap={5}>
      <Stack flexDirection="row" justifyContent="space-between">
        <Typography variant="h4" color="textPrimary">
          Select your key
        </Typography>
        {isDone ? (
          <Button
            variant="contained"
            size="large"
            onClick={() => updateStep((prev) => prev + 1)}
          >
            Start !
          </Button>
        ) : null}
      </Stack>
      <Stack display="grid" flexGrow={1} gridTemplateColumns="1fr 1fr" gap={2}>
        {Array.from({ length: playerNum }).map((_, index) => (
          <Stack
            key={index}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "tomato",
              padding: 3,
              borderRadius: 4,
              opacity: selectingPlayer === index ? 1 : 0.5,
            }}
          >
            <Typography variant="h4" color="textPrimary">
              Player {index + 1}
            </Typography>
            <Typography variant="h4" color="textPrimary">
              selected key: {playerKeyMap[index]}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default SelectKey;

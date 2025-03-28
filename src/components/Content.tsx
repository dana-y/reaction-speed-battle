import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import SelectKey from "./SelectKey";

const Content = () => {
  const [step, setStep] = useState<number>(0);
  const [playerNum, setPlayerNum] = useState<number>(1);

  const isDisabled = playerNum < 1 || playerNum > 4;

  switch (step) {
    case 0:
      return (
        <Stack gap={2}>
          <Typography variant="h4" color="primary">
            How fast can you react?
          </Typography>
          <TextField
            label="Player Number"
            type="number"
            value={playerNum}
            onChange={(e) => setPlayerNum(Number(e.target.value))}
            error={isDisabled}
            helperText={
              isDisabled ? "Please enter a number between 1 and 4" : ""
            }
          />
          <span>
            <Button
              disabled={isDisabled}
              size="large"
              variant="contained"
              onClick={() => setStep(1)}
            >
              START
            </Button>
          </span>
        </Stack>
      );
    case 1:
      return <SelectKey playerNum={playerNum} />;
    case 2:
      return <div>Content</div>;
  }
};

export default Content;

import React from "react";
import { Box, Card, CardContent, Skeleton } from "@mui/material";
import { UI_CONFIG, LAYOUT } from "../../constants";
import { skeletonAnimation } from "../../utils/animations";

interface LoadingSkeletonProps {
  variant?: "card" | "table" | "form";
  count?: number;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant = "card",
  count = 6,
}) => {
  if (variant === "card") {
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fill, minmax(${LAYOUT.GRID.MIN_CARD_WIDTH}px, 1fr))`,
          gap: LAYOUT.GRID.GAP,
        }}
      >
        {Array.from({ length: count }).map((_, index) => (
          <Card
            key={index}
            sx={{
              height: 280,
              borderRadius: UI_CONFIG.THEME.BORDER_RADIUS.MEDIUM,
            }}
          >
            <CardContent>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Skeleton
                  variant="text"
                  width="70%"
                  height={32}
                  sx={skeletonAnimation}
                />
                <Skeleton
                  variant="rectangular"
                  width={60}
                  height={24}
                  sx={{
                    borderRadius: UI_CONFIG.THEME.BORDER_RADIUS.SMALL,
                    ...skeletonAnimation,
                  }}
                />
              </Box>
              <Skeleton
                variant="text"
                width="100%"
                height={20}
                sx={skeletonAnimation}
              />
              <Skeleton
                variant="text"
                width="90%"
                height={20}
                sx={skeletonAnimation}
              />
              <Skeleton
                variant="text"
                width="80%"
                height={20}
                sx={skeletonAnimation}
              />
              <Box sx={{ display: "flex", gap: 1, mt: 3 }}>
                <Skeleton
                  variant="circular"
                  width={40}
                  height={40}
                  sx={skeletonAnimation}
                />
                <Skeleton
                  variant="circular"
                  width={40}
                  height={40}
                  sx={skeletonAnimation}
                />
                <Skeleton
                  variant="circular"
                  width={40}
                  height={40}
                  sx={skeletonAnimation}
                />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }

  if (variant === "table") {
    return (
      <Box>
        {Array.from({ length: count }).map((_, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              py: 2,
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <Skeleton
              variant="text"
              width="25%"
              height={24}
              sx={skeletonAnimation}
            />
            <Skeleton
              variant="rectangular"
              width={80}
              height={24}
              sx={{
                borderRadius: UI_CONFIG.THEME.BORDER_RADIUS.SMALL,
                ...skeletonAnimation,
              }}
            />
            <Skeleton
              variant="text"
              width="40%"
              height={20}
              sx={skeletonAnimation}
            />
            <Box sx={{ display: "flex", gap: 1, ml: "auto" }}>
              <Skeleton
                variant="circular"
                width={32}
                height={32}
                sx={skeletonAnimation}
              />
              <Skeleton
                variant="circular"
                width={32}
                height={32}
                sx={skeletonAnimation}
              />
              <Skeleton
                variant="circular"
                width={32}
                height={32}
                sx={skeletonAnimation}
              />
            </Box>
          </Box>
        ))}
      </Box>
    );
  }

  if (variant === "form") {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Skeleton
          variant="text"
          width="40%"
          height={40}
          sx={skeletonAnimation}
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={56}
          sx={{
            borderRadius: UI_CONFIG.THEME.BORDER_RADIUS.SMALL,
            ...skeletonAnimation,
          }}
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={56}
          sx={{
            borderRadius: UI_CONFIG.THEME.BORDER_RADIUS.SMALL,
            ...skeletonAnimation,
          }}
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={200}
          sx={{
            borderRadius: UI_CONFIG.THEME.BORDER_RADIUS.SMALL,
            ...skeletonAnimation,
          }}
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <Skeleton
            variant="rectangular"
            width={120}
            height={40}
            sx={{
              borderRadius: UI_CONFIG.THEME.BORDER_RADIUS.SMALL,
              ...skeletonAnimation,
            }}
          />
          <Skeleton
            variant="rectangular"
            width={80}
            height={40}
            sx={{
              borderRadius: UI_CONFIG.THEME.BORDER_RADIUS.SMALL,
              ...skeletonAnimation,
            }}
          />
        </Box>
      </Box>
    );
  }

  return null;
};

export default LoadingSkeleton;

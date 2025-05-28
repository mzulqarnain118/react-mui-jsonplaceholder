"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { Box, Typography, Button, Container, Paper } from "@mui/material"
import { ErrorOutline } from "@mui/icons-material"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  private handleReload = () => {
    window.location.reload()
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: 2,
            }}
          >
            <ErrorOutline
              sx={{
                fontSize: 64,
                color: "error.main",
                mb: 2,
              }}
            />
            <Typography variant="h4" gutterBottom>
              Oops! Something went wrong
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </Typography>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: "grey.100",
                  borderRadius: 1,
                  textAlign: "left",
                }}
              >
                <Typography variant="caption" component="pre">
                  {this.state.error.message}
                </Typography>
              </Box>
            )}
            <Button variant="contained" onClick={this.handleReload} sx={{ mt: 3 }}>
              Refresh Page
            </Button>
          </Paper>
        </Container>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

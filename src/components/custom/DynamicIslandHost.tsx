"use client"

import {
  DynamicIsland,
  DynamicContainer,
  DynamicDescription,
  DynamicTitle,
  DynamicDiv,
  useDynamicIslandSize,
  useScheduledAnimations,
} from "@/components/ui/dynamic-island"
import {
  MessageCircle,
  Loader,
  Waves,
  Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DynamicIslandHost() {
  const { state, setSize } = useDynamicIslandSize()

  // Auto animation when idle
  useScheduledAnimations([
    { size: "compact", delay: 1000 },
    { size: "large", delay: 1200 },
    { size: "tall", delay: 1600 },
    { size: "long", delay: 1800 },
    { size: "medium", delay: 2200 },
  ])

  function renderState() {
    switch (state.size) {
      case "compact":
        return (
          <DynamicContainer className="flex items-center justify-center">
            <MessageCircle className="h-5 w-5 text-cyan-400" />
          </DynamicContainer>
        )

      case "large":
        return (
          <DynamicContainer className="flex items-center gap-4 px-4">
            <Loader className="animate-spin h-8 w-8 text-yellow-300" />
            <DynamicTitle className="text-xl text-white">
              Loading
            </DynamicTitle>
          </DynamicContainer>
        )

      case "long":
        return (
          <DynamicContainer className="flex items-center gap-4 px-4">
            <Waves className="h-6 w-6 text-cyan-400" />
            <DynamicTitle className="text-white">
              Sharpnr Active
            </DynamicTitle>
          </DynamicContainer>
        )

      case "medium":
        return (
          <DynamicContainer className="px-4 py-3">
            <DynamicTitle className="text-white">
              Welcome back
            </DynamicTitle>
            <DynamicDiv className="mt-2 space-y-1">
              <Button size="sm">
                <Mail className="mr-2 h-4 w-4" />
                Continue
              </Button>
            </DynamicDiv>
          </DynamicContainer>
        )

      default:
        return null
    }
  }

  return (
    <div
      className="fixed top-3 left-1/2 z-50 -translate-x-1/2"
      onMouseEnter={() => {
        if (state.size === "compact") {
          setSize("medium")
        }
      }}
      onMouseLeave={() => {
        setSize("compact")
      }}
    >
      <DynamicIsland id="app-island">
        {renderState()}
      </DynamicIsland>
    </div>
  )
}

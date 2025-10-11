import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
  component: () => (
    <div className="p-4 rounded shadow border m-2">
      <h2 className="text-xl font-bold mb-2">Dashboard Home</h2>
      <p>Welcome to your dashboard!</p>
    </div>
  ),
})

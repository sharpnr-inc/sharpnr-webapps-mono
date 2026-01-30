type Restaurant = {
  id: string;
  name: string;
  occupancy: number;
};

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms))
export async function fetchRestaurants(): Promise<Restaurant[]> {
  await sleep(600) // simulate network latency

  return [
    { id: "1", name: "Kitchen Alpha", occupancy: 72 },
    { id: "2", name: "Kitchen Beta", occupancy: 45 },
    { id: "3", name: "Kitchen Gamma", occupancy: 90 },
  ]
}
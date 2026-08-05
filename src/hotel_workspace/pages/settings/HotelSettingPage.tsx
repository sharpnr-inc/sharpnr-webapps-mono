import React, { useState } from "react"

/* ================================
   Types
================================ */
interface HotelProfile {
  name: string
  address: string
  phone: string
  email: string
  checkInTime: string
  checkOutTime: string
}

interface HotelFeatures {
  roomService: boolean
  housekeeping: boolean
  maintenance: boolean
  laundry: boolean
}

interface MenuCategory {
  id: string
  name: string
  isActive: boolean
}

interface MenuItem {
  id: string
  name: string
  price: number
  isAvailable: boolean
  categoryId: string
}

/* ================================
   Page
================================ */
const HotelSettingPage: React.FC = () => {
  /* ---------- Profile ---------- */
  const [profile, setProfile] = useState<HotelProfile>({
    name: "Ocean View Hotel",
    address: "Goa, India",
    phone: "+91 98765 43210",
    email: "contact@oceanview.com",
    checkInTime: "14:00",
    checkOutTime: "11:00",
  })

  /* ---------- Features ---------- */
  const [features, setFeatures] = useState<HotelFeatures>({
    roomService: true,
    housekeeping: true,
    maintenance: true,
    laundry: false,
  })

  /* ---------- Menu Settings ---------- */
  const [categories, setCategories] = useState<MenuCategory[]>([
    { id: "1", name: "Breakfast", isActive: true },
    { id: "2", name: "Lunch", isActive: true },
    { id: "3", name: "Dinner", isActive: true },
    { id: "4", name: "Beverages", isActive: true },
  ])

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: "1",
      name: "Veg Sandwich",
      price: 150,
      isAvailable: true,
      categoryId: "1",
    },
    {
      id: "2",
      name: "Masala Dosa",
      price: 180,
      isAvailable: false,
      categoryId: "1",
    },
    {
      id: "3",
      name: "Dal Tadka",
      price: 250,
      isAvailable: true,
      categoryId: "2",
    },
  ])

  return (
    <div className="p-6 space-y-8 max-w-6xl">
      <h1 className="text-2xl font-semibold">Hotel Settings</h1>

      {/* ================= Hotel Profile ================= */}
      <section className="rounded-xl border p-6 space-y-4">
        <h2 className="text-lg font-medium">Hotel Profile</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="border rounded-md p-2"
            placeholder="Hotel Name"
            value={profile.name}
            onChange={(e) =>
              setProfile({ ...profile, name: e.target.value })
            }
          />
          <input
            className="border rounded-md p-2"
            placeholder="Phone"
            value={profile.phone}
            onChange={(e) =>
              setProfile({ ...profile, phone: e.target.value })
            }
          />
          <input
            className="border rounded-md p-2 md:col-span-2"
            placeholder="Address"
            value={profile.address}
            onChange={(e) =>
              setProfile({ ...profile, address: e.target.value })
            }
          />
          <input
            className="border rounded-md p-2"
            placeholder="Email"
            value={profile.email}
            onChange={(e) =>
              setProfile({ ...profile, email: e.target.value })
            }
          />
        </div>
      </section>

      {/* ================= Features ================= */}
      <section className="rounded-xl border p-6 space-y-4">
        <h2 className="text-lg font-medium">Hotel Features</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(features).map(([key, value]) => (
            <label
              key={key}
              className="flex items-center justify-between border rounded-md p-3"
            >
              <span className="capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </span>
              <input
                type="checkbox"
                checked={value}
                onChange={() =>
                  setFeatures({ ...features, [key]: !value })
                }
              />
            </label>
          ))}
        </div>
      </section>

      {/* ================= Menu Categories ================= */}
      <section className="rounded-xl border p-6 space-y-4">
        <h2 className="text-lg font-medium">Menu Categories</h2>

        <div className="space-y-2">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center justify-between border rounded-md p-3"
            >
              <span>{cat.name}</span>
              <input
                type="checkbox"
                checked={cat.isActive}
                onChange={() =>
                  setCategories((prev) =>
                    prev.map((c) =>
                      c.id === cat.id
                        ? { ...c, isActive: !c.isActive }
                        : c
                    )
                  )
                }
              />
            </div>
          ))}
        </div>
      </section>

      {/* ================= Menu Items ================= */}
      <section className="rounded-xl border p-6 space-y-4">
        <h2 className="text-lg font-medium">Menu Items</h2>

        <div className="space-y-3">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-4 gap-3 border rounded-md p-3 items-center"
            >
              <input
                className="border rounded p-2"
                value={item.name}
                onChange={(e) =>
                  setMenuItems((prev) =>
                    prev.map((i) =>
                      i.id === item.id
                        ? { ...i, name: e.target.value }
                        : i
                    )
                  )
                }
              />

              <input
                type="number"
                className="border rounded p-2"
                value={item.price}
                onChange={(e) =>
                  setMenuItems((prev) =>
                    prev.map((i) =>
                      i.id === item.id
                        ? { ...i, price: Number(e.target.value) }
                        : i
                    )
                  )
                }
              />

              <select
                className="border rounded p-2"
                value={item.categoryId}
                onChange={(e) =>
                  setMenuItems((prev) =>
                    prev.map((i) =>
                      i.id === item.id
                        ? { ...i, categoryId: e.target.value }
                        : i
                    )
                  )
                }
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.isAvailable}
                  onChange={() =>
                    setMenuItems((prev) =>
                      prev.map((i) =>
                        i.id === item.id
                          ? {
                              ...i,
                              isAvailable: !i.isAvailable,
                            }
                          : i
                      )
                    )
                  }
                />
                Available
              </label>
            </div>
          ))}
        </div>
      </section>

      {/* ================= Save ================= */}
      <div className="flex justify-end">
        <button className="px-6 py-2 rounded-md bg-black text-white">
          Save Settings
        </button>
      </div>
    </div>
  )
}

export default HotelSettingPage

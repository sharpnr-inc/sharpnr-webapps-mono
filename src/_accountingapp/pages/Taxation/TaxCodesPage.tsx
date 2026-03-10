import { useState } from "react";
import {
  Plus,
  ChevronRight,
  Settings2,
  ShieldCheck,
  Trash2,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Search,
  Save,
  ArrowRight,
} from "lucide-react";

/**
 * TaxCodesPage
 * High-contrast, monochromatic UI for managing Tax Categories and Accounting Mappings.
 * Uses Tailwind CSS for styling.
 */
export function TaxCodesPage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState("1");
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  // Mock Data
  const categories = [
    {
      id: "1",
      code: "ROOM_RENT",
      desc: "Standard Room Revenue",
      status: "mapped",
    },
    {
      id: "2",
      code: "FOOD_BEV",
      desc: "Restaurant & Dining",
      status: "mapped",
    },
    {
      id: "3",
      code: "LIQUOR",
      desc: "Bar Sales (High Tax)",
      status: "unmapped",
    },
    {
      id: "4",
      code: "SERVICE_CHG",
      desc: "Standard Service Fee",
      status: "mapped",
    },
  ];

  const chartOfAccounts = [
    { id: "coa1", code: "4000", name: "Room Revenue", type: "Revenue" },
    { id: "coa2", code: "4010", name: "F&B Revenue", type: "Revenue" },
    { id: "coa3", code: "2100", name: "GST Payable - CGST", type: "Liability" },
    { id: "coa4", code: "2101", name: "GST Payable - SGST", type: "Liability" },
  ];

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId);

  return (
    <div className="flex h-screen w-full font-sans select-none overflow-hidden border-t border-black">
      {/* LEFT SIDEBAR: MASTER LIST */}
      <aside className="w-80 border-r border-black flex flex-col ">
        <div className="p-4 border-b border-black flex items-center justify-between  ">
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            Tax Categories
          </span>
          <button
            onClick={() => setIsAddingCategory(true)}
            className="p-1 bg-zinc-800 border border-transparent transition-all"
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="p-3 border-b border-black">
          <div className="relative">
            <Search size={14} className="absolute left-2 top-2.5 opacity-40" />
            <input
              type="text"
              placeholder="Filter codes..."
              className="w-full bg-zinc-100 border-none p-2 pl-8 text-[11px] focus:ring-1 focus:ring-black outline-none"
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedCategoryId(cat.id);
                setIsAddingCategory(false);
              }}
              className={`group flex items-center justify-between p-4 border-b border-black cursor-pointer transition-all
                ${selectedCategoryId === cat.id && !isAddingCategory ? " " : "bg-zinc-50"}
              `}
            >
              <div className="space-y-0.5">
                <h4 className="text-xs font-black tracking-tight">
                  {cat.code}
                </h4>
                <p className={`text-[9px] uppercase font-medium opacity-60`}>
                  {cat.desc}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {cat.status === "mapped" ? (
                  <CheckCircle2 size={12} strokeWidth={3} />
                ) : (
                  <AlertCircle
                    size={12}
                    strokeWidth={3}
                    className="text-zinc-400"
                  />
                )}
                <ChevronRight
                  size={14}
                  className={`transition-transform ${selectedCategoryId === cat.id ? "translate-x-1" : "opacity-0 group-opacity-100"}`}
                />
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* RIGHT CONTENT: DETAIL CONFIGURATION */}
      <main className="flex-1 overflow-y-auto bg-[#fafafa]">
        {selectedCategory || isAddingCategory ? (
          <div className="max-w-4xl mx-auto p-12 space-y-12">
            {/* HEADER */}
            <header className="flex justify-between items-end border-b-4 border-black pb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  <Settings2 size={12} />
                  <span>Configuration Engine</span>
                </div>
                <h1 className="text-4xl font-black uppercase tracking-tighter italic">
                  {isAddingCategory ? "New Tax Entry" : selectedCategory?.code}
                </h1>
              </div>
              <div className="flex gap-3">
                <button className="px-6 py-2 border-2 border-black font-black text-[10px] uppercase   transition-all">
                  Discard
                </button>
                <button className="px-6 py-2   border-2 border-black font-black text-[10px] uppercase bg-zinc-800 flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                  <Save size={14} /> Save Configuration
                </button>
              </div>
            </header>

            {/* BLOCK 1: IDENTITY & REVENUE */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                <BarChart3 size={16} /> 1. Revenue Account Mapping
              </div>
              <div className=" border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] grid grid-cols-2 gap-10">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase italic tracking-wider text-zinc-400">
                    Category Code
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedCategory?.code || ""}
                    placeholder="e.g. FOOD_5"
                    className="w-full border-b-2 border-black p-2 text-lg font-black focus:outline-none bg-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase italic tracking-wider text-zinc-400">
                    Credit Revenue To (Ledger)
                  </label>
                  <select className="w-full border-b-2 border-black p-2 text-sm font-bold uppercase focus:outline-none bg-transparent">
                    <option>Select Revenue Account...</option>
                    {chartOfAccounts
                      .filter((a) => a.type === "Revenue")
                      .map((a) => (
                        <option key={a.id}>
                          {a.code} - {a.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </section>

            {/* BLOCK 2: TAX RULES */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                <ShieldCheck size={16} /> 2. Tax Components & Liabilities
              </div>
              <div className=" border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                <div className="p-6 bg-zinc-100 border-b-2 border-black grid grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500">
                      Total Tax Rate
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        defaultValue="12"
                        className="w-20 bg-transparent text-2xl font-black focus:outline-none border-b-2 border-black"
                      />
                      <span className="font-black text-xl">%</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-widest ">
                      Tax Registration
                    </label>
                    <select className="w-full bg-transparent border-b-2 border-black p-1 text-xs font-bold uppercase focus:outline-none">
                      <option>GSTIN: 08AAAAA...</option>
                      <option>VAT: EU999123...</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-widest ">
                      Slab Pricing (Condition)
                    </label>
                    <div className="flex items-center gap-2 py-1 px-2 border-2 border-black  text-[10px] font-bold cursor-pointer   transition-colors">
                      SET JSON CONDITION <ArrowRight size={12} />
                    </div>
                  </div>
                </div>

                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="  text-[9px] font-black uppercase tracking-widest">
                      <th className="px-6 py-3 border-r border-zinc-800">
                        Component Name
                      </th>
                      <th className="px-6 py-3 border-r border-zinc-800">
                        Rate %
                      </th>
                      <th className="px-6 py-3 border-r border-zinc-800">
                        Liability Account (Credit)
                      </th>
                      <th className="px-2 w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black text-[11px] font-bold uppercase">
                    <tr>
                      <td className="px-6 py-4 border-r border-black">
                        <input
                          type="text"
                          defaultValue="CGST"
                          className="w-full focus:outline-none font-black"
                        />
                      </td>
                      <td className="px-6 py-4 border-r border-black">
                        <input
                          type="number"
                          defaultValue="6.0"
                          className="w-full focus:outline-none font-black"
                        />
                      </td>
                      <td className="px-6 py-4 border-r border-black">
                        <select className="w-full bg-transparent focus:outline-none cursor-pointer">
                          <option>2100 - GST Payable - CGST</option>
                        </select>
                      </td>
                      <td className="px-2 text-center  transition-opacity">
                        <button>
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 border-r border-black">
                        <input
                          type="text"
                          defaultValue="SGST"
                          className="w-full focus:outline-none font-black"
                        />
                      </td>
                      <td className="px-6 py-4 border-r border-black">
                        <input
                          type="number"
                          defaultValue="6.0"
                          className="w-full focus:outline-none font-black"
                        />
                      </td>
                      <td className="px-6 py-4 border-r border-black">
                        <select className="w-full bg-transparent focus:outline-none cursor-pointer">
                          <option>2101 - GST Payable - SGST</option>
                        </select>
                      </td>
                      <td className="px-2 text-center  transition-opacity">
                        <button>
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button className="w-full py-4 bg-zinc-50 text-[10px] font-black uppercase   transition-all flex items-center justify-center gap-2 border-t-2 border-black">
                  <Plus size={14} strokeWidth={3} /> Append Component
                </button>
              </div>
            </section>

            <footer className="pt-12 border-t-2 border-black flex justify-between items-center opacity-40">
              <p className="text-[9px] font-bold uppercase tracking-widest leading-loose">
                Sharpnr Orchestrator / Accounting v1.0 <br />
                Entity Verification Status:{" "}
                <span className="underline italic">Verified</span>
              </p>
              <Settings2 size={24} />
            </footer>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-20">
            <Settings2 size={64} strokeWidth={1} />
            <h3 className="text-xs font-black uppercase tracking-[0.5em]">
              Select Category to Initialize
            </h3>
          </div>
        )}
      </main>
    </div>
  );
}

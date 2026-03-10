import {
  History,
  Calendar,
  ArrowRight,
  ExternalLink,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";

/**
 * TaxRateHistory
 * Repurposed page to show the timeline of tax changes.
 * Pure Black & White / High Contrast.
 */
export function TaxRatePage() {
  const historyData = [
    {
      id: 1,
      category: "ROOM_RENT",
      rule: "GST 18% Standard",
      rate: "18.00%",
      from: "2024-04-01",
      to: "Present",
      status: "Active",
      ledgers: ["4001", "2100", "2101"],
    },
    {
      id: 2,
      category: "FOOD_BEV",
      rule: "GST 5% Lower",
      rate: "5.00%",
      from: "2024-04-01",
      to: "Present",
      status: "Active",
      ledgers: ["4002", "2100", "2101"],
    },
    {
      id: 3,
      category: "ROOM_RENT",
      rule: "Old Luxury Tax",
      rate: "28.00%",
      from: "2020-01-01",
      to: "2024-03-31",
      status: "Expired",
      ledgers: ["4001", "2105"],
    },
  ];

  return (
    <div className="p-6 font-sans">
      <header className="mb-12 border-b-4 border-black pb-6 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter italic">
            Tax Rate Timeline
          </h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 mt-2">
            Audit log of legislative & mapping changes
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-black text-white text-[10px] font-bold uppercase tracking-widest cursor-pointer">
          <History size={14} /> Export Audit Log
        </div>
      </header>

      <div className="space-y-4">
        {/* Table Header */}
        <div className="grid grid-cols-6 gap-4 px-6 py-3 bg-zinc-100 border-2 border-black text-[9px] font-black uppercase tracking-widest">
          <div className="col-span-1">Category</div>
          <div className="col-span-1">Rule Name</div>
          <div className="col-span-1">Rate</div>
          <div className="col-span-1">Validity Period</div>
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-1 text-right">Action</div>
        </div>

        {/* Timeline Rows */}
        {historyData.map((item) => (
          <div
            key={item.id}
            className={`grid grid-cols-6 gap-4 px-6 py-5 border-2 border-black items-center transition-all
              ${item.status === "Active" ? "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" : "opacity-40 grayscale"}
            `}
          >
            <div className="col-span-1 font-black text-xs uppercase tracking-tight italic">
              {item.category}
            </div>
            <div className="col-span-1 text-[11px] font-bold uppercase">
              {item.rule}
            </div>
            <div className="col-span-1 font-black text-lg">{item.rate}</div>
            <div className="col-span-1 flex items-center gap-2 text-[10px] font-bold">
              <Calendar size={12} />
              <span>{item.from}</span>
              <ArrowRight size={10} />
              <span className={item.to === "Present" ? "underline" : ""}>
                {item.to}
              </span>
            </div>
            <div className="col-span-1 flex justify-center">
              <div
                className={`px-3 py-1 text-[9px] font-black uppercase border flex items-center gap-1
                 ${item.status === "Active" ? "bg-black text-white border-black" : "border-zinc-300 text-zinc-400"}
               `}
              >
                {item.status === "Active" ? (
                  <CheckCircle2 size={10} />
                ) : (
                  <XCircle size={10} />
                )}
                {item.status}
              </div>
            </div>
            <div className="col-span-1 text-right">
              <button className="p-2 border border-black hover:bg-black hover:text-white transition-colors">
                <ExternalLink size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-20 p-8 border-2 border-dashed border-black/20 flex items-center justify-between">
        <div className="flex items-center gap-4 text-zinc-400">
          <Clock size={32} strokeWidth={1} />
          <p className="text-[10px] font-medium uppercase tracking-widest leading-relaxed">
            All tax rate changes are permanent once applied to a transaction.{" "}
            <br />
            Consult the{" "}
            <span className="text-black underline font-bold">
              Tax Compliance Manual
            </span>{" "}
            for regulatory updates.
          </p>
        </div>
        <div className="text-[9px] font-black uppercase opacity-20">
          Sharpnr Ledger Audit v1.0
        </div>
      </footer>
    </div>
  );
}

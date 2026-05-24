import { Construction } from "lucide-react";

export default function UnderConstruction() {
    return (
        <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-amber-500/80">
            <Construction className="size-2.5" /> Under Construction
        </span>
    );
}

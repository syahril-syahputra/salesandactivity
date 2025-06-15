import { Separator } from "@/components/ui/separator";
import { useFetchReport } from "@/features/useFetchReport";
import { formatRupiah } from "@/lib/formatRp";

export default function Report() {
    const { data } = useFetchReport();
    return (
        <div className="space-y-4 py-8">
            <div className="flex flex-col space-y-2">
                <label className="text-xl font-semibold">Total Sales</label>
                <span>{formatRupiah(data?.totalSales)}</span>
            </div>
            <Separator />
            <div className="flex flex-col space-y-2">
                <label className="text-xl font-semibold">Total Activity</label>
                <span>{data?.totalActivityLogs}</span>
            </div>
            <Separator />
            <div className="flex flex-col space-y-2">
                <label className="text-xl font-semibold">
                    Most Active User{" "}
                </label>
                <span>
                    {data?.mostActiveUser} with {data?.activityCount} Activity
                </span>
            </div>
            <Separator />
        </div>
    );
}

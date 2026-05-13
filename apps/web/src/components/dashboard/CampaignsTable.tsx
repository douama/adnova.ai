import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";

const mockCampaigns = [
  { id: "c1", name: "Retargeting - Q3 2026", platform: "Meta", status: "Active", spend: "$4,200", roas: "3.2x" },
  { id: "c2", name: "Cold Audience US - Scaling", platform: "TikTok", status: "Active", spend: "$5,100", roas: "2.1x" },
  { id: "c3", name: "Search Brand Terms", platform: "Google", status: "Active", spend: "$1,800", roas: "4.5x" },
  { id: "c4", name: "Lookalike 1% Purchasers", platform: "Meta", status: "Paused", spend: "$1,350", roas: "1.8x" },
];

export function CampaignsTable() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Top Campaigns</CardTitle>
        <CardDescription>
          Overview of your best performing campaigns this month.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 font-medium">Campaign Name</th>
                <th className="px-4 py-3 font-medium">Platform</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Spend</th>
                <th className="px-4 py-3 font-medium">ROAS</th>
              </tr>
            </thead>
            <tbody>
              {mockCampaigns.map((c) => (
                <tr key={c.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-medium text-slate-900">{c.name}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">
                      {c.platform}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${c.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{c.spend}</td>
                  <td className="px-4 py-3 font-medium text-slate-900">{c.roas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react";

export function MetricsOverview() {
  const metrics = [
    {
      title: "Total Spend (30d)",
      value: "$12,450.00",
      change: "+15.2%",
      icon: DollarSign,
    },
    {
      title: "Average ROAS",
      value: "2.84x",
      change: "+0.4x",
      icon: TrendingUp,
    },
    {
      title: "Total Conversions",
      value: "1,245",
      change: "+12%",
      icon: Activity,
    },
    {
      title: "Active Campaigns",
      value: "14",
      change: "+2",
      icon: Users,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
            <metric.icon className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-brand-600 font-medium mt-1">
              {metric.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

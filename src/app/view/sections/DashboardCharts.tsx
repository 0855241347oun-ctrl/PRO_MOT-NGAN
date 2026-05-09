"use client";

import Card from "@/components/ui/Card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const barData = [
  { name: 'ม.ค.', views: 400 },
  { name: 'ก.พ.', views: 300 },
  { name: 'มี.ค.', views: 550 },
  { name: 'เม.ย.', views: 450 },
  { name: 'พ.ค.', views: 700 },
  { name: 'มิ.ย.', views: 650 },
];

const pieData = [
  { name: 'รถขุด (Excavator)', value: 400 },
  { name: 'รถตัก (Loader)', value: 300 },
  { name: 'รถเกรด (Grader)', value: 300 },
  { name: 'รถเครน (Crane)', value: 200 },
];

const COLORS = ['#06b6d4', '#8b5cf6', '#f59e0b', '#10b981'];

export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mt-6">
      {/* Bar Chart Card */}
      <Card hover className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '100ms' }}>
        <h3 className="font-bold text-lg mb-4 text-foreground/80">สถิติการเข้าชมรายเดือน</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-border" opacity={0.5} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'currentColor' }} className="text-muted-foreground text-xs" />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'currentColor' }} className="text-muted-foreground text-xs" />
              <Tooltip 
                cursor={{ fill: 'currentColor', opacity: 0.1 }}
                contentStyle={{ borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--card)', color: 'var(--card-foreground)', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="views" fill="#06b6d4" radius={[4, 4, 0, 0]} animationDuration={1500} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Donut Chart Card */}
      <Card hover className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '200ms' }}>
        <h3 className="font-bold text-lg mb-4 text-foreground/80">สัดส่วนประเภทเครื่องจักร</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--card)', color: 'var(--card-foreground)', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                animationDuration={1500}
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

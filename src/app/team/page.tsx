"use client";

import Card from "@/components/ui/Card";
import { Mail, Phone, MapPin } from "lucide-react";
import { H1, TextSecondary } from "@/components/ui/Typography";

const team = [
  {
    name: "สมชาย วิชัย",
    role: "Project Manager",
    email: "somchai@company.com",
    phone: "081-xxx-xxxx",
    location: "กรุงเทพฯ",
    avatar: "SC",
    gradient: "from-primary to-blue-600",
  },
  {
    name: "สมหญิง ใจดี",
    role: "Frontend Developer",
    email: "somying@company.com",
    phone: "082-xxx-xxxx",
    location: "เชียงใหม่",
    avatar: "SY",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    name: "วิทยา ชาญเดช",
    role: "Backend Developer",
    email: "wittaya@company.com",
    phone: "083-xxx-xxxx",
    location: "กรุงเทพฯ",
    avatar: "WT",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    name: "นภา สุขสันต์",
    role: "UI/UX Designer",
    email: "napa@company.com",
    phone: "084-xxx-xxxx",
    location: "ขอนแก่น",
    avatar: "NP",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    name: "ธนากร บุญมี",
    role: "Data Analyst",
    email: "thanakorn@company.com",
    phone: "085-xxx-xxxx",
    location: "กรุงเทพฯ",
    avatar: "TN",
    gradient: "from-rose-500 to-pink-600",
  },
  {
    name: "พิมพ์ใจ รักไทย",
    role: "QA Engineer",
    email: "pimjai@company.com",
    phone: "086-xxx-xxxx",
    location: "ภูเก็ต",
    avatar: "PJ",
    gradient: "from-sky-500 to-indigo-600",
  },
];

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div>
        <H1>ทีมงาน</H1>
        <TextSecondary className="mt-1">
          สมาชิกในทีมและข้อมูลติดต่อ
        </TextSecondary>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member, i) => (
          <Card key={i} hover>
            <div className="flex flex-col items-center text-center">
              {/* Avatar */}
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${member.gradient} text-xl font-bold text-white shadow-lg mb-4`}
              >
                {member.avatar}
              </div>
              <h3 className="font-semibold text-foreground text-lg">{member.name}</h3>
              <p className="text-sm text-primary mt-0.5">{member.role}</p>

              {/* Contact info */}
              <div className="mt-4 w-full space-y-2 text-left">
                <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <Mail size={14} className="text-muted-foreground/70 shrink-0" />
                  <span className="truncate">{member.email}</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <Phone size={14} className="text-muted-foreground/70 shrink-0" />
                  <span>{member.phone}</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <MapPin size={14} className="text-muted-foreground/70 shrink-0" />
                  <span>{member.location}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

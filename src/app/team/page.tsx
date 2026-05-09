"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import { Mail, Phone, MapPin, Loader2, User, ShieldCheck, UserCircle } from "lucide-react";
import { H1, TextSecondary } from "@/components/ui/Typography";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

const GRADIENTS = [
  "from-primary to-blue-600",
  "from-violet-500 to-purple-600",
  "from-amber-500 to-orange-600",
  "from-emerald-500 to-teal-600",
  "from-rose-500 to-pink-600",
  "from-sky-500 to-indigo-600",
];

interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: string | null;
  username: string | null;
  email: string | null;
}

export default function TeamPage() {
  const [members, setMembers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchTeam() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .order("full_name", { ascending: true });

        if (error) throw error;
        setMembers(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการดึงข้อมูล");
      } finally {
        setLoading(false);
      }
    }
    fetchTeam();
  }, [supabase]);

  const getInitials = (name: string | null) => {
    if (!name) return "??";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };



  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <H1>ทีมงาน</H1>
          <TextSecondary className="mt-1">
            รายชื่อสมาชิกและข้อมูลบทบาทในระบบ (ดึงข้อมูลจาก Profiles)
          </TextSecondary>
        </div>
        <div className="text-xs font-medium text-primary/60 bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
          พบสมาชิก {members.length} คน
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin mb-4 text-primary" />
          <p>กำลังโหลดข้อมูลสมาชิก...</p>
        </div>
      ) : error ? (
        <Card className="border-red-500/20 bg-red-500/5 text-center py-10">
          <p className="text-red-400">{error}</p>
        </Card>
      ) : members.length === 0 ? (
        <Card className="text-center py-20 text-muted-foreground">
          <User className="h-12 w-12 mx-auto mb-4 opacity-20" />
          <p>ยังไม่มีข้อมูลสมาชิกในระบบ</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member, i) => (
            <Card key={member.id} hover className="animate-in fade-in slide-in-from-bottom-4 overflow-hidden" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="flex flex-col items-center text-center">
                {/* Avatar / Photo */}
                <div className="relative h-24 w-24 mb-4">
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${
                      GRADIENTS[i % GRADIENTS.length]
                    } opacity-20 blur-xl`}
                  />
                  <div className="relative h-full w-full rounded-2xl border-2 border-primary/10 overflow-hidden bg-muted flex items-center justify-center shadow-inner">
                    {member.avatar_url ? (
                      <Image
                        src={member.avatar_url}
                        alt={member.full_name || "Member"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-primary">
                        {getInitials(member.full_name)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-foreground text-xl">
                    {member.full_name || "ไม่ระบุชื่อ"}
                  </h3>
                  <div className="flex items-center justify-center gap-1.5 text-primary">
                    <ShieldCheck size={14} />
                    <p className="text-sm font-semibold uppercase tracking-wider">
                      {member.role || "member"}
                    </p>
                  </div>
                </div>

                {/* Additional info */}
                <div className="mt-6 w-full pt-6 border-t border-border/50 space-y-3 text-left">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <UserCircle size={16} className="text-primary/50" />
                    <span className="font-medium text-foreground/80">
                      ID: {member.username || member.id.substring(0, 8)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground group">
                    <Mail size={16} className="text-primary/50 group-hover:text-primary transition-colors" />
                    <span className="truncate">
                      {member.email || member.username || "—"}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

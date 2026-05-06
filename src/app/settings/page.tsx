"use client";

import { useState, useEffect, useRef } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { User, Bell, Globe, Palette, Database, Camera, Loader2 } from "lucide-react";
import { H1, H2, TextPrimary, TextSecondary } from "@/components/ui/Typography";
import { createClient } from "@/lib/supabase/client";

interface UserProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  role: string | null;
  avatar_url: string | null;
}

export default function SettingsPage() {
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (data) {
          setProfile({
            id: user.id,
            full_name: data.full_name,
            email: user.email || null,
            role: data.role,
            avatar_url: data.avatar_url,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !profile) return;

    try {
      setIsUploading(true);

      // 1. Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${profile.id}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // 3. Update profiles table
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', profile.id);

      if (updateError) throw updateError;

      // 4. Update local state
      setProfile({ ...profile, avatar_url: publicUrl });
      alert("อัปเดตรูปโปรไฟล์สำเร็จ!");

    } catch (error: any) {
      console.error("Error uploading image:", error);
      alert("เกิดข้อผิดพลาดในการอัปโหลด: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Page header */}
      <div>
        <H1>ตั้งค่า</H1>
        <TextSecondary className="mt-1">
          ภาพรวมการตั้งค่าและปรับแต่งระบบ
        </TextSecondary>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <div className="flex flex-col items-center p-4">
            <div className="relative mb-4">
              <div className="group relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-blue-600 shadow-xl overflow-hidden border-4 border-background/50">
                {isUploading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-10">
                    <Loader2 className="h-6 w-6 animate-spin text-white" />
                  </div>
                ) : null}
                
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <User size={40} className="text-primary-foreground" />
                )}
              </div>
              <button 
                onClick={handleImageClick}
                disabled={isUploading}
                className="absolute bottom-0 right-0 rounded-full bg-background p-2 text-muted-foreground shadow-lg hover:text-primary hover:scale-110 transition-all border border-border"
              >
                <Camera size={16} />
              </button>
            </div>
            
            {isLoading ? (
              <div className="flex flex-col items-center space-y-2">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <TextSecondary>กำลังโหลด...</TextSecondary>
              </div>
            ) : (
              <>
                <H2 className="mb-1 text-center">{profile?.full_name || "ไม่ระบุชื่อ"}</H2>
                <TextSecondary className="text-center">{profile?.email || "ไม่มีอีเมล"}</TextSecondary>
                <div className="mt-2 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                  {profile?.role || "user"}
                </div>
              </>
            )}

            <Button className="mt-6 w-full" variant="outline">
              แก้ไขข้อมูลส่วนตัว
            </Button>
          </div>
        </Card>

        {/* Settings Sections */}
        <div className="space-y-6 lg:col-span-2">
          {/* General Settings */}
          <Card>
            <div className="mb-4 flex items-center gap-3 border-b border-border pb-4">
              <div className="rounded-lg bg-primary/20 p-2 text-primary">
                <Globe size={18} />
              </div>
              <H2>ทั่วไป</H2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <TextPrimary className="font-medium">ภาษาของระบบ</TextPrimary>
                  <TextSecondary>เปลี่ยนภาษาที่แสดงผลบน Dashboard</TextSecondary>
                </div>
                <select className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none">
                  <option value="th">ไทย (TH)</option>
                  <option value="en">English (EN)</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Notifications */}
          <Card>
            <div className="mb-4 flex items-center gap-3 border-b border-border pb-4">
              <div className="rounded-lg bg-red-500/20 p-2 text-red-500">
                <Bell size={18} />
              </div>
              <H2>การแจ้งเตือน</H2>
            </div>
            <div className="space-y-4">
              <ToggleRow label="แจ้งเตือนเมื่อมีการเพิ่มข้อมูลใหม่" defaultOn />
              <ToggleRow label="ส่งรายงานสรุปรายสัปดาห์ผ่านอีเมล" />
            </div>
          </Card>

          {/* Storage Info */}
          <Card>
            <div className="mb-4 flex items-center gap-3 border-b border-border pb-4">
              <div className="rounded-lg bg-emerald-500/20 p-2 text-emerald-500">
                <Database size={18} />
              </div>
              <H2>ระบบจัดเก็บไฟล์</H2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col rounded-lg bg-muted/50 p-3">
                <TextSecondary>Bucket Name</TextSecondary>
                <TextPrimary>avatars</TextPrimary>
              </div>
              <div className="flex flex-col rounded-lg bg-muted/50 p-3">
                <TextSecondary>Storage Provider</TextSecondary>
                <TextPrimary>Supabase Storage</TextPrimary>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ToggleRow({ label, defaultOn = false }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between">
      <TextPrimary>{label}</TextPrimary>
      <button
        onClick={() => setOn(!on)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${on ? "bg-primary" : "bg-muted"
          }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${on ? "translate-x-6" : "translate-x-1"
            }`}
        />
      </button>
    </div>
  );
}

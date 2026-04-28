import { useState, useEffect } from "react";
import { useUserStore } from "../store/userStore";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { User, Save, Shield, HardDrive, Loader2 } from "lucide-react";

export default function SettingsPage() {
  const { settings, fetchSettings, updateSettings, isLoading } = useUserStore();
  const [name, setName] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  // Sync local state once settings are loaded
  useEffect(() => {
    if (!isLoading && settings.name) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(settings.name);
    }
  }, [isLoading, settings.name]);

  const handleSave = async () => {
    await updateSettings({ name });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-12 animate-fade-in">
      <header className="space-y-2">
        <h2 className="text-4xl font-bold tracking-tight">Settings</h2>
        <p className="text-text-muted">Customize your Kuripp experience.</p>
      </header>

      <div className="space-y-8">
        {/* Profile Section */}
        <section className="glass-card rounded-[32px] p-8 space-y-6 border border-white/5">
          <div className="flex items-center gap-3 text-primary">
            <User className="w-5 h-5" />
            <h3 className="text-xl font-bold text-text-main">Profile</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Your Name</label>
              <div className="flex gap-3">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="How should Kuripp greet you?"
                  className="flex-1"
                />
                <Button onClick={handleSave} className="px-6 rounded-xl shadow-lg shadow-primary/20">
                  <Save className="w-4 h-4" />
                  {isSaved ? "Saved!" : "Save"}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy & Storage Section */}
        <section className="glass-card rounded-[32px] p-8 space-y-6 border border-white/5">
          <div className="flex items-center gap-3 text-success">
            <Shield className="w-5 h-5" />
            <h3 className="text-xl font-bold text-text-main">Privacy & Data</h3>
          </div>

          <div className="space-y-4 text-sm text-text-muted leading-relaxed">
            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
              <HardDrive className="w-6 h-6 text-primary shrink-0 mt-1" />
              <div>
                <p className="font-bold text-text-main mb-1">Local-Only Storage</p>
                <p>All your notes, tasks, and settings are stored locally on this machine. Kuripp does not use any cloud servers or trackers.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

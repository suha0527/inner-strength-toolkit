import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface JournalEntry {
  id: string;
  title: string | null;
  content: string;
  mood: string | null;
  created_at: string;
  updated_at: string;
}

interface JournalEditorProps {
  entry: JournalEntry | null;
  onSave: (title: string, content: string, mood: string) => void;
  onCancel: () => void;
}

const moods = [
  { value: "happy", emoji: "😊", label: "Happy" },
  { value: "calm", emoji: "😌", label: "Calm" },
  { value: "grateful", emoji: "🙏", label: "Grateful" },
  { value: "hopeful", emoji: "🌟", label: "Hopeful" },
  { value: "sad", emoji: "😢", label: "Sad" },
  { value: "anxious", emoji: "😰", label: "Anxious" },
  { value: "tired", emoji: "😴", label: "Tired" },
  { value: "angry", emoji: "😤", label: "Angry" },
];

const JournalEditor = ({ entry, onSave, onCancel }: JournalEditorProps) => {
  const [title, setTitle] = useState(entry?.title || "");
  const [content, setContent] = useState(entry?.content || "");
  const [mood, setMood] = useState(entry?.mood || "");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    setSaving(true);
    await onSave(title.trim(), content.trim(), mood);
    setSaving(false);
  };

  return (
    <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif font-medium text-foreground">
          {entry ? "Edit Entry" : "New Entry"}
        </h2>
        <Button onClick={onCancel} variant="ghost" size="sm">
          <X className="w-5 h-5" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title">Title (optional)</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your entry a title..."
            className="mt-1"
          />
        </div>

        <div>
          <Label>How are you feeling?</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {moods.map((m) => (
              <button
                key={m.value}
                type="button"
                onClick={() => setMood(mood === m.value ? "" : m.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                  mood === m.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border hover:border-primary/50"
                }`}
              >
                <span>{m.emoji}</span>
                <span className="text-sm">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="content">Your thoughts</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write whatever is on your mind. This is your safe space..."
            className="mt-1 min-h-[200px] resize-none"
            required
          />
        </div>

        <div className="flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={onCancel} className="rounded-full">
            Cancel
          </Button>
          <Button type="submit" className="rounded-full px-8" disabled={saving || !content.trim()}>
            {saving ? "Saving..." : "Save Entry"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JournalEditor;

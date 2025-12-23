import { format } from "date-fns";
import { Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface JournalEntry {
  id: string;
  title: string | null;
  content: string;
  mood: string | null;
  created_at: string;
  updated_at: string;
}

interface JournalEntryCardProps {
  entry: JournalEntry;
  onEdit: () => void;
  onDelete: () => void;
}

const moodEmojis: Record<string, string> = {
  happy: "😊",
  calm: "😌",
  sad: "😢",
  anxious: "😰",
  grateful: "🙏",
  hopeful: "🌟",
  tired: "😴",
  angry: "😤",
};

const JournalEntryCard = ({ entry, onEdit, onDelete }: JournalEntryCardProps) => {
  const formattedDate = format(new Date(entry.created_at), "MMMM d, yyyy 'at' h:mm a");

  return (
    <div className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {entry.mood && moodEmojis[entry.mood] && (
            <span className="text-2xl">{moodEmojis[entry.mood]}</span>
          )}
          <div>
            <h3 className="font-serif font-medium text-foreground text-lg">
              {entry.title || "Untitled Entry"}
            </h3>
            <p className="text-sm text-muted-foreground">{formattedDate}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button onClick={onEdit} variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button onClick={onDelete} variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <p className="text-foreground/80 whitespace-pre-wrap line-clamp-4">{entry.content}</p>
    </div>
  );
};

export default JournalEntryCard;

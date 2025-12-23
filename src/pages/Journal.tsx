import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Heart, Plus, LogOut, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Session } from "@supabase/supabase-js";
import JournalEntryCard from "@/components/JournalEntryCard";
import JournalEditor from "@/components/JournalEditor";

interface JournalEntry {
  id: string;
  title: string | null;
  content: string;
  mood: string | null;
  created_at: string;
  updated_at: string;
}

const Journal = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchEntries();
    }
  }, [user]);

  const fetchEntries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("journal_entries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: "Failed to load journal entries", variant: "destructive" });
    } else {
      setEntries(data || []);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleNewEntry = () => {
    setEditingEntry(null);
    setShowEditor(true);
  };

  const handleEditEntry = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setShowEditor(true);
  };

  const handleDeleteEntry = async (id: string) => {
    const { error } = await supabase.from("journal_entries").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Failed to delete entry", variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Entry removed" });
      fetchEntries();
    }
  };

  const handleSaveEntry = async (title: string, content: string, mood: string) => {
    if (!user) return;

    if (editingEntry) {
      const { error } = await supabase
        .from("journal_entries")
        .update({ title, content, mood })
        .eq("id", editingEntry.id);

      if (error) {
        toast({ title: "Error", description: "Failed to update entry", variant: "destructive" });
        return;
      }
      toast({ title: "Saved", description: "Entry updated" });
    } else {
      const { error } = await supabase
        .from("journal_entries")
        .insert({ user_id: user.id, title, content, mood });

      if (error) {
        toast({ title: "Error", description: "Failed to save entry", variant: "destructive" });
        return;
      }
      toast({ title: "Saved", description: "Entry created" });
    }

    setShowEditor(false);
    setEditingEntry(null);
    fetchEntries();
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-serif font-medium text-foreground">My Journal</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={handleNewEntry} size="sm" className="rounded-full">
              <Plus className="w-4 h-4 mr-2" />
              New Entry
            </Button>
            <Button onClick={handleLogout} variant="ghost" size="sm">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <AnimatePresence mode="wait">
          {showEditor ? (
            <motion.div
              key="editor"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <JournalEditor
                entry={editingEntry}
                onSave={handleSaveEntry}
                onCancel={() => {
                  setShowEditor(false);
                  setEditingEntry(null);
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {loading ? (
                <div className="text-center py-12 text-muted-foreground">Loading your entries...</div>
              ) : entries.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16"
                >
                  <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-10 h-10 text-primary" />
                  </div>
                  <h2 className="text-2xl font-serif font-medium text-foreground mb-2">
                    Your Safe Space
                  </h2>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Start writing your thoughts and feelings. Everything here is private and just for you.
                  </p>
                  <Button onClick={handleNewEntry} className="rounded-full px-8">
                    <Plus className="w-4 h-4 mr-2" />
                    Write Your First Entry
                  </Button>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {entries.map((entry, index) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <JournalEntryCard
                        entry={entry}
                        onEdit={() => handleEditEntry(entry)}
                        onDelete={() => handleDeleteEntry(entry.id)}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Journal;

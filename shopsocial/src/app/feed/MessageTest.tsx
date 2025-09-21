"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function MessageTest() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    const { error } = await supabase.from("messages").insert([{ content: message }]);
    if (error) {
      setStatus("Error: " + error.message);
    } else {
      setStatus("Message sent and saved to Supabase!");
      setMessage("");
    }
  };

  return (
    <div className="p-4 border rounded max-w-md mx-auto mt-8">
      <h2 className="text-lg font-bold mb-2">Test Supabase Message</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
      </form>
      {status && <div className="mt-2 text-sm">{status}</div>}
    </div>
  );
}

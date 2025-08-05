import { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSearch: (query: string) => void;
  className?: string;
}

const SearchBar = ({ onSearch, className }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <Input
      type="text"
      placeholder="Search songs or albums..."
      value={query}
      onChange={handleChange}
      className={cn("w-full max-w-xs bg-zinc-800 border-zinc-700 text-white", className)}
    />
  );
};

export default SearchBar;

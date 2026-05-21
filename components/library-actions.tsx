"use client";

import * as React from "react";
import { Search, Settings, CheckSquare, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LibraryActionsProps {
  categories: string[];
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onSelectAll: () => void;
  onConfigure: () => void;
}

export function LibraryActions({
  categories,
  onSearch,
  onCategoryChange,
  onSelectAll,
  onConfigure,
}: LibraryActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground">Category: </span>
      <Select
        onValueChange={(val) => onCategoryChange(val || "all")}
        defaultValue="all"
      >
        <SelectTrigger className="w-[180px] h-9">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="relative w-64">
        <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
        <Input
          placeholder="Search library..."
          className="pl-9 h-9"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <Button
        variant="outline"
        size="icon-sm"
        onClick={onSelectAll}
        title="Select All"
      >
        <CheckSquare className="size-4" />
      </Button>

      <Button
        variant="outline"
        size="icon-sm"
        onClick={onConfigure}
        title="Configure"
      >
        <Settings className="size-4" />
      </Button>
    </div>
  );
}

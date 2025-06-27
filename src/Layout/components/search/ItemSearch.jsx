/**
 * Current Date and Time (UTC): 2025-06-26 15:58:47
 * Current User's Login: sayanm085
 */

import React, { useState, useRef, useEffect } from 'react';
import axiosInstance from '@/lib/axios';
import { Search, Loader2 } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ItemSearch({ onItemSelect }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  
  // Debounce function to prevent excessive API calls
  const debounce = (func, delay) => {
    let timeoutId;
    return function(...args) {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };
  
  // Fetch suggestions from API
  const fetchSuggestions = async (searchQuery) => {
    if (!searchQuery.trim() || searchQuery.length < 1) {
      setSuggestions([]);
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/api/search/suggestions?q=${encodeURIComponent(searchQuery)}`);
      setSuggestions(response.data.data.suggestions || []);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Debounced version of fetchSuggestions
  const debouncedFetchSuggestions = useRef(
    debounce((query) => fetchSuggestions(query), 300)
  ).current;
  
  // Keep input focused when popover opens
  useEffect(() => {
    if (open && inputRef.current) {
      // Small delay to ensure focus after popover renders
      const timeoutId = setTimeout(() => {
        inputRef.current.focus();
      }, 10);
      return () => clearTimeout(timeoutId);
    }
  }, [open]);
  
  // Handle input change
  const handleInputChange = (value) => {
    setQuery(value);
    debouncedFetchSuggestions(value);
    if (!open && value.trim()) setOpen(true);
  };
  
  // Handle popover state change
  const handleOpenChange = (isOpen) => {
    setOpen(isOpen);
    // If popover is closing, refocus the input
    if (!isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 10);
    }
  };
  
  // Handle suggestion click
  const handleSelect = (item) => {
    setQuery(item.name);
    setOpen(false);
    if (onItemSelect) onItemSelect(item);
    // Refocus input after selection
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 10);
  };

  return (
    <div className="w-full max-w-md relative">
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <div className="relative w-full">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              ref={inputRef}
              placeholder="Search items..."
              value={query}
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={() => query.trim() && setOpen(true)}
              className="pl-10 pr-10 h-10"
            />
            {isLoading && (
              <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-muted-foreground" />
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent 
          className="p-0 w-[--radix-popover-trigger-width]" 
          align="start"
          onEscapeKeyDown={() => inputRef.current?.focus()}
          onInteractOutside={(e) => {
            // Don't close when interacting with the input
            if (inputRef.current?.contains(e.target)) {
              e.preventDefault();
            }
          }}
        >
          <Command shouldFilter={false}>
            <CommandList>
              {suggestions.length === 0 ? (
                <CommandEmpty>No results found.</CommandEmpty>
              ) : (
                <CommandGroup>
                  {suggestions.map((item) => (
                    <CommandItem
                      key={item._id}
                      onSelect={() => handleSelect(item)}
                      className="flex flex-col items-start"
                    >
                      <div 
                        className="text-sm font-medium" 
                        dangerouslySetInnerHTML={{ __html: item.highlightedName }}
                      />
                      <div className="flex gap-2 mt-1 text-xs text-muted-foreground">
                        <span className="bg-slate-100 px-1.5 py-0.5 rounded">{item.barcode}</span>
                        <span>{item.weight.value} {item.weight.unit}</span>
                        <span>GST: {item.gstPercentage}%</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
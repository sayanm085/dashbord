/**
 * Current Date and Time (UTC): 2025-06-27 16:03:27
 * Current User's Login: sayanm085
 */

import React, { useState, useRef, useEffect } from "react";
import axiosInstance from '@/lib/axios';
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search, Building, Loader2 } from "lucide-react";

export default function DealerSearch({ onDealerSelect }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
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
      // Using axiosInstance instead of fetch
      const response = await axiosInstance.get(`/api/search/dealer-suggestions?q=${encodeURIComponent(searchQuery)}`);
      
      // Safely handle different response structures
      if (response.data && response.data.data) {
        if (Array.isArray(response.data.data.suggestions)) {
          setSuggestions(response.data.data.suggestions);
        } else if (Array.isArray(response.data.data)) {
          setSuggestions(response.data.data);
        } else {
          console.error('Unexpected API response format:', response.data);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching dealer suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Create debounced version of fetchSuggestions
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

  // Handle dealer selection
  const handleDealerSelect = (dealer) => {
    onDealerSelect(dealer);
    setQuery(dealer.name);
    setOpen(false);
  };

  // Ensure suggestions is always an array before mapping
  const dealersToRender = Array.isArray(suggestions) ? suggestions : [];

  return (
    <div className="w-full relative">
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              ref={inputRef}
              placeholder="Search for a dealer..."
              value={query}
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={() => query.trim() && setOpen(true)}
              className="pl-10 pr-10"
            />
            {isLoading && (
              <Loader2 className="absolute right-3 top-2.5 h-4 w-4 animate-spin text-muted-foreground" />
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent 
          className="p-0 w-[350px]" 
          align="start"
          sideOffset={5}
          onEscapeKeyDown={() => inputRef.current?.focus()}
          onInteractOutside={(e) => {
            // Don't close when interacting with the input
            if (inputRef.current?.contains(e.target)) {
              e.preventDefault();
            }
          }}
        >
          <Command>
            <CommandList>
              {isLoading ? (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin mx-auto mb-2" />
                  Searching dealers...
                </div>
              ) : dealersToRender.length === 0 ? (
                <CommandEmpty>No dealers found.</CommandEmpty>
              ) : (
                <CommandGroup>
                  {dealersToRender.map((dealer) => (
                    <CommandItem
                      key={dealer._id || Math.random().toString()}
                      onSelect={() => handleDealerSelect(dealer)}
                      className="flex items-center py-2"
                    >
                      <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                        <Building className="h-3 w-3" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {dealer.highlightedName ? (
                            <span dangerouslySetInnerHTML={{ __html: dealer.highlightedName }} />
                          ) : dealer.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {dealer.contactPerson} • {dealer.phone}
                        </p>
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
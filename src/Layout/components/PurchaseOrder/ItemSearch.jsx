/**
 * Current Date and Time (UTC): 2025-06-27 17:51:15
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
import { Search, Loader2, Package, Barcode, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ItemSearch({ onItemSelect, onNoResults }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
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
      setNotFound(false);
      return;
    }
    
    setIsLoading(true);
    setNotFound(false);
    
    try {
      // Using axiosInstance
      const response = await axiosInstance.get(`/api/search/suggestions?q=${encodeURIComponent(searchQuery)}`);
      
      // Extract suggestions from response
      let data = [];
      if (response.data && response.data.data) {
        if (Array.isArray(response.data.data.suggestions)) {
          data = response.data.data.suggestions;
        } else if (Array.isArray(response.data.data)) {
          data = response.data.data;
        }
      }
      
      setSuggestions(data);
      
      // If no results, set notFound flag
      if (data.length === 0) {
        setNotFound(true);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
      setNotFound(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Create debounced version of fetchSuggestions
  const debouncedFetchSuggestions = useRef(
    debounce((query) => fetchSuggestions(query), 300)
  ).current;

  // Handle input change
  const handleInputChange = (value) => {
    setQuery(value);
    debouncedFetchSuggestions(value);
    if (!open && value.trim()) setOpen(true);
  };

  // Keep input focused when popover opens
  useEffect(() => {
    if (open && inputRef.current) {
      const timeoutId = setTimeout(() => {
        inputRef.current.focus();
      }, 10);
      return () => clearTimeout(timeoutId);
    }
  }, [open]);

  // Handle popover state change
  const handleOpenChange = (isOpen) => {
    setOpen(isOpen);
    if (!isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 10);
    }
  };

  // Handle suggestion click
  const handleSelect = (item) => {
    setQuery("");
    setOpen(false);
    if (onItemSelect && item) {
      onItemSelect(item);
    }
  };

  // Handle creating new item when no results found
  const handleCreateNew = () => {
    setOpen(false);
    if (onNoResults && query.trim()) {
      onNoResults(query);
    }
    setQuery("");
  };

  // Safe check for array
  const itemsToRender = Array.isArray(suggestions) ? suggestions : [];

  return (
    <div className="w-full relative">
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              ref={inputRef}
              placeholder="Search by name or barcode..."
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
                  Searching items...
                </div>
              ) : notFound ? (
                <div className="p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-3">No items found for "{query}"</p>
                  <Button 
                    onClick={handleCreateNew} 
                    size="sm" 
                    className="bg-green-600 hover:bg-green-700 text-white w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add as new item
                  </Button>
                </div>
              ) : itemsToRender.length === 0 ? (
                <CommandEmpty>Type to search for items</CommandEmpty>
              ) : (
                <CommandGroup>
                  {itemsToRender.map((item) => (
                    <CommandItem
                      key={item._id || Math.random().toString()}
                      onSelect={() => handleSelect(item)}
                      className="flex items-center py-2"
                    >
                      <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-muted">
                        {item.matchType === 'barcode' ? (
                          <Barcode className="h-3.5 w-3.5" />
                        ) : (
                          <Package className="h-3.5 w-3.5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">
                            {item.highlightedName ? (
                              <span dangerouslySetInnerHTML={{ __html: item.highlightedName }} />
                            ) : item.name}
                          </p>
                          <div className="flex items-center gap-1">
                            {/* Display GST badge more prominently */}
                            {typeof item.gstPercentage === 'number' && item.gstPercentage > 0 && (
                              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300 text-xs">
                                GST {item.gstPercentage}%
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              {typeof item.currentQuantity === 'number' ? item.currentQuantity : 0} in stock
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <span className="mr-2">
                            {item.highlightedBarcode ? (
                              <span dangerouslySetInnerHTML={{ __html: item.highlightedBarcode }} />
                            ) : item.barcode}
                          </span>
                          {item.weight && (
                            <span className="mr-2">{item.weight.value} {item.weight.unit}</span>
                          )}
                        </div>
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
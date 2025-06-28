import React, { useState } from "react";
import axiosInstance from '@/lib/axios';
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import { User, Search, UserPlus, Phone } from "lucide-react";

const CustomerSelect = ({ onSelectCustomer }) => {
  // State for customer search
  const [customerSearch, setCustomerSearch] = useState("");
  const [customerSearchResults, setCustomerSearchResults] = useState([]);
  const [showCustomerSearch, setShowCustomerSearch] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // State for new customer form
  const [showNewCustomerForm, setShowNewCustomerForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    email: "",
  });

  // Handle customer search
  const handleCustomerSearch = async () => {
    if (!customerSearch.trim()) return;
    setIsSearching(true);
    try {
      const response = await axiosInstance.get(`/api/customers/search?query=${customerSearch}`);
      setCustomerSearchResults(response.data.data);
    } catch (error) {
      toast.error("Failed to search customers");
    } finally {
      setIsSearching(false);
    }
  };

  // Handle customer selection (existing)
  const handleSelectCustomer = (selectedCustomer) => {
    onSelectCustomer(selectedCustomer);
    setShowCustomerSearch(false);
    toast.success(`Customer ${selectedCustomer.name} selected`);
  };

  // Handle new customer form change
  const handleNewCustomerChange = (e) => {
    setNewCustomer({
      ...newCustomer,
      [e.target.name]: e.target.value,
    });
  };

  // Handle new customer: just select (DO NOT create in backend)
  const handleCreateCustomer = () => {
    if (!newCustomer.name || !newCustomer.phone) {
      toast.error("Name and phone are required");
      return;
    }
    onSelectCustomer(newCustomer);
    setShowNewCustomerForm(false);
    toast.success("Customer added for this sale");
    // Reset form
    setNewCustomer({
      name: "",
      phone: "",
      email: "",
    });
  };

  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => setShowCustomerSearch(true)}
        className="flex items-center gap-2"
      >
        <User className="h-4 w-4" />
        <span>Add Customer</span>
      </Button>
      {/* Customer Search Sheet */}
      <Sheet open={showCustomerSearch} onOpenChange={setShowCustomerSearch}>
        <SheetContent side="right" className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Find Customer</SheetTitle>
            <SheetDescription>
              Search for existing customers or create a new one
            </SheetDescription>
          </SheetHeader>
          <div className="py-6 space-y-6">
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search by phone or name"
                    value={customerSearch}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                    className="pl-10"
                    disabled={isSearching}
                  />
                </div>
                <Button 
                  onClick={handleCustomerSearch} 
                  disabled={isSearching || !customerSearch.trim()}
                >
                  {isSearching ? "Searching..." : "Search"}
                </Button>
              </div>
              <ScrollArea className="h-72 border rounded-md">
                {customerSearchResults.length > 0 ? (
                  <div className="p-1">
                    {customerSearchResults.map((customer) => (
                      <div
                        key={customer._id}
                        className="flex justify-between items-center p-3 rounded-md hover:bg-muted cursor-pointer"
                        onClick={() => handleSelectCustomer(customer)}
                      >
                        <div>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <Phone className="h-3 w-3" />
                            {customer.phone}
                          </div>
                        </div>
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none">
                          {customer.loyaltyPoints || 0} points
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full p-4 text-center text-muted-foreground">
                    <User className="h-10 w-10 mb-2 opacity-30" />
                    <p>No customers found</p>
                    <p className="text-xs mt-1">Try searching with a different term</p>
                  </div>
                )}
              </ScrollArea>
            </div>
            <div className="flex flex-col items-center gap-2 pt-2 border-t">
              <p className="text-sm text-muted-foreground">Can't find the customer?</p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setShowNewCustomerForm(true);
                  setShowCustomerSearch(false);
                }}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Create New Customer
              </Button>
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="ghost">Cancel</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      {/* New Customer Dialog */}
      <Dialog open={showNewCustomerForm} onOpenChange={setShowNewCustomerForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Customer</DialogTitle>
            <DialogDescription>
              Enter customer details to add for this sale
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name <span className="text-destructive">*</span></Label>
              <Input
                id="name"
                name="name"
                value={newCustomer.name}
                onChange={handleNewCustomerChange}
                placeholder="John Doe"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number <span className="text-destructive">*</span></Label>
              <Input
                id="phone"
                name="phone"
                value={newCustomer.phone}
                onChange={handleNewCustomerChange}
                placeholder="9876543210"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email (Optional)</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={newCustomer.email}
                onChange={handleNewCustomerChange}
                placeholder="john@example.com"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowNewCustomerForm(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateCustomer}>
              Add Customer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomerSelect;
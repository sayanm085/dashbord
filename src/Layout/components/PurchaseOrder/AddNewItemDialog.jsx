/**
 * Current Date and Time (UTC): 2025-06-27 18:45:25
 * Current User's Login: sayanm085
 */

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";

// UI Components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Icons
import { Plus, Camera } from "lucide-react";

// BarcodeScanner component
import BarcodeScanner from "./BarcodeScanner";

// Form schema validation
const newItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  barcode: z.string().min(1, "Barcode is required"),
  weightValue: z.coerce.number().min(0, "Weight must be a positive number"),
  weightUnit: z.string().min(1, "Weight unit is required"),
  gstPercentage: z.coerce.number().min(0, "GST must be a positive number"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  unitPrice: z.coerce.number().min(0.01, "Unit price must be greater than 0"),
  salePrice: z.coerce.number().min(0.01, "Sale price must be greater than 0"),
});

export default function AddNewItemDialog({ open, onOpenChange, onAddItem, initialName = "" }) {
  const [isBarcodeScannerOpen, setIsBarcodeScannerOpen] = useState(false);

  // Initialize form with react-hook-form
  const form = useForm({
    resolver: zodResolver(newItemSchema),
    defaultValues: {
      name: initialName || "",
      barcode: `CUSTOM-${new Date().getTime().toString().slice(-6)}`,
      weightValue: 0,
      weightUnit: "gm",
      gstPercentage: 0,
      quantity: 1,
      unitPrice: 0,
      salePrice: 0,
    }
  });
  
  // Reset form when dialog opens with initialName
  React.useEffect(() => {
    if (open) {
      form.reset({
        name: initialName || "",
        barcode: `CUSTOM-${new Date().getTime().toString().slice(-6)}`,
        weightValue: 0,
        weightUnit: "gm",
        gstPercentage: 0,
        quantity: 1,
        unitPrice: 0,
        salePrice: 0,
      });
    }
  }, [open, initialName, form]);

  // Handle barcode scanning
  const handleBarcodeScan = (barcode) => {
    try {
      if (barcode && typeof barcode === 'string') {
        form.setValue("barcode", barcode);
        setIsBarcodeScannerOpen(false);
        // Use toast.success with a string message instead of an object
        toast.success(`Barcode scanned: ${barcode}`);
      } else {
        console.error("Invalid barcode format:", barcode);
        toast.error("Invalid barcode format");
      }
    } catch (error) {
      console.error("Error handling barcode scan:", error);
      toast.error("Failed to process barcode");
    }
  };

  // Handle form submission
  const onSubmit = (data) => {
    try {
      // Create new item object in the format required by the API
      const newItem = {
        name: data.name,
        barcode: data.barcode,
        weight: {
          value: data.weightValue,
          unit: data.weightUnit,
        },
        gstPercentage: data.gstPercentage,
        quantity: data.quantity,
        unitPrice: data.unitPrice,
        salePrice: data.salePrice,
        isNewItem: true, // Flag to identify as a new item
      };
      
      // Pass the new item to parent component
      onAddItem(newItem);
      
      // Close dialog and show success message
      onOpenChange(false);
      toast.success(`Added new item: ${newItem.name}`);
    } catch (error) {
      toast.error("Failed to add item: " + (error.message || "Unknown error"));
    }
  };

  // Close the barcode scanner dialog and return to the form dialog
  const handleCloseScanner = () => {
    setIsBarcodeScannerOpen(false);
  };

  return (
    <>
      {/* New Item Form Dialog */}
      <Dialog open={open && !isBarcodeScannerOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
            <DialogDescription>
              Enter details for the new item to add to your inventory and this order
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Item Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter item name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="barcode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Barcode</FormLabel>
                      <div className="flex gap-2">
                        <FormControl className="flex-1">
                          <Input placeholder="Barcode or SKU" {...field} />
                        </FormControl>
                        <Button 
                          type="button"
                          variant="outline" 
                          size="icon"
                          onClick={() => setIsBarcodeScannerOpen(true)}
                          title="Scan barcode"
                        >
                          <Camera className="h-4 w-4" />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="gstPercentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GST %</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0" 
                          step="0.01" 
                          placeholder="GST Percentage" 
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="weightValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0" 
                          step="0.01" 
                          placeholder="Weight value" 
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="weightUnit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="gm">gram (gm)</SelectItem>
                          <SelectItem value="kg">kilogram (kg)</SelectItem>
                          <SelectItem value="ml">milliliter (ml)</SelectItem>
                          <SelectItem value="l">liter (l)</SelectItem>
                          <SelectItem value="pcs">pieces (pcs)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1" 
                          placeholder="Quantity" 
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="unitPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cost Price</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0.01" 
                          step="0.01" 
                          placeholder="Cost Price" 
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="salePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sale Price</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0.01" 
                          step="0.01" 
                          placeholder="Sale Price" 
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <DialogFooter className="mt-6">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Barcode Scanner Dialog - full screen on mobile */}
      <Dialog 
        open={isBarcodeScannerOpen} 
        onOpenChange={(open) => {
          if (!open) setIsBarcodeScannerOpen(false);
        }}
      >
        <DialogContent 
          className="max-w-full sm:max-w-[95vw] md:max-w-[80vw] lg:max-w-[768px] p-0 h-[80vh] sm:h-auto"
          onInteractOutside={(e) => e.preventDefault()} // Prevent closing when interacting outside
        >
          <div className="flex flex-col h-full">
            <DialogHeader className="p-4 pb-0">
              <DialogTitle>Scan Barcode</DialogTitle>
              <DialogDescription>
                Point your camera at a barcode to scan
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex-grow p-4 flex items-center justify-center">
              <div className="w-full h-full max-h-[60vh] relative rounded-lg overflow-hidden">
                <BarcodeScanner 
                  onCodeScanned={handleBarcodeScan} 
                  onClose={handleCloseScanner}
                  autoStart={true}
                  className="w-full h-full"
                />
              </div>
            </div>
            
            <div className="p-4 flex justify-center">
              <Button 
                variant="outline" 
                onClick={handleCloseScanner}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}